import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button"
import {MatDivider} from "@angular/material/divider";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {UserAccountService} from "../user-account.service";
import {UserAccount} from "../user-account";
import {Router} from "@angular/router";

@Component({
  selector: 'app-old-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDivider,
    MatLabel,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './old-login.component.html',
  styleUrl: './old-login.component.css'
})
export class OldLoginComponent {
  minLenForPassword = 8;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(this.minLenForPassword)]);

  constructor(
    private userAccountService: UserAccountService,
    private router: Router
  ) {
  }
  tryToLogin() {
    const user:UserAccount = {
      email: this.emailControl.value!,
      password: this.passwordControl.value!,
    }
    this.userAccountService.login(user).subscribe(u => {
      console.log("after login:", u);
      if (u) {
        this.router.navigate(['/opportunity'], {
          queryParams: {
            id: u.id,
            email: u.email,
          }
        }).then(r => {
          if (r) {
            console.log("Navigation to opportunity is sucessful!");
          } else {
            console.log("Navigation to opportunity fails!");
          }
        });
      }
    });
  }

  tryToSignup() {
    this.router.navigate(['/signup']).then( r => {
      if (r) {
        console.log("Navigation is sucessful!");
      } else {
        console.log("Navigation has failed!");
      }
    })
  }

  justBrowse() {
    this.router.navigate(['/opportunity']).then(r => {
      if (r) {
        console.log("Navigation to opportunity is sucessful!");
      } else {
        console.log("Navigation to opportunity fails!");
      }
    });
  }
}
