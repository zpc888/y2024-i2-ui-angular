import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-frag-guest-header',
  standalone: true,
    imports: [
        MatButton
    ],
  templateUrl: './frag-guest-header.component.html',
  styleUrl: './frag-guest-header.component.css'
})
export class FragGuestHeaderComponent {
  @Input() from: string = 'home';

  constructor(
    private router: Router
  ) {
  }

  signIn() {
    this.gotoPage(['/login']);
  }

  joinUs() {
    this.gotoPage(['/join-us']);
  }

  howItWorks() {
    this.gotoPage(['/how-it-works']);
  }

  gotoPage(pageUrl: any[]) {
    this.router.navigate(pageUrl).then( r => {
      if (r) {
        console.log(`Navigation ${pageUrl} is sucessful!`);
      } else {
        console.log(`Navigation ${pageUrl} has failed!`);
      }
    })
  }
}
