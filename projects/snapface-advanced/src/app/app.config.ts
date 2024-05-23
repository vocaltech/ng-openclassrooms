import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { loginRoutes } from './auth/auth.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(loginRoutes),
    {
      provide: LOCALE_ID,
      useValue: 'fr_FR'
    },
    provideHttpClient(withInterceptors([
      authInterceptor
    ]))
  ]
};
