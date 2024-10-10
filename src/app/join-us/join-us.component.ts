import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FragLayoutComponent} from "../frag-layout/frag-layout.component";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {UserAccountService} from "../user-account.service";
import {Router, RouterLink} from "@angular/router";
import {UserAccount} from "../user-account";

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FragLayoutComponent,
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSlideToggle,
    MatSuffix,
    RouterLink
  ],
  templateUrl: './join-us.component.html',
  styleUrl: './join-us.component.css'
})
export class JoinUsComponent {
  minLenForPassword = 8;

  emailControl: FormControl = new FormControl('',
    [Validators.required, Validators.email]);
  passwordControl1: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(this.minLenForPassword)]);
  hidePswd1 = true;
  passwordControl2: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(this.minLenForPassword)]);
  hidePswd2 = true;

  constructor(
    private userAccountService: UserAccountService,
    private router: Router
  ) {
  }

  signInHere() {
    this.router.navigate(['/login']).then(r => {
      if (r) {
        console.log("Navigation to login is successful!");
      } else {
        console.log("Navigation to login fails!");
      }
    });
  }

  createAccount(): void {
    const user:UserAccount = {
      email: this.emailControl.value,
      password: this.passwordControl1.value,
    }
    this.userAccountService.register(user).subscribe(u => {
      console.log("after register:", u);
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
