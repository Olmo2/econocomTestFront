import { provideRouter, Routes } from '@angular/router';
import { Login } from './login/login';
import { SsoCallbackComponent } from './sso-callback/sso-callback';
import { bootstrapApplication } from '@angular/platform-browser';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'callback', component: SsoCallbackComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' } // ruta por defecto
];

