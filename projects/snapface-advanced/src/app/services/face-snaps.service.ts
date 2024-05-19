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

  #URL = 'http://localhost:3001/facesnaps'
  #URL_PROXY = '/api/facesnaps'

  //getAllFaceSnaps = (): Observable<FaceSnap[]> => this.#_http.get<FaceSnap[]>(this.#URL)
  getAllFaceSnaps = (): Observable<FaceSnap[]> => this.#_http.get<FaceSnap[]>(this.#URL_PROXY)

  //getFaceSnapById = (id: number): Observable<FaceSnap> => this.#_http.get<FaceSnap>(`${this.#URL}/${id}`)
  getFaceSnapById = (id: number): Observable<FaceSnap> => this.#_http.get<FaceSnap>(`${this.#URL_PROXY}/${id}`)

  updateFaceSnapTotalById = (id: number, action: FaceSnapAction): Observable<FaceSnap> => {
      return this.getFaceSnapById(id).pipe(
        map(facesnap => ({
          ...facesnap,
          snaps: facesnap.snaps + (action === FaceSnapAction.SNAP ? 1: -1)
        })),
        //switchMap(updatedFaceSnap => this.#_http.put<FaceSnap>(`${this.#URL}/${id}`, updatedFaceSnap))
        switchMap(updatedFaceSnap => this.#_http.put<FaceSnap>(`${this.#URL_PROXY}/${id}`, updatedFaceSnap))
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
      //switchMap(newFaceSnap => this.#_http.post<FaceSnap>(this.#URL, newFaceSnap))
      switchMap(newFaceSnap => this.#_http.post<FaceSnap>(this.#URL_PROXY, newFaceSnap))
    )
  }
}

export enum FaceSnapAction {
  SNAP,
  UNSNAP
}