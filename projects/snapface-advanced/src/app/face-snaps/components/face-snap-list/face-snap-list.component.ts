import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Observable, Subject, interval, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [
    FaceSnapComponent,
    AsyncPipe
  ],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  faceSnaps$!: Observable<FaceSnap[]>
  #_destroy$!: Subject<boolean>

  // injections
  #_faceSnapsService = inject(FaceSnapsService)
  
  ngOnInit(): void {
    this.faceSnaps$ = this.#_faceSnapsService.getAllFaceSnaps()

    this.#_destroy$ = new Subject<boolean>()

    interval(1000).pipe(
      takeUntil(this.#_destroy$),
      tap(console.log)
    )
    .subscribe()
  }

  ngOnDestroy(): void {
    this.#_destroy$.next(true)
  }
}
