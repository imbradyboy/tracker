import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";


const material = [
  MatButtonModule,
  MatSnackBarModule,
  MatToolbarModule
];


@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
