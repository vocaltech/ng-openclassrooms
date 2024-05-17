import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap.model";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {
  #faceSnaps: FaceSnap[] = [
        {
          id: 1,
          title: 'Mountains',
          description: 'Nature flowers under the mountains.',
          snaps: 200,
          createdDate: new Date(),
          imgUrl: 'assets/snaps/nature-flowers-under-the-mountains.jpg',
          location: 'Ariège'
        },
        {
          id: 2,
          title: 'Seas',
          description: 'Relaxing under palm tree on a Seychelles beach.',
          snaps: 3,
          createdDate: new Date(),
          imgUrl: 'assets/snaps/palm-tree-on-a-seychelles-beach.jpg'
        },
        {
          id: 3,
          title: 'Forest',
          description: 'Magical spring forest scenery in the morning.',
          snaps: 1,
          createdDate: new Date(),
          imgUrl: 'assets/snaps/spring-forest-scenery.jpg',
          location: 'Aude'
        }
  ]

  getAllFaceSnaps = (): FaceSnap[] => this.#faceSnaps

  getFaceSnapById = (id: number): FaceSnap|undefined => this.#faceSnaps.find((facesnap: FaceSnap) => facesnap.id === id)

  updateFaceSnapTotalById = (id: number, action: FaceSnapAction) => {
      const faceSnap = this.getFaceSnapById(id)

      if (faceSnap) { // facesnap is defined
        switch(action) {
          case FaceSnapAction.SNAP: {
            faceSnap.snaps++;
            break;
          }

          case FaceSnapAction.UNSNAP: {
            faceSnap.snaps--;
            break;
          }
        }
      }
  }

  createNewFaceSnap = (formValues: { title: string, description: string, imgUrl: string, location?: string}): void => {
    // get last id
    let lastId = this.#faceSnaps[this.#faceSnaps.length - 1].id

    // create new faceSnap 
    const newFaceSnap: FaceSnap = {
      ...formValues,
      id: ++lastId,
      snaps: 0,
      createdDate: new Date()
    }

    // Add to current faceSnaps array
    this.#faceSnaps.push(newFaceSnap)
  }
}

export enum FaceSnapAction {
  SNAP,
  UNSNAP
}