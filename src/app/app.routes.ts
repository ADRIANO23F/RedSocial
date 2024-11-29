import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { PublicacionComponent } from './pages/publicacion/publicacion.component';

export const routes: Routes = [
    { path:"", component: HomeComponent},
    {path: "publicacion", component: PublicacionComponent},
    {path:"emailVerification", component: EmailVerificationComponent}
];
