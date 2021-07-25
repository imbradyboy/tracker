/**
 * Wrapper service for material snackbar to streamline the process of instantiating a snackbar
 * This service will eventually be expanded to include dialogs as well
 */

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
    });
  }
}
