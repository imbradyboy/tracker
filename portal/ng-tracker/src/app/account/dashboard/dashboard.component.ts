import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {AccountService} from "../account.service";
import {map, share, tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {AuthBaseService} from "../../core/auth/auth-base.service";
import {Select, Store} from "@ngxs/store";
import {GetAccount, OpenWriteProjectDialog, SetSelectedProject} from "../../core/state/projects/account.actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // loading state
  @Select((state: any) => state.account) state$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, private accService: AccountService, private store: Store, public auth: AuthBaseService) {
  }

  async ngOnInit() {}

  openWriteProjectDialog() {
    this.store.dispatch([new OpenWriteProjectDialog]);
  }
}
