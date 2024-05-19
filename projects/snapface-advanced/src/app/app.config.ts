import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      useValue: 'fr_FR'
    },
    //provideHttpClient()
    provideHttpClient(withInterceptors([
      authInterceptor
    ]))
  ]
};
