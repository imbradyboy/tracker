import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthBaseService} from "../core/auth/auth-base.service";
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private afs: AngularFirestore, private auth: AuthBaseService) {
  }

  getAccountDoc(uid: string): AngularFirestoreDocument<unknown> {
    console.log(uid);
    // snapshot changes so we can track whether or not this doc exists
    return this.afs.doc(`users/${uid}`);
  }

  async writeProject(form: any) {
    await this.afs.doc(`users/${this.auth.getUserID()}`).set(
      {
        projects: firebase.default.firestore.FieldValue.arrayUnion(form)
      }, {merge: true})
  }
}
