import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapAction, FaceSnapsService } from '../services/face-snaps.service';
import { AsyncPipe, DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    AsyncPipe,
    UpperCasePipe,
    DatePipe,
    NgClass,
    NgStyle,
    RouterLink
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>
  isLiked: boolean = false
  btnLikedText: string = "Like"

  // injections
  #_route: ActivatedRoute = inject(ActivatedRoute)
  #_faceSnapsService = inject(FaceSnapsService)

  ngOnInit(): void {
    const faceSnapId = +this.#_route.snapshot.params['id']
    this.faceSnap$ = this.#_faceSnapsService.getFaceSnapById(faceSnapId)!
  }

  snapStyle(totalSnaps: number) {
    return {
      'margin-left':'8px', 
      'color': 'rgb(0, ' + totalSnaps + ' , 0)'
    }

  }

  onSnapBtnClick = (faceSnapId: number) => {
    this.isLiked = !this.isLiked

    if (this.isLiked) {
       this.faceSnap$ = this.#_faceSnapsService.updateFaceSnapTotalById(faceSnapId, FaceSnapAction.SNAP)
       .pipe(
        tap(() => {
          this.btnLikedText = 'Unlike!'
        })
       )
    } else {
      this.faceSnap$= this.#_faceSnapsService.updateFaceSnapTotalById(faceSnapId, FaceSnapAction.UNSNAP)
      .pipe(
        tap(() => {
          this.btnLikedText = 'Like!'
        })
      )
    }
  }
}
