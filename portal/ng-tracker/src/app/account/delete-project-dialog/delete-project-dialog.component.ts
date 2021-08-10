import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OpenDeleteProjectDialog} from "../../core/state/projects/account.actions";
import {AccountService} from "../account.service";
import {PopupService} from "../../core/utilities/services/popup.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-project-dialog',
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.scss']
})
export class DeleteProjectDialogComponent implements OnInit {

  loading = false;
  error = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private accService: AccountService, private popup: PopupService,
              private dialogRef: MatDialogRef<DeleteProjectDialogComponent>, private router: Router) {
  }

  ngOnInit(): void {
  }

  async deleteProject(): Promise<void> {
    this.error = null;
    this.loading = true;

    try {
      await this.accService.deleteProject(this.data);
      await this.router.navigate([`/`]);
      this.dialogRef.close();
      this.popup.openSnackBar(`${this.data.nickname} was deleted`);
    } catch (err) {
      this.error = err.message || 'Something went wrong. Try again later';
      this.loading = false;
    }
  }
}
