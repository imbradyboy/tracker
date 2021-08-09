import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthBaseService} from "../core/auth/auth-base.service";
import * as firebase from 'firebase/app';
import {NgxsFirestore, NgxsFirestoreAdapter} from "@ngxs-labs/firestore-plugin";
import {Store} from "@ngxs/store";
import {GetAccount, OpenDeleteProjectDialog} from "../core/state/projects/account.actions";


@Injectable({
  providedIn: 'root'
})
export class AccountService extends NgxsFirestore<any> {

  protected path: string;

  constructor(private afs: AngularFirestore, private auth: AuthBaseService, adapter: NgxsFirestoreAdapter,
              private store: Store) {
    super(adapter);
    this.path = `users`;
  }

  // this is taken care of in state
  // @ts-ignore
  async getAccountDoc(): Observable<any> {
    // snapshot changes so we can track whether or not this doc exists
    await this.store.dispatch(new GetAccount());
    await this.afs.doc(`users/${this.auth.getUserID()}`).snapshotChanges().subscribe(val => {
      console.log(val.payload.data());
    })
  }

  // do this here instead of state because it's a lot easier to do array Unions
  // and state is syncing this up anyway so it doesn't matter
  async writeProject(form: any, oldProject: any) {
    // Declaring batch
    const batch = this.afs.firestore.batch();

    // Reference to the filter document to be added to
    const docRef = await this.afs.doc(`users/${this.auth.getUserID()}`);

    // Initialize batch update filters
    await batch.set(docRef.ref, {
      projects: firebase.default.firestore.FieldValue.arrayUnion(form)
    }, {merge: true});

    if (oldProject) {
      await batch.set(docRef.ref, {
        projects: firebase.default.firestore.FieldValue.arrayRemove(oldProject)
      }, {merge: true});
    }

    // Run batch
    await batch.commit();
  }

  // do this here instead of state because it's a lot easier to do array Unions
  // and state is syncing this up anyway so it doesn't matter
  async openDeleteProjectDialog(project: any) {
    this.store.dispatch(new OpenDeleteProjectDialog(project));
  }

  async deleteProject(project: any) {
    await this.afs.doc(`users/${this.auth.getUserID()}`).set(
      {
        projects: firebase.default.firestore.FieldValue.arrayRemove(project)
      }, {merge: true});
  }
}
