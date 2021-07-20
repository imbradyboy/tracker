import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Create and show snackbar
   * @param message to be shown
   * @param actionText for dismiss button
   */
  openSnackBar(message: string, actionText: string = 'Ok'): void {
    this.snackBar.open(message, actionText, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      // panelClass: ['text-light', 'bg-primary']
    });
  }
}
