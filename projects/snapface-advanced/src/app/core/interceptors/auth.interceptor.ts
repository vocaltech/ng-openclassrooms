import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const authToken = authService.getToken()

  console.log(`authToken: ${authToken}`)

  // clone the request and add the authorization header
  let authReq: HttpRequest<any>

  authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  })

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
