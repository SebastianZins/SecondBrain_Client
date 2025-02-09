import { Observable } from 'rxjs';
import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export function withCredentialsInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const clonedRequest = req.clone({
    withCredentials: true,
  });

  return next(clonedRequest);
}
