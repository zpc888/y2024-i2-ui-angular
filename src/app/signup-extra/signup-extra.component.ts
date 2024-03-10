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
  maxLenForFirstName = 40;
  maxLenForMiddleName = 10;
  maxLenForLastName = 40;
  maxLenForPhone = 20;
  minLenForPassword = 8;
  maxLenForAddressLine1 = 40;
  maxLenForAddressLine2 = 40;
  maxLenForCity = 40;
  maxLenForProvince = 2;
  signupForm: FormGroup;
  userForm: FormGroup;
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
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(this.maxLenForFirstName)]),
      middleName: new FormControl('', [Validators.maxLength(this.maxLenForMiddleName)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(this.maxLenForLastName)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.maxLength(this.maxLenForPhone)]),
      password1: new FormControl('', [Validators.required, Validators.minLength(this.minLenForPassword)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(this.minLenForPassword)]),
    });
    this.addressForm = this.formBuilder.group({
      line1: new FormControl('', [Validators.required, Validators.maxLength(this.maxLenForAddressLine1)]),
      line2: new FormControl('', [Validators.maxLength(this.maxLenForAddressLine2)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(this.maxLenForCity)]),
      province: new FormControl('', [Validators.required, Validators.maxLength(this.maxLenForProvince)]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern("[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]")]),
    });
    this.budgetForm = this.formBuilder.group({
      budgetRange: new FormControl(''),
      btw30and50k: new FormControl(''),
      btw50and100k: new FormControl(''),
      btw100and150k: new FormControl(''),
      btw150and200k: new FormControl(''),
      moreThan200k: new FormControl(''),
    });
    this.signupForm = this.formBuilder.group({
      user: this.userForm,
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

  isValidForSignup(): boolean {
    if (this.userForm.invalid) {
      return false;
    }
    const pswd1 = this.userForm.controls['password1'].value;
    const pswd2 = this.userForm.controls['password2'].value;
    if (pswd1 !== pswd2) {
      return false;
    }

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

  tryToSignup() {
    if (this.isValidForSignup()) {
      console.log('tryint to signup');
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
