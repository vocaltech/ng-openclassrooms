import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaceSnapComponent } from './face-snap/face-snap.component';
import { FaceSnap } from './models/face-snap.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FaceSnapComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  snap_1!: FaceSnap
  snap_2!: FaceSnap
  snap_3!: FaceSnap

  ngOnInit(): void {
    this.snap_1 = new FaceSnap(
      'Mountains',
      'Nature flowers under the mountains.',
      3,
      new Date(),
      "assets/snaps/nature-flowers-under-the-mountains.jpg"
    )

    this.snap_2 = new FaceSnap(
      'Seas',
      'Relaxing under palm tree on a Seychelles beach.',
      3,
      new Date(),
      "assets/snaps/palm-tree-on-a-seychelles-beach.jpg"
    )

    this.snap_3 = new FaceSnap(
      'Forest',
      'Magical spring forest scenery in the morning.',
      3,
      new Date(),
      "assets/snaps/spring-forest-scenery.jpg"
    )
  }
}
