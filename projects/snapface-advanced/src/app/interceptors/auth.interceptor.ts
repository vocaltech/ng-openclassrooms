import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const authToken = authService.getToken()

  // clone the request and add the authorization header
  let authReq: HttpRequest<any>

  if (authToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      }
    })
  } else {
    authReq = req.clone()
  }

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
