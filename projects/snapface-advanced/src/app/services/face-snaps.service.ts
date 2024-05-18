import { Injectable, inject } from "@angular/core";
import { FaceSnap } from "../models/face-snap.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {
  #_http = inject(HttpClient)
  #faceSnaps: FaceSnap[] = []

  getAllFaceSnaps = (): Observable<FaceSnap[]> => this.#_http.get<FaceSnap[]>('http://localhost:3001/facesnaps')

  getFaceSnapById = (id: number): Observable<FaceSnap> => this.#_http.get<FaceSnap>(`http://localhost:3001/facesnaps/${id}`)

  updateFaceSnapTotalById = (id: number, action: FaceSnapAction): Observable<FaceSnap> => {
      return this.getFaceSnapById(id).pipe(
        map(facesnap => ({
          ...facesnap,
          snaps: facesnap.snaps + (action === FaceSnapAction.SNAP ? 1: -1)
        })),
        switchMap(updatedFaceSnap => this.#_http.put<FaceSnap>(`http://localhost:3001/facesnaps/${id}`, updatedFaceSnap))
      )
  }

  createNewFaceSnap = (formValues: { title: string, description: string, imgUrl: string, location?: string}): Observable<FaceSnap> => {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a: FaceSnap, b: FaceSnap) => a.id - b.id)),
      map(sortedFaceSnaps => sortedFaceSnaps[sortedFaceSnaps.length - 1]),
      map(higherIdFaceSnap => ({
        ...formValues,
        id: ++higherIdFaceSnap.id,
        snaps: 0,
        createdDate: new Date()
      })),
      switchMap(newFaceSnap => this.#_http.post<FaceSnap>('http://localhost:3001/facesnaps', newFaceSnap))
    )
  }
}

export enum FaceSnapAction {
  SNAP,
  UNSNAP
}