import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  let token = null;
  const userJson = localStorage.getItem('userData');
  if (userJson) {
    const user = JSON.parse(userJson);
    token = user.token;
  }
  if (token) {
    const modifiedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(modifiedRequest);
  }
  return next(req);
}
