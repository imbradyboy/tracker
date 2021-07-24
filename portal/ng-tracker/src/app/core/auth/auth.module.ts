import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {environment} from "../../../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireModule} from "@angular/fire";
import {BUCKET} from "@angular/fire/storage";
import {authErrorCodes, authErrorsListToken} from "./auth.providers";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({synchronizeTabs: true}), // allows persistent data
  ],
  providers: [
    { provide: authErrorsListToken, useValue: authErrorCodes},
    { provide: BUCKET, useValue: 'fire-base-tracker.appspot.com' },
  ]
})
export class AuthModule { }
