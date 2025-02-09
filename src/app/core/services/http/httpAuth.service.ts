import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../../app.constants';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CreateUserRequestModel } from '../../models/user/create-user-request.model';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  private url = AppConstants.END_POINT.AUTH;

  public $loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  public login(mail: string, password: string): Observable<boolean> {
    return this.http
      .post(this.url.LOGIN, { email: mail, password: password })
      .pipe(
        map((result) => {
          console.log(result);
          if (true) {
            this.$loggedIn.next(true);
          }
          return true;
        })
      );
  }

  public logout(): Observable<boolean> {
    return this.http.post(this.url.LOGOUT, {}).pipe(
      map((result) => {
        console.log(result);
        return true;
      })
    );
  }

  public signup(data: CreateUserRequestModel): Observable<boolean> {
    return this.http.post(this.url.SIGNUP, data).pipe(
      map((result) => {
        console.log(result);
        return true;
      })
    );
  }

  public test(): Observable<boolean> {
    return this.http.get(AppConstants.END_POINT.FILE_NODE.GET).pipe(
      map((result) => {
        console.log(result);
        return true;
      })
    );
  }
}
