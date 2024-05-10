import { Component, Input, OnInit, inject } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap

  // injections
  #_faceSnapsService = inject(FaceSnapsService)
  #_router: Router = inject(Router)

  ngOnInit(): void {}

  onDetailBtnClick = () => {
    this.#_router.navigateByUrl(`facesnaps/${this.faceSnap.id}`)
  }
}
