import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConnectionService} from "ng-connection-service";
import {Subscription} from "rxjs";
import {PopupService} from "./core/utilities/services/popup.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-tracker';

  connectionSubscription: Subscription;

  constructor(private connectionService: ConnectionService, private popup: PopupService) {
    // listen for connection change to alert user if they go offline
    this.connectionSubscription = this.connectionService.monitor().subscribe(isConnected => {
      if (isConnected) {
        this.popup.openSnackBar('Internet connection is back online');
      } else {
        this.popup.openSnackBar('Your internet connection is offline');
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.connectionSubscription.unsubscribe();
  }
}
