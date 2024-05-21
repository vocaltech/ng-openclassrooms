import { Routes } from "@angular/router";
import { FaceSnapListComponent } from "./components/face-snap-list/face-snap-list.component";
import { SingleFaceSnapComponent } from "./components/single-face-snap/single-face-snap.component";
import { NewFaceSnapComponent } from "./components/new-face-snap/new-face-snap.component";

export const routes: Routes = [
    { path: '', component: FaceSnapListComponent },
    { path: 'create', component: NewFaceSnapComponent },
    { path: ':id', component: SingleFaceSnapComponent }
];