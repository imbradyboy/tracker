/**
 * Projects state
 * Follow tutorial here: https://fireship.io/lessons/ngxs-quick-start-angular-state-management/ for setting it up
 */

import {Action} from '@ngxs/store';
import {OpenWriteProjectDialog} from "./projects.actions";
import {MatDialog} from "@angular/material/dialog";
import {WriteProjectDialogComponent} from "../../../account/write-project/write-project-dialog/write-project-dialog.component";
import {Injectable, NgZone} from "@angular/core";

@Injectable()
export class ProjectsState {

  constructor(private dialog: MatDialog, private ngZone: NgZone) {
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


