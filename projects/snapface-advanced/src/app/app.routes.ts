import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/components/landing-page/landing-page.component';
import { LoginComponent } from './auth/components/login/login.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'facesnaps', loadChildren: () => import('./face-snaps/face-snaps.module').then(m => m.FaceSnapsModule) },
    { path: 'login', component: LoginComponent }
];

