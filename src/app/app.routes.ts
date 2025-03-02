import { NotFoundPageComponent } from './pages/+not-found/components/not-found-page/not-found-page.component';
import { LoginPageComponent } from './pages/+login/components/login-page/login-page.component';
import { HomePageComponent } from './pages/+home/components/home-page/home-page.component';
import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AppConstants } from './app.constants';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: AppConstants.ROUTES.FILE,
    loadChildren: () =>
      import('./pages/+file/file-page.module').then((m) => m.FilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: AppConstants.ROUTES.HOME,
    redirectTo: '',
  },
  {
    path: AppConstants.ROUTES.LOGIN,
    component: LoginPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    canActivate: [AuthGuard],
  },
];
