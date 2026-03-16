import { Routes } from '@angular/router';
import { Access } from './access';
import { Error } from './error';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
] as Routes;
