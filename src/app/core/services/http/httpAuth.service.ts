import { CreateUserRequestModel } from '../../models/user/create-user-request.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AppConstants } from '../../../app.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  private url = AppConstants.END_POINT.AUTH;

  public $loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  public setStatusLogin(): void {
    this.$loggedIn.next(true);
  }

  public login(mail: string, password: string): Observable<boolean> {
    return this.http
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
            return true;
          }
          return false;
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
