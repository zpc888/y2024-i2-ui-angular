import {Component, Input} from '@angular/core';
import {Opportunity} from "../opportunity";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-opp-summary',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './opp-summary.component.html',
  styleUrl: './opp-summary.component.css'
})
export class OppSummaryComponent {
  @Input({required: true})
  opp: Opportunity | null = null;

  pics = ['house-01.jpeg', 'house-02.jpeg', 'condo-01.jpeg', 'condo-02.jpeg'];

  get pic(): string {
    if (!this.opp) {
      return '';
    }
    const img = this.pics[ this.opp.id % 4 ];
    return `assets/resources/img/${img}`;
  }
}
