import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FragLayoutComponent} from "../frag-layout/frag-layout.component";
import {FragGuestHeaderComponent} from "../frag-guest-header/frag-guest-header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
    FragLayoutComponent,
    FragGuestHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tellMeMore() {

  }

}
