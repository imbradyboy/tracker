/**
 * Projects state
 * Follow tutorial here: https://fireship.io/lessons/ngxs-quick-start-angular-state-management/ for setting it up
 */

import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  GetAccount,
  OpenDeleteProjectDialog,
  OpenWriteProjectDialog,
  ResetSelectedProject,
  SetSelectedProject
} from "./account.actions";
import {MatDialog} from "@angular/material/dialog";
import {WriteProjectDialogComponent} from "../../../account/write-project/write-project-dialog/write-project-dialog.component";
import {Injectable, NgZone} from "@angular/core";
import {Connected, Emitted, NgxsFirestoreConnect, StreamEmitted} from "@ngxs-labs/firestore-plugin";
import {AccountService} from "../../../account/account.service";
import {iif, insertItem, patch, updateItem} from "@ngxs/store/operators";
import {AuthBaseService} from "../../auth/auth-base.service";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {Route, Router} from "@angular/router";
import {LoadingStateModel} from "../loader/loading.state";
import {DeleteProjectDialogComponent} from "../../../account/delete-project-dialog/delete-project-dialog.component";
import {Observable} from "rxjs";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

export interface Project {
  id: string,
  dbUrl: string,
  nickname: string,
}

export interface AccountStateModel {
  projects: Project[],
  selectedProject: any
}

const defaults: AccountStateModel = {
  projects: [],
  selectedProject: -1
};

@State<any>({
  name: 'account',
  defaults: defaults
})

@Injectable()
export class AccountState {

  constructor(private auth: AuthBaseService, private dialog: MatDialog, private ngZone: NgZone,
              private accService: AccountService, private ngxsFirestoreConnect: NgxsFirestoreConnect, private router: Router) {
  }

  ngxsOnInit() {
    // query doc
    this.ngxsFirestoreConnect.connect(GetAccount, {
      to: () => this.accService.doc$(this.auth.getUserID()),
    });
  }

  // returns the required index
  // @Selector()
  // static selectedProjectIndex(state: any) {
  //   return (id: string) => { //<--- Return a function from select
  //     const elementIndex = state.projects.findIndex((exp: any) => exp.id === id);
  //     return state.projects[elementIndex] || -1;
  //   };
  // }

  // store GET action in state
  @Action(StreamEmitted(GetAccount))
  getAccount(ctx: StateContext<any>, {payload}: Emitted<GetAccount, any>) {

    // make sure payload exists before trying to patch
    if (isNotNullOrUndefined(payload)) {
      ctx.patchState(
        payload
      )
    }

    // check if a selected project already exists and update it here
    const state = ctx.getState();
    const selectedProject = state.selectedProject;
    if (isNotNullOrUndefined(selectedProject)) {
      ctx.dispatch(new SetSelectedProject(selectedProject.id));
    }
  }

  @Action(OpenWriteProjectDialog)
  openWriteProjectDialog({setState}: StateContext<any>, {project}: OpenWriteProjectDialog): void {
    // can't close dialog in ngxs without ngZone. See GitHub responses here: https://github.com/ngxs/store/issues/1401
    this.ngZone.run(() => {
      this.dialog.open(WriteProjectDialogComponent, {
        panelClass: ['full-screen-dialog', 'animate__animated', 'animate__slideInRight', 'animate__faster'],
        data: project, // if this is an edit then project will exist
        autoFocus: false,
      })
    });
  }

  @Action(OpenDeleteProjectDialog)
  openDeleteProjectDialog({setState}: StateContext<any>, {project}: OpenDeleteProjectDialog): void {
    // can't close dialog in ngxs without ngZone. See GitHub responses here: https://github.com/ngxs/store/issues/1401
    this.ngZone.run(() => {
      this.dialog.open(DeleteProjectDialogComponent, {
        data: project, // if this is an edit then project will exist
        autoFocus: false,
      })
    });
  }

  @Action(SetSelectedProject)
  setSelectedProject(ctx: StateContext<any>, payload: SetSelectedProject) {
    const state = ctx.getState();

    const elementIndex = state.projects.findIndex((exp: any) => exp.id === payload.selectedProjectId);

    // invalid route param so redirect to console
    if (elementIndex === -1) {
      return this.router.navigate([`account/${this.auth.getUserID()}`]);
    }

    // return state.projects[index];
    const selectedProject = state.projects[elementIndex];
    return ctx.patchState({selectedProject: selectedProject});
  }

  @Action(ResetSelectedProject)
  resetSelectedProject({patchState}: StateContext<any>): void {
    patchState({selectedProject: defaults.selectedProject})
  }
}


