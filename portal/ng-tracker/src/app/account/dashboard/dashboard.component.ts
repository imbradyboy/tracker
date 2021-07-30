import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {AccountService} from "../account.service";
import {map, share, tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {WriteProjectDialogComponent} from "./write-project/write-project-dialog/write-project-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  accountDoc$: Observable<any> | undefined;

  saleData = [
    {name: "Mobiles", value: 105000},
    {name: "Laptop", value: 55000},
    {name: "AC", value: 15000},
    {name: "Headsets and Other Stuff for long title", value: 150000},
    {name: "Fridge", value: 20000}
  ];

  constructor(private route: ActivatedRoute, private accService: AccountService, private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    const uid = this.route.snapshot.paramMap.get('uid') as string;

    await this.getAccountDoc(uid);
  }

  async getAccountDoc(uid: string): Promise<void> {
    console.log(uid);
    // use tap so we can perform side effects
    this.accountDoc$ = this.accService.getAccountDoc(uid).snapshotChanges().pipe(map(((doc, index) => {
      const data = doc.payload.data;
      const id = doc.payload.id;
      const exists = doc.payload.exists;

      return {exists, id, ...data, index};
    })), tap((doc: any) => {
      if (!doc.exists && doc.index === 0) {
        this.openDialog();
      }
    }))

  }

  openDialog(): void {

    this.dialog.open(WriteProjectDialogComponent, {
      panelClass: ['full-screen', 'animate__animated', 'animate__slideInRight', 'animate__faster']
    })

  }
}
