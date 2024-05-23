import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { provideRouter } from '@angular/router';
import { loginRoutes } from './auth.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginComponent
  ],
  providers:  [
    provideRouter(loginRoutes)
  ]
})
export class AuthModule { }
