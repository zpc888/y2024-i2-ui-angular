import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDivider} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Opportunity, SearchCriteria} from "../opportunity";
import {OpportunityService} from "../opportunity.service";
import {OppSummaryComponent} from "../opp-summary/opp-summary.component";

@Component({
  selector: 'app-opportunity',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatDivider,
    MatCardModule,
    MatCheckbox,
    FormsModule,
    MatRadioButton,
    MatRadioGroup,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    OppSummaryComponent,
    NgForOf
  ],
  templateUrl: './opportunity.component.html',
  styleUrl: './opportunity.component.css'
})
export class OpportunityComponent implements OnInit {
  userId: string | null = null;
  userEmail: string | null = null;
  oppRangeMin: number | null = null;
  // oppMaxControl = new FormControl('');
  oppRangeMax: number | null = null;

  selectViaType = false;
  oppType: string | null = null;
  selectViaRange = false;
  selectAll = false;

  opportunities: Opportunity[] | null = null;

  previousSearchCriteria: SearchCriteria = {
    searchType: null,
    byTypeValue: null,
    byRangeMin: null,
    byRangeMax: null
  };

  constructor(private route: ActivatedRoute
              , private router: Router
              , private opportunityService: OpportunityService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.userId = params['id'];
        this.userEmail = params['email'];
      }
    })
  }

  goToLogin() {
    this.router.navigate(['/login']).then(r => {
      console.log('navigation to login page: ' + (r ? 'ok' : 'failed'));
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']).then(r => {
      console.log('navigation to signup page: ' + (r ? 'ok' : 'failed'));
    });
  }

  goToLogout() {
    // clear security
    this.goToLogin();
  }

  goToProfile() {
    this.router.navigate(['/profile']).then(r => {
      console.log('navigation to profile page: ' + (r ? 'ok' : 'failed'));
    });
  }

  goToInvestment() {
    this.router.navigate(['/investment']).then(r => {
      console.log('navigation to investment page: ' + (r ? 'ok' : 'failed'));
    });
  }

  toggleSearchViaType() {
    if (this.selectViaType) {
      this.selectAll = false;
    }
  }

  toggleSearchViaRange() {
    if (this.selectViaRange) {
      this.selectAll = false;
    }
  }

  toggleSearchAll() {
    if (this.selectAll) {
      this.selectViaType = false;
      this.selectViaRange = false;
    }
  }

  get isNewSearchDisabled(): boolean {
    if (this.selectAll) {
      return false;
    }
    if (this.selectViaType && !this.oppType) {
      return true;
    }
    if (this.selectViaRange && !this.oppRangeMin && !this.oppRangeMax) {
      return true;
    }
    return !this.selectViaType && !this.selectViaRange;
  }

  startNewSearch() {
    const searchCriteria: SearchCriteria = {
      searchType: null,
      byTypeValue: null,
      byRangeMin: null,
      byRangeMax: null
    };
    if (this.selectAll) {
      searchCriteria.searchType = 'all';
    } else if (this.selectViaType) {
      if (this.selectViaRange) {
        searchCriteria.searchType = 'byTypeAndRange';
        searchCriteria.byTypeValue = this.oppType;
        if (this.oppRangeMin) {
          searchCriteria.byRangeMin = this.oppRangeMin;
        }
        if (this.oppRangeMax) {
          searchCriteria.byRangeMax = this.oppRangeMax;
        }
      } else {
        searchCriteria.searchType = 'byType';
        searchCriteria.byTypeValue = this.oppType;
      }
    } else {
      searchCriteria.searchType = 'byRange';
      if (this.oppRangeMin) {
        searchCriteria.byRangeMin = this.oppRangeMin;
      }
      if (this.oppRangeMax) {
        searchCriteria.byRangeMax = this.oppRangeMax;
      }
    }
    // do search
    this.opportunityService.search(searchCriteria).subscribe(opps => {
      this.opportunities = opps;
      this.previousSearchCriteria = searchCriteria;
    });
  }

  backToPreviousSearch() {
    this.selectAll = false;
    this.selectViaType = false;
    this.selectViaRange = false;
    this.oppType = null;
    this.oppRangeMin = null;
    this.oppRangeMax = null;
    if (!this.previousSearchCriteria.searchType) {
      return;
    } else if (this.previousSearchCriteria.searchType === 'all') {
      this.selectAll = true;
    } else if (this.previousSearchCriteria.searchType === 'byType') {
      this.selectViaType = true;
      this.oppType = this.previousSearchCriteria.byTypeValue!;
    } else if (this.previousSearchCriteria.searchType === 'byRange') {
      this.selectViaRange = true;
      this.oppRangeMin = this.previousSearchCriteria.byRangeMin!;
      this.oppRangeMax = this.previousSearchCriteria.byRangeMax!;
    } else {    // by Range and Type
      this.selectViaType = true;
      this.oppType = this.previousSearchCriteria.byTypeValue!;
      this.selectViaRange = true;
      this.oppRangeMin = this.previousSearchCriteria.byRangeMin!;
      this.oppRangeMax = this.previousSearchCriteria.byRangeMax!;
    }
  }

  buildRangeStatement(min: number|null, max: number|null): string {
    if (min) {
      if (max) {
        return `investment amount >= ${min}K and < ${max}K`;
      } else {
        return `investment amount >= ${min}K`;
      }
    } else {
      return `investment amount < ${max}K`;
    }
  }

  get previousSearchCriteriaStatement(): string {
    if (!this.previousSearchCriteria.searchType) {
      return 'Please enter criteria';
    }
    if (this.previousSearchCriteria.searchType === 'all') {
      return 'Investment property: all';
    }
    if (this.previousSearchCriteria.searchType === 'byType') {
      return 'Investment property: type = ' + this.previousSearchCriteria.byTypeValue;
    }
    if (this.previousSearchCriteria.searchType === 'byRange') {
      return this.buildRangeStatement(this.previousSearchCriteria.byRangeMin, this.previousSearchCriteria.byRangeMax);
    }
    // both type and range
    return 'Investment property: ( type = ' + this.previousSearchCriteria.byTypeValue + ' ) and ( '
      + this.buildRangeStatement(this.previousSearchCriteria.byRangeMin, this.previousSearchCriteria.byRangeMax) + ' )';
  }
}
