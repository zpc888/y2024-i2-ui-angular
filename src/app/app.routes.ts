import { Routes } from '@angular/router';
import {OldLoginComponent} from "./old-login/old-login.component";
import {OldSignupComponent} from "./old-signup/old-signup.component";
import {SignupExtraComponent} from "./signup-extra/signup-extra.component";
import {OpportunityComponent} from "./opportunity/opportunity.component";
import {ProfileComponent} from "./profile/profile.component";
import {InvestmentComponent} from "./investment/investment.component";
import {HomeComponent} from "./home/home.component";
import {HowItWorksComponent} from "./how-it-works/how-it-works.component";
import {LoginComponent} from "./login/login.component";
import {JoinUsComponent} from "./join-us/join-us.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', },
  { path: 'home', component: HomeComponent, },
  { path: 'how-it-works', component: HowItWorksComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'join-us', component: JoinUsComponent, },
  { path: 'old-login', component: OldLoginComponent, },
  { path: 'signup', component: OldSignupComponent, },
  { path: 'signup-step2/:userId', component: SignupExtraComponent, },
  { path: 'opportunity', component: OpportunityComponent, },
  { path: 'profile', component: ProfileComponent, },
  { path: 'investment', component: InvestmentComponent, },

  // { path: 'main/12', component: MainLayoutComponent, children: [
  //     {
  //       path: '', component: Child1Component, outlet: 'c1',
  //     },
  //     {
  //       path: '', component: Child2Component, outlet: 'c2',
  //     }
  //   ]},
  //
  // { path: 'main/13', component: MainLayoutComponent, children: [
  //     {
  //       path: '', component: Child1Component, outlet: 'c1',
  //     },
  //     {
  //       path: '', component: Child3Component, outlet: 'c2',
  //     }
  //   ]},
];
