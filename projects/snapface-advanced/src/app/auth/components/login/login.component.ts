import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  #authService = inject(AuthService)
  #router = inject(Router)

  userEmail: string = ''
  userPassword: string = ''

  onLogin = (form: NgForm) => {
    console.log(form.value)
    this.#authService.login(form.value.email, form.value.password)
    this.#router.navigateByUrl('facesnaps')
  }
}
