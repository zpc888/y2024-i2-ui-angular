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
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
}
