/**
 * Projects state
 * Follow tutorial here: https://fireship.io/lessons/ngxs-quick-start-angular-state-management/ for setting it up
 */

import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GetAccount, OpenWriteProjectDialog} from "./account.actions";
import {MatDialog} from "@angular/material/dialog";
import {WriteProjectDialogComponent} from "../../../account/write-project/write-project-dialog/write-project-dialog.component";
import {Injectable, NgZone} from "@angular/core";
import {Connected, Emitted, NgxsFirestoreConnect, StreamEmitted} from "@ngxs-labs/firestore-plugin";
import {AccountService} from "../../../account/account.service";
import {iif, insertItem, patch, updateItem} from "@ngxs/store/operators";
import {AuthBaseService} from "../../auth/auth-base.service";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {Route, Router} from "@angular/router";

export interface AccountStateModel {
  projects: [{dbUrl: string, nickname: string}]
  value: number;
  isVisible: boolean;
}

@State<any>({
  name: 'account',
  defaults: []
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
  static getIndexed(state: any, router: Router) {
    return async (index: number) => { //<--- Return a function from select
      if (index > state[0]?.projects.length) {
        throw new Error('Invalid route params');
    }


      return state[0]?.projects[index];
    };
  }

  // store GET action in state
  @Action(StreamEmitted(GetAccount))
  getAccount({setState}: StateContext<any>, {payload}: Emitted<GetAccount, any>) {
    setState(
      iif(
        (projects) =>
          !!(projects as any)?.find((pro: { id: any; }) => pro.id === payload.id),
        updateItem((pro) => (pro as any).id === payload.id, patch(payload)),
        insertItem(payload)
      )
    )
  }

  @Action(OpenWriteProjectDialog)
  openWriteProjectDialog(): void {
    // can't close dialog in ngxs without ngZone. See GitHub responses here: https://github.com/ngxs/store/issues/1401
    this.ngZone.run(() => {
      this.dialog.open(WriteProjectDialogComponent, {
        panelClass: ['full-screen', 'animate__animated', 'animate__slideInRight', 'animate__faster'],
        autoFocus: false,
      })
    });
  }
}


