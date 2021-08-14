import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthBaseService} from "../core/auth/auth-base.service";
import * as firebase from 'firebase/app';
import {NgxsFirestore, NgxsFirestoreAdapter} from "@ngxs-labs/firestore-plugin";
import {Store} from "@ngxs/store";
import {GetAccount, OpenDeleteProjectDialog} from "../core/state/projects/account.actions";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {ActivatedRoute, Router} from "@angular/router";
import {delay, take, timeout} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AccountService extends NgxsFirestore<any> {

  protected path: string;

  constructor(private afs: AngularFirestore, private auth: AuthBaseService, adapter: NgxsFirestoreAdapter,
              private store: Store, private router: Router, private activatedRoute: ActivatedRoute) {
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
  async writeProject(form: any) {

    if (isNotNullOrUndefined(form.id)) {
      // get snapshot of projects from state
      const projects: any[] = this.store.snapshot().account.projects;

      // create editable copy of projects
      let projectsForUpdate = [...projects];

      // get the index of the project being updated by matching the url and nickname with an element in the state array
      const updateIndex = projects.findIndex((exp: any) => exp.id === form.id);

      // update the project at the found element
      projectsForUpdate[updateIndex] = form;

      // update this project
      const updateRes = await this.update$(this.auth.getUserID(),
        {
          projects: projectsForUpdate
        }, {merge: true});

      await updateRes.toPromise();

    } else {

      // construct a new project from the form data and auto generate an id for it
      const newProject = {
        ...form,
        id: this.createId()
      }


      // // this is a create so add a new project
      const createRes = await this.update$(this.auth.getUserID(), {
        projects: firebase.default.firestore.FieldValue.arrayUnion(newProject)
      }, {merge: true});

      await createRes.toPromise();

      await this.router.navigate([`projects/${newProject.id}`], {relativeTo: this.activatedRoute.firstChild});

    }
  }


  async openDeleteProjectDialog(project: any) {
    this.store.dispatch(new OpenDeleteProjectDialog(project));
  }

  async deleteProject(project: any) {
    const deleteRes = await this.update$(this.auth.getUserID(), {
        projects: firebase.default.firestore.FieldValue.arrayRemove(project)
      },
      {merge: true});

    await deleteRes.toPromise();
  }
}
