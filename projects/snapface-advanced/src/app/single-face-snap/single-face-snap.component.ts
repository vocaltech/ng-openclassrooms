import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapAction, FaceSnapsService } from '../services/face-snaps.service';
import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
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
  faceSnap!: FaceSnap
  isLiked: boolean = false
  btnLikedText: string = "Like"
  snapStyle!: object

  // injections
  #_route: ActivatedRoute = inject(ActivatedRoute)
  #_faceSnapsService = inject(FaceSnapsService)

  ngOnInit(): void {
    const faceSnapId = +this.#_route.snapshot.params['id']
    this.faceSnap = this.#_faceSnapsService.getFaceSnapById(faceSnapId)!

    this.snapStyle = {
      'margin-left':'8px', 
      'color': 'rgb(0, ' + this?.faceSnap?.snaps + ' ,0)'
    }
  }

  onSnapBtnClick = () => {
    this.isLiked = !this.isLiked

    if (this.isLiked) {
      this.btnLikedText = 'Dislike!'
      this.#_faceSnapsService.updateFaceSnapTotalById(this.faceSnap.id, FaceSnapAction.SNAP)
    } else {
      this.btnLikedText = 'Like!'
      this.#_faceSnapsService.updateFaceSnapTotalById(this.faceSnap.id, FaceSnapAction.UNSNAP)
    }
  }
}
