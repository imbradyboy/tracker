import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-write-project-write-project-dialog',
  templateUrl: './write-project-dialog.component.html',
  styleUrls: ['./write-project-dialog.component.scss']
})
export class WriteProjectDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<WriteProjectDialogComponent>) { }

  ngOnInit(): void {
  }

  isComplete($event: boolean) {
    if ($event) {
      this.dialogRef.close();
    }
  }
}
