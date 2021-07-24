import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutDialogComponent>) {
  }

  ngOnInit(): void {
    // set dialog position
    this.dialogRef.updatePosition({top: '55px'});
  }

}
