import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConnectionService} from "ng-connection-service";
import {Observable, Subscription} from "rxjs";
import {PopupService} from "./core/utilities/services/popup.service";
import {Select, Store} from "@ngxs/store";
import {LoadingStateModel} from "./core/state/loader/loading.state";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "./core/auth/auth.service";
import {LogoutDialogComponent} from "./account/logout-dialog/logout-dialog.component";
import {OpenWriteProjectDialog} from "./core/state/projects/account.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-tracker';

  connectionSubscription: Subscription;

  @Select((state: any) => state.account.projects) projectState$: Observable<any> | undefined;
  @Select((state: any) => state.account.selectedProject) selectedProjectState$: Observable<any> | undefined;

  // loading state
  @Select((state: any) => state.loading) state$: Observable<LoadingStateModel> | undefined;

  constructor(private connectionService: ConnectionService, private popup: PopupService, private dialog: MatDialog,
              public auth: AuthService, private store: Store) {
    // listen for connection change to alert user if they go offline
    this.connectionSubscription = this.connectionService.monitor().subscribe(isConnected => {
      if (isConnected) {
        this.popup.openSnackBar('Internet connection is back online');
      } else {
        this.popup.openSnackBar('Your internet connection is offline');
      }
    });
  }

  ngOnInit(): void {
    console.log(this.store.snapshot().account);
  }

  ngOnDestroy(): void {
    this.connectionSubscription.unsubscribe();
  }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '350px' // set dialog width
    });

    // check value returned when dialog was closed to determine if user logged out
    dialogRef.afterClosed().toPromise().then(async result => {
      if (result === 'true') {
        await this.auth.logout();
      }
    });
  }

  openWriteProjectDialog() {
    this.store.dispatch([new OpenWriteProjectDialog]);
  }

  getSelectedProject() {
    // return
    return '0';
  }
}
