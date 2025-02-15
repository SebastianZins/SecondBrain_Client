import { CreateUserRequestModel } from '../../models/user/create-user-request.model';
import { HttpFileStructureService } from './httpFileStructure.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AppConstants } from '../../../app.constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  private url = AppConstants.END_POINT.AUTH;

  public $loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _fileStructureService: HttpFileStructureService
  ) {}

  public setStatusLogin(): void {
    this.$loggedIn.next(true);
    console.log('Logged in');
    this._fileStructureService.fetchFileStructure();
  }

  public login(mail: string, password: string): Observable<boolean> {
    return this._http
      .post<any>(
        this.url.LOGIN,
        {
          email: mail,
          password: password,
        },
        { observe: 'response' }
      )
      .pipe(
        map((result: HttpResponse<any>) => {
          if (result.status === 200) {
            this.$loggedIn.next(true);
            localStorage.setItem(AppConstants.LOCAL_STORAGE.USER_MAIL, mail);
            console.log('Logged in');
            this._fileStructureService.fetchFileStructure();
            return true;
          }
          return false;
        })
      );
  }

  public logout(): void {
    this._http.post(this.url.LOGOUT, {}).subscribe(() => {
      localStorage.removeItem(AppConstants.LOCAL_STORAGE.USER_MAIL);
      this.$loggedIn.next(false);
      this._router.navigate(['/' + AppConstants.ROUTES.LOGIN]);
    });
  }

  public signup(data: CreateUserRequestModel): Observable<boolean> {
    return this._http.post(this.url.SIGNUP, data).pipe(
      map((result) => {
        return result as boolean;
      })
    );
  }

  public refreshToken(): Observable<void> {
    return this._http.post(this.url.REFRESH_TOKEN, {}).pipe(
      map(() => {
        return;
      })
    );
  }
}
