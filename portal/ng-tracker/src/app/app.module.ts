import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthModule} from "./core/auth/auth.module";
import {MaterialModule} from "./core/material/material.module";
import {ConnectionServiceModule} from "ng-connection-service";
import { BgImageDirective } from './core/utilities/directives/bg-image.directive';
import { UnauthParentComponent } from './unauthenticated/unauth-parent/unauth-parent.component';
import { AboutComponent } from './static-pages/about/about.component';
import { LoginComponent } from './unauthenticated/login/login.component';
import { RegisterComponent } from './unauthenticated/register/register.component';
import { ForgotPasswordComponent } from './unauthenticated/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    BgImageDirective,
    UnauthParentComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule, // controls all firebase authentication rules
    MaterialModule,
    ConnectionServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
