import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {SignupExtraComponent} from "./signup-extra/signup-extra.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full', },
  { path: 'login', component: LoginComponent, },
  { path: 'signup', component: SignupComponent, },
  { path: 'signup-step2', component: SignupExtraComponent, },
];
