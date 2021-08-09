import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "./core/auth/auth.module";
import {MaterialModule} from "./core/material/material.module";
import {ConnectionServiceModule} from "ng-connection-service";
import {BgImageDirective} from './core/utilities/directives/bg-image.directive';
import {UnauthParentComponent} from './unauthenticated/unauth-parent/unauth-parent.component';
import {AboutComponent} from './static-pages/about/about.component';
import {LoginComponent} from './unauthenticated/login/login.component';
import {RegisterComponent} from './unauthenticated/register/register.component';
import {ForgotPasswordComponent} from './unauthenticated/forgot-password/forgot-password.component';
import {DashboardComponent} from './account/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {NgxsModule} from "@ngxs/store";
import {LoadingState} from "./core/state/loader/loading.state";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {environment} from "../environments/environment";
import {LogoutDialogComponent} from './account/logout-dialog/logout-dialog.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {WriteProjectComponent} from './account/write-project/write-project.component';
import {WriteProjectDialogComponent} from './account/write-project/write-project-dialog/write-project-dialog.component';
import {ProjectComponent} from './account/project/project.component';
import {ProjectCardComponent} from './account/dashboard/project-card/project-card.component';
import {AccountState} from "./core/state/projects/account.state";
import {LoadingSpinnerComponent} from './core/utilities/components/loading-spinner/loading-spinner.component';
import {NgxsFirestoreModule} from "@ngxs-labs/firestore-plugin";
import {AccountComponent} from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    BgImageDirective,
    UnauthParentComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    LogoutDialogComponent,
    WriteProjectDialogComponent,
    WriteProjectComponent,
    WriteProjectDialogComponent,
    ProjectComponent,
    ProjectCardComponent,
    LoadingSpinnerComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule, // controls all firebase authentication rules
    MaterialModule,
    ConnectionServiceModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule, // RxWeb Reactive forms validators
    NgxsModule.forRoot([ // ngxs
      LoadingState,
      AccountState,
    ], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsFirestoreModule.forRoot(),
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
