import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AccountManagement } from './app/pages/account-management/account-management';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import {AuthGuard} from "./app/services/auth-guard.service";

export const appRoutes: Routes = [
    {
        path: 'logedin',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: Dashboard },
            { path: 'account', component: AccountManagement },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: '', component: Landing, canActivate: [AuthGuard] },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
