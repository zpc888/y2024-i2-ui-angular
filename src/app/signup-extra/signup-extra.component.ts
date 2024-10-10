import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {Router} from "@angular/router";
import {UserProfile} from "../user-account";
import {UserAccountService} from "../user-account.service";

interface Province {
  code: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDivider,
    MatLabel,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-extra.component.html',
  styleUrl: './signup-extra.component.css'
})
export class SignupExtraComponent implements OnInit {
  maxLenForAddressLine1 = 40;
  maxLenForAddressLine2 = 40;
  maxLenForCity = 40;
  maxLenForProvince = 2;
  signupForm: FormGroup;
  addressForm: FormGroup;
  budgetForm: FormGroup;
  @ViewChild('addressRef') addressRef?: ElementRef;
  @ViewChild('budgetRef') budgetRef?: ElementRef;

  canadaProvinces: Province[] = [
    { code: "AB", viewValue: "Alberta" },
    { code: "BC", viewValue: "British Columbia" },
    { code: "MB", viewValue: "Manitoba" },
    { code: "NB", viewValue: "New Brunswick" },
    { code: "NL", viewValue: "Newfoundland and Labrador" },
    { code: "NT", viewValue: "Northwest Territories" },
    { code: "NS", viewValue: "Nova Scotia" },
    { code: "NU", viewValue: "Nunavut" },
    { code: "ON", viewValue: "Ontario" },
    { code: "PE", viewValue: "Prince Edward Island" },
    { code: "QC", viewValue: "Quebec" },
    { code: "SK", viewValue: "Saskatchewan" },
    { code: "YT", viewValue: "Yukon" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userAccountService: UserAccountService,
    private router: Router
  ) {
    this.addressForm = this.formBuilder.group({
      line1: new FormControl('', [Validators.required, Validators.maxLength(this.maxLenForAddressLine1)]),
      line2: new FormControl('', [Validators.maxLength(this.maxLenForAddressLine2)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(this.maxLenForCity)]),
      province: new FormControl('', [Validators.required, Validators.maxLength(this.maxLenForProvince)]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]")]),
    });
    this.budgetForm = this.formBuilder.group({
      budgetRange: new FormControl('', [Validators.required]),
    });
    this.signupForm = this.formBuilder.group({
      choiceToProvideAddressLater: new FormControl(''),
      address: this.addressForm,
      choiceToProvideBudgetLater: new FormControl(''),
      budget: this.budgetForm,
    });
  }

  ngOnInit() {
  }

  handleTellAddressLaterChange(event: MatCheckboxChange) {
    this.addressRef!.nativeElement.style.display = event.checked ? 'none' : 'block';
  }

  handleTellBudgetLaterChange(event: MatCheckboxChange) {
    this.budgetRef!.nativeElement.style.display = event.checked ? 'none' : 'block';
  }

  resetSignupForm() {
    this.signupForm.reset();
    this.addressRef!.nativeElement.style.display = 'block';
    this.budgetRef!.nativeElement.style.display = 'block';
  }

  isValidForSignup(): boolean {
    const tellAddressLater = this.signupForm.controls['choiceToProvideAddressLater'].value;
    if (!tellAddressLater && this.addressForm.invalid) {
      return false;
    }

    const tellBudgetLater  = this.signupForm.controls['choiceToProvideBudgetLater'].value;
    if (!tellBudgetLater && this.budgetForm.invalid) {
      return false;
    }

    return true;
  }

  handlePostalCodeFormat() {
    const ctrl = this.addressForm.controls['postalCode'];
    let newV = ctrl.value.toUpperCase();
    if (ctrl.valid) {
      if (newV.length === 6) {
        newV = newV.substring(0, 3) + " " + newV.substring(3);
      }
    }
    if (newV !== ctrl.value) {
      ctrl.setValue(newV);
    }
  }

  tryToSignup() {
    if (this.isValidForSignup()) {
      const tellAddressLater = this.signupForm.controls['choiceToProvideAddressLater'].value;
      const tellBudgetLater  = this.signupForm.controls['choiceToProvideBudgetLater'].value;
      if (tellAddressLater && tellBudgetLater) {
        this.goBackToLogin();
      } else {
        const userProfile: UserProfile = {};
        if (!tellAddressLater) {
          userProfile.userAddress = {
            addressLine1: this.addressForm.controls['line1'].value,
            addressLine2: this.addressForm.controls['line2'].value,
            city: this.addressForm.controls['city'].value,
            provinceCode: this.addressForm.controls['province'].value,
            postalCode: this.addressForm.controls['postalCode'].value,
          };
        }
        if (!tellBudgetLater) {
          let budgetRangeFromInK = 0;
          let budgetRangeToInK = 1_000_000;
          const budgetRange = this.budgetForm.controls['budgetRange'].value;
          if (budgetRange === 'btw30and50k') {
            [budgetRangeFromInK, budgetRangeToInK] = [30, 50];
          } else if (budgetRange === 'btw50and100k') {
            [budgetRangeFromInK, budgetRangeToInK] = [50, 100];
          } else if (budgetRange === 'btw100and150k') {
            [budgetRangeFromInK, budgetRangeToInK] = [100, 150];
          } else if (budgetRange === 'btw150and200k') {
            [budgetRangeFromInK, budgetRangeToInK] = [150, 200];
          } else {
            budgetRangeFromInK = 200;
          }
          userProfile.userFinance = {
            budgetRangeFromInK,
            budgetRangeToInK,
          };
        }
        this.userAccountService.createProfile(1, userProfile).subscribe(created => {
          this.goBackToLogin();
        })
      }

    } else {
      console.log('Invalid signup');
    }
  }

  goBackToLogin() {
    this.router.navigate(['/login']).then(r => {
      console.log('Go back to login: ' + (r ? 'Ok' : 'Failed'));
    });
  }
}
