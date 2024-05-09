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
  faceSnaps!: FaceSnap[]

  ngOnInit(): void {
    this.faceSnaps = [
      {
        title: 'Mountains',
        description: 'Nature flowers under the mountains.',
        snaps: 200,
        createdDate: new Date(),
        imgUrl: 'assets/snaps/nature-flowers-under-the-mountains.jpg',
        location: 'Ariège'
      },
      {
        title: 'Seas',
        description: 'Relaxing under palm tree on a Seychelles beach.',
        snaps: 3,
        createdDate: new Date(),
        imgUrl: 'assets/snaps/palm-tree-on-a-seychelles-beach.jpg'
      },
      {
        title: 'Forest',
        description: 'Magical spring forest scenery in the morning.',
        snaps: 1,
        createdDate: new Date(),
        imgUrl: 'assets/snaps/spring-forest-scenery.jpg',
        location: 'Aude'
      }
    ]
  }
}
