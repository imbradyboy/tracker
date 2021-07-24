import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";


const material = [
  MatButtonModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatMenuModule,
  MatDialogModule,
  MatDividerModule
];


@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
