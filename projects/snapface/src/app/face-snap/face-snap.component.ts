import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap

  isLiked: boolean = false
  btnLikedText: string = "Like"

  snapStyle!: object

  ngOnInit(): void {
    this.snapStyle = {
      'margin-left':'8px', 
      'color': 'rgb(0, ' + this.faceSnap.snaps + ' ,0)'
    }
  }

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
