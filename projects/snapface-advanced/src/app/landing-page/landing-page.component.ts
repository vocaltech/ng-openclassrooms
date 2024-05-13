import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  // injections
  #_router: Router = inject(Router)

  // attributes
  userEmail: string = 'your.email@me.com'

  onContinue() {
    this.#_router.navigateByUrl('facesnaps')
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value)
  }
}
