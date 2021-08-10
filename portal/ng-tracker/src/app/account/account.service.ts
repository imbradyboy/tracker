import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthBaseService} from "../core/auth/auth-base.service";
import * as firebase from 'firebase/app';
import {NgxsFirestore, NgxsFirestoreAdapter} from "@ngxs-labs/firestore-plugin";
import {Store} from "@ngxs/store";
import {GetAccount, OpenDeleteProjectDialog, SetSelectedProject} from "../core/state/projects/account.actions";


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
  }

  // do this here instead of state because it's a lot easier to do array Unions
  // and state is syncing this up anyway so it doesn't matter
  async writeProject(form: any, oldProject: any) {

    if (oldProject) {
      // get snapshot of projects from state
      const projects: any[] = this.store.snapshot().account.projects;

      // create editable copy of projects
      let projectsForUpdate = [...projects];

      // get the index of the project being updated by matching the url and nickname with an element in the state array
      const updateIndex = projects.findIndex((exp: any) => exp.nickname === oldProject.nickname && exp.dbURL === oldProject.dbURL);

      // update the project at the found element
      projectsForUpdate[updateIndex] = form;

      // update this project
      await this.afs.doc(`users/${this.auth.getUserID()}`).update({
        projects: projectsForUpdate
      });

      // re fetch selected project because we have changed its name
      this.store.dispatch(new SetSelectedProject(updateIndex));
    } else {
      // this is a create so add a new project
      await this.afs.doc(`users/${this.auth.getUserID()}`).set({
        projects: firebase.default.firestore.FieldValue.arrayUnion(form)
      }, {merge: true});
    }

    // // Declaring batch
    // const batch = this.afs.firestore.batch();
    //
    // // Reference to the filter document to be added to
    // const docRef = await this.afs.doc(`users/${this.auth.getUserID()}`);
    //
    // // Initialize batch update filters
    // await batch.set(docRef.ref, {
    //   projects: firebase.default.firestore.FieldValue.arrayUnion(form)
    // }, {merge: true});
    //
    // if (oldProject) {
    //   await batch.set(docRef.ref, {
    //     projects: firebase.default.firestore.FieldValue.arrayRemove(oldProject)
    //   }, {merge: true});
    // }
    //
    // // Run batch
    // await batch.commit();
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
