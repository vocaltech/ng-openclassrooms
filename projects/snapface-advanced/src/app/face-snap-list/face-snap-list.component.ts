import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Subject, interval, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [
    FaceSnapComponent
  ],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  faceSnaps!: FaceSnap[]
  #_destroy$!: Subject<boolean>

  // injections
  #_faceSnapsService = inject(FaceSnapsService)
  
  ngOnInit(): void {
    this.faceSnaps = this.#_faceSnapsService.getAllFaceSnaps()
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
