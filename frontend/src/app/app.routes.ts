import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Signup } from './pages/signup/signup';
import { authGuard } from './services/auth-guard';
import { ForgotPasswordComponent } from './pages/recover/recover';
import { ResetPasswordComponent } from './pages/reset-password/reset-password';

export const routes: Routes = [
    {
        path: '',
        component: Landing
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'home',
        canActivate: [authGuard],
        component: Dashboard
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    { path: 'recover/:id', component: ResetPasswordComponent },
];
