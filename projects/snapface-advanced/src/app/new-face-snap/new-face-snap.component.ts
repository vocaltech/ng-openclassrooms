import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-face-snap',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss'
})
export class NewFaceSnapComponent implements OnInit {
  #_formBuilder = inject(FormBuilder)

  snapForm!: FormGroup

  ngOnInit(): void {
    this.snapForm = this.#_formBuilder.group({
      title: [null],
      description: [null],
      imageUrl: [null],
      location: [null]
    })
  }

  onSubmitForm(): void {
    console.log(this.snapForm.value)
  }
}
