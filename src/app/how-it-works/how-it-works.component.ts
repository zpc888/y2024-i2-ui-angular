import { Component } from '@angular/core';
import {FragGuestHeaderComponent} from "../frag-guest-header/frag-guest-header.component";
import {FragLayoutComponent} from "../frag-layout/frag-layout.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-how-it-works',
  standalone: true,
    imports: [
        FragGuestHeaderComponent,
        FragLayoutComponent,
        MatButton
    ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent {

}
