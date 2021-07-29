import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {AngularFirestore} from "@angular/fire/firestore";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PreloadResolver implements Resolve<boolean> {

  constructor(private afs: AngularFirestore) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const uid = route.paramMap.get('uid');

    return this.afs.doc(`users/${uid}`).valueChanges().pipe(first());
  }
}
