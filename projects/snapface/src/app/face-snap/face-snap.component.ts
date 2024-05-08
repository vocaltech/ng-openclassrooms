import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap

  isLiked: boolean = false
  btnLikedText: string = "Like"

  ngOnInit(): void {}

  onSnapBtnClick = () => {
    this.isLiked = !this.isLiked

    if (this.isLiked) {
      this.btnLikedText = 'Dislike!'
      this.faceSnap.snaps++
    } else {
      this.btnLikedText = 'Like!'
      this.faceSnap.snaps--
    }
  }
}
