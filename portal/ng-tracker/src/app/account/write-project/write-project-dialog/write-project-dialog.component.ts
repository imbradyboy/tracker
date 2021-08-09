import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {$e} from "codelyzer/angular/styles/chars";

@Component({
  selector: 'app-write-project-write-project-dialog',
  templateUrl: './write-project-dialog.component.html',
  styleUrls: ['./write-project-dialog.component.scss']
})
export class WriteProjectDialogComponent implements OnInit {

  loading = false;

  constructor(private dialogRef: MatDialogRef<WriteProjectDialogComponent>) { }

  ngOnInit(): void {
  }

  isComplete($event: boolean) {
    if ($event) {
      this.dialogRef.close();
    }
  }

  isLoading($event: boolean) {
    this.loading = $event;
  }
}
