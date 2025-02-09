import { HttpAuthService } from '../services/http/httpAuth.service';
import { CanActivate, Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  public authService = inject(HttpAuthService);

  constructor(private _router: Router) {}

  canActivate(): boolean {
    if (this.authService.$loggedIn.value) {
      this._router.navigate([AppConstants.ROUTES.HOME]);
      return false;
    } else {
      return true;
    }
  }
}
