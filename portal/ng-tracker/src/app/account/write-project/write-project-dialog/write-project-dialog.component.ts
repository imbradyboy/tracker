import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {$e} from "codelyzer/angular/styles/chars";

@Component({
  selector: 'app-write-project-write-project-dialog',
  templateUrl: './write-project-dialog.component.html',
  styleUrls: ['./write-project-dialog.component.scss']
})
export class WriteProjectDialogComponent implements OnInit {

  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<WriteProjectDialogComponent>) { }

  ngOnInit(): void {}

  isComplete($event: boolean) {
    if ($event) {
      this.dialogRef.close();
    }
  }

  isLoading($event: boolean) {
    this.loading = $event || false;
  }
}
