import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';
import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-new-face-snap',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    UpperCasePipe,
    DatePipe
  ],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss'
})
export class NewFaceSnapComponent implements OnInit {
  #_formBuilder = inject(FormBuilder)

  snapForm!: FormGroup
  faceSnapPreview$!: Observable<FaceSnap> 

  ngOnInit(): void {
    this.snapForm = this.#_formBuilder.group({
      title: [null],
      description: [null],
      imgUrl: [null],
      location: [null]
    })

    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map<any, FaceSnap>(formValue => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: 0
      }))
    )
  }

  onSubmitForm(): void {
    console.log(this.snapForm.value)
  }
}
