import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {Router} from "@angular/router";
import {UserAccountService} from "../user-account.service";
import {UserAccount} from "../user-account";

interface Province {
  code: string;
  viewValue: string;
}

@Component({
  selector: 'app-old-signup',
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
    ReactiveFormsModule,
  ],
  templateUrl: './old-signup.component.html',
  styleUrl: './old-signup.component.css'
})
export class OldSignupComponent implements OnInit {
  maxLenForFirstName = 40;
  maxLenForMiddleName = 10;
  maxLenForLastName = 40;
  maxLenForPhone = 20;
  minLenForPassword = 8;
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userAccountService: UserAccountService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(this.maxLenForFirstName)]),
      middleName: new FormControl('', [Validators.maxLength(this.maxLenForMiddleName)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(this.maxLenForLastName)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.maxLength(this.maxLenForPhone)]),
      password1: new FormControl('', [Validators.required, Validators.minLength(this.minLenForPassword)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(this.minLenForPassword)]),
    });
  }

  ngOnInit() {
  }

  isValidForSignup(): boolean {
    if (this.signupForm.invalid) {
      return false;
    }
    const pswd1 = this.signupForm.controls['password1'].value;
    const pswd2 = this.signupForm.controls['password2'].value;
    if (pswd1 !== pswd2) {
      return false;
    }

    return true;
  }

  tryToSignup() {
    if (this.isValidForSignup()) {
      const user: UserAccount = {
        firstName: this.signupForm.controls['firstName'].value,
        middleName: this.signupForm.controls['middleName'].value,
        lastName: this.signupForm.controls['lastName'].value,
        email: this.signupForm.controls['email'].value,
        phone: this.signupForm.controls['phone'].value,
        password: this.signupForm.controls['password1'].value,
      };
      this.userAccountService.register(user).subscribe((u: UserAccount) => {
        this.router.navigate(['/signup-step2', u.id]).then(r => {
          console.log('Go back to next step of signup: ' + (r ? 'Ok' : 'Failed'));
        });
      });
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
