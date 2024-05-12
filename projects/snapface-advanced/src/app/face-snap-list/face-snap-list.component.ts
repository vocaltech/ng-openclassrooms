import { Component, OnInit, inject } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [
    FaceSnapComponent
  ],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent implements OnInit {
  faceSnaps!: FaceSnap[]

  // injections
  #_faceSnapsService = inject(FaceSnapsService)
  
  ngOnInit(): void {
    this.faceSnaps = this.#_faceSnapsService.getAllFaceSnaps()
  }
}
