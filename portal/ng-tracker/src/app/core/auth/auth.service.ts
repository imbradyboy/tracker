/**
 * Auth extends auth-base and gives it core functionality such as logout, signin/register, send emails, etc
 * It is the full-featured version of auth
 */

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthBaseService} from './auth-base.service';
import firebase from "firebase/app";
import {Store} from "@ngxs/store";
import {DisconnectAll} from "@ngxs-labs/firestore-plugin";
import {StateResetAll} from "ngxs-reset-plugin";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthBaseService {

  constructor(afAuth: AngularFireAuth, private router: Router, private store: Store) {
    super(afAuth);
  }

  /*______________________________________________________________________
   * Functions for onboarding such as sign in and register
   * ______________________________________________________________________*/

  //region ONBOARDING

  /**
   * Creates firebase user account
   * @param email to register with
   * @param password to register with
   */
  async signUp(email: string, password: string): Promise<void> {
    // create user with firebase function
    const response = await this.afAuth.createUserWithEmailAndPassword(email, password);
    // await response.user?.sendEmailVerification(); // send verification email
    await this.routeUser('dashboard'); // route to account dashboard
  }

  /**
   * Sign user in with credentials
   * @param email to login in
   * @param password to login with
   */
  async signIn(email: string, password: string): Promise<void> {
    // sign in with firebase function
    await this.afAuth.signInWithEmailAndPassword(email, password);
    await this.routeUser('dashboard'); // route to user's profile
  }

//endregion

  /*______________________________________________________________________
   * Functions used in settings such as changing email, password, deleting
   * account, or reauthenticating the user
   * ______________________________________________________________________*/

  //region SETTINGS

  /**
   * Updates user's password
   * @param password is new password that will be used
   */
  async updatePassword(password: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    await user?.updatePassword(password);
  }

  /**
   * Updates user's email address
   * @param email for new user email address
   */
  async updateEmail(email: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    await user?.updateEmail(email);
    await user?.sendEmailVerification();
  }

  /**
   * Permanently deletes current user's account
   */
  async deleteAccount(): Promise<void> {
    const user = await this.afAuth.currentUser;
    await user?.delete(); // delete account
    await this.router.navigate(['/login']); // navigate back to login page
  }

  /**
   * Re authenticates user's credentials for sensitive information changes
   * @param password passed in for credential
   */
  async reAuthenticateUser(password: string): Promise<void> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.getEmail(),
      password
    );
    await this.getUser()?.reauthenticateWithCredential(credential);
  }

  //endregion

  /*______________________________________________________________________
   * Utility functions that includes sending emails, log out, reload user,
   * route, etc
   * ______________________________________________________________________*/

  //region UTILITY
  /**
   * Sends email verification email to the user
   */
  async sendEmailVerification(): Promise<void> {
    await this.getUser()?.sendEmailVerification();
  }

  /**
   * Resets a user's password
   * @param email is email associated with account
   */
  async sendResetPasswordEmail(email: string): Promise<void> {
    await this.afAuth.sendPasswordResetEmail(email);
  }

  /**
   * reload AngularFire auth to check for updated
   * values email verification/updated role
   */
  async reloadUserAuth(): Promise<void> {
    await this.getUser()?.reload();
    await this.getUser()?.getIdToken(true); // reload user toke
  }

  /**
   * Logs user out of their account
   */
  async logout(): Promise<void> {
    await this.afAuth.signOut(); // calls firebase function to logout
    this.store.dispatch(new DisconnectAll()); // disconnect all firebase listeners
    this.store.dispatch(new StateResetAll()); // reset state to default
    await this.router.navigate(['/login']); // navigate back to login page
  }

  /**
   * Routes user to their profile
   */
  async routeUser(path: string): Promise<void> {
    await this.router.navigate([`account/${this.getUserID()}`]); // route to profile
  }

  //endregion

}
