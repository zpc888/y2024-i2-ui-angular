import { Component } from '@angular/core';
import {FragGuestHeaderComponent} from "../frag-guest-header/frag-guest-header.component";
import {FragLayoutComponent} from "../frag-layout/frag-layout.component";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatButton} from "@angular/material/button";
import {UserAccount} from "../user-account";
import {UserAccountService} from "../user-account.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FragGuestHeaderComponent,
    FragLayoutComponent,
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIcon,
    MatError,
    MatSlideToggle,
    MatButton,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  minLenForPassword = 8;

  emailControl: FormControl = new FormControl('',
      [Validators.required, Validators.email]);
  passwordControl: FormControl = new FormControl('',
      [Validators.required, Validators.minLength(this.minLenForPassword)]);
  hidePswd = true;
  keepMeSignedIn = false;

  constructor(
    private userAccountService: UserAccountService,
    private router: Router
  ) {
  }

  forgotPassword() {
    console.log('forgot password');
  }

  signIn(): void {
    const user:UserAccount = {
      email: this.emailControl.value,
      password: this.passwordControl.value,
    }
    this.userAccountService.login(user).subscribe(u => {
      console.log("after signin:", u);
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
}
