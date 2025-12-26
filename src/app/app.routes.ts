import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { map } from 'rxjs';
import { Router } from '@angular/router';

const authGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return authState(auth).pipe(
    map((user) => (user ? true : router.parseUrl('/login')))
  );
};

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./details/details.page').then((m) => m.DetailsPage),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.ProfilePage),
    canActivate: [authGuard],
  },
];
