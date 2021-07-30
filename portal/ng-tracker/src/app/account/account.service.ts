import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private afs: AngularFirestore) { }

  getAccountDoc(uid: string): AngularFirestoreDocument<unknown> {
    console.log(uid);
    // snapshot changes so we can track whether or not this doc exists
    return this.afs.doc(`users/${uid}`);
  }
}
