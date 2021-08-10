/**
 * Projects state
 * Follow tutorial here: https://fireship.io/lessons/ngxs-quick-start-angular-state-management/ for setting it up
 */

import {Action, createSelector, Selector, State, StateContext} from '@ngxs/store';
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

export interface Project {
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
  @Selector()
  static selectedProjectIndex(state: any) {
    return (index: number) => { //<--- Return a function from select
      if (index > state.projects.length - 1 || isNaN(index)) {
        return -1; // signifies an error
      }
      return state.projects[index];
    };
  }

  // store GET action in state
  @Action(StreamEmitted(GetAccount))
  getAccount({patchState}: StateContext<any>, {payload}: Emitted<GetAccount, any>) {
    patchState(
      payload
    )
  }

  @Action(OpenWriteProjectDialog)
  openWriteProjectDialog({setState}: StateContext<any>, {project}: OpenWriteProjectDialog): void {
    // can't close dialog in ngxs without ngZone. See GitHub responses here: https://github.com/ngxs/store/issues/1401
    this.ngZone.run(() => {
      this.dialog.open(WriteProjectDialogComponent, {
        panelClass: ['full-screen', 'animate__animated', 'animate__slideInRight', 'animate__faster'],
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
  setSelectedProject(ctx: StateContext<any>, payload: SetSelectedProject): void {
    const state = ctx.getState();

    if (state) {
      const selectedProject = state.projects[payload.selectedProjectIndex];
      ctx.patchState({selectedProject: selectedProject});
    }
  }

  @Action(ResetSelectedProject)
  resetSelectedProject({patchState}: StateContext<any>): void {
    patchState({selectedProject: defaults.selectedProject})
  }
}


