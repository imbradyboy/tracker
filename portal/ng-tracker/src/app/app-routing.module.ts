import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnauthParentComponent} from "./unauthenticated/unauth-parent/unauth-parent.component";
import {AboutComponent} from "./static-pages/about/about.component";
import {LoginComponent} from "./unauthenticated/login/login.component";
import {RegisterComponent} from "./unauthenticated/register/register.component";
import {ForgotPasswordComponent} from "./unauthenticated/forgot-password/forgot-password.component";
import {DashboardComponent} from "./account/dashboard/dashboard.component";
import {canActivate} from "@angular/fire/auth-guard";
import {map} from "rxjs/operators";

//region ROUTEGUARDS
/**
 * Allow only unauthenticated users
 */
const redirectLoggedInToProfile = () => map((user: any) => user ? [`${user.uid}/console`] : true)

/**
 * Only allow this user to access this page
 */
const allowOnlySelf = (next: any) => map((user: any) => (!!user && next.params.uid === user.uid) ? true : ['login']);


//endregion

const routes: Routes =
  [
    {
      path: ':uid/console',
      component: DashboardComponent,
      ...canActivate(allowOnlySelf)
    },
    {
      path: '',
      component: UnauthParentComponent,
      ...canActivate(redirectLoggedInToProfile),
      children: [
        {
          path: '',
          redirectTo: 'login',
          pathMatch: 'full'
        },
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'register',
          component: RegisterComponent,
        },
        {
          path: 'forgot-password',
          component: ForgotPasswordComponent,
        },
      ]
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},  // Wildcard route for a 404 error
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
