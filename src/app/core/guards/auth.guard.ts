import { HttpAuthService } from '../services/http/httpAuth.service';
import { CanActivate, Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public authService = inject(HttpAuthService);

  constructor(private _router: Router) {}

  canActivate(): boolean {
    // check login status
    if (!this.authService.$loggedIn.value) {
      // check login status of last session
      if (localStorage.getItem(AppConstants.LOCAL_STORAGE.USER_MAIL) != null) {
        this.authService.setStatusLogin();
        return true;
      } else {
        this._router.navigate([AppConstants.ROUTES.LOGIN]);
        return false;
      }
    } else {
      return true;
    }
  }
}
