import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { FaceSnap } from '../core/models/face-snap.model';
import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { FaceSnapsService } from '../core/services/face-snaps.service';
import { Router } from '@angular/router';

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
  #_faceSnapService = inject(FaceSnapsService)
  #_router = inject(Router)

  snapForm!: FormGroup
  faceSnapPreview$!: Observable<FaceSnap> 
  urlRegexp!: RegExp

  ngOnInit(): void {
    this.urlRegexp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/

    this.snapForm = this.#_formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imgUrl: [null, [Validators.required, Validators.pattern(this.urlRegexp)]],
      location: [null],
    }, {
      updateOn: 'blur'
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
    this.#_faceSnapService.createNewFaceSnap(this.snapForm.value)
    .pipe(
      tap(() => {
        this.#_router.navigateByUrl('facesnaps')
      })
    )
    .subscribe()
  }
}
