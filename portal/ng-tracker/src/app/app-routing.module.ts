import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnauthParentComponent} from "./unauthenticated/unauth-parent/unauth-parent.component";
import {AboutComponent} from "./static-pages/about/about.component";
import {LoginComponent} from "./unauthenticated/login/login.component";
import {RegisterComponent} from "./unauthenticated/register/register.component";
import {ForgotPasswordComponent} from "./unauthenticated/forgot-password/forgot-password.component";

const routes: Routes =
  [
    {
      path: '',
      component: UnauthParentComponent,
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
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
