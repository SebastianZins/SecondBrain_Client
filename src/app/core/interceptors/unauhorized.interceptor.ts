import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { HttpAuthService } from './../services/http/httpAuth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';

export function unauthorizedInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(HttpAuthService);

  return next(req).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status) && authService.$loggedIn.value) {
        const headerName = 'X-Token-Expired';
        const hasHeader = req.headers.has(headerName);
        if (hasHeader) {
          authService.refreshToken().subscribe(() => {});
        } else {
          // auto logout if 401 or 403 response returned from api
          authService.logout();
        }
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
    })
  );
}
