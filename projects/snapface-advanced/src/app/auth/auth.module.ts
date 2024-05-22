import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './auth.routes';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginComponent
  ],
  providers: [
    provideRouter(routes)
  ]
})
export class AuthModule { }
