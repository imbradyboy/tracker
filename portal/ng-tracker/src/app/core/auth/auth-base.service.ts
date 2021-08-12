/**
 * Auth-state listens for changes in the auth object and allows for the retrieval of attributes associated with the
 * auth object. It is the most basic stripped down version of auth with only getters and no modification functionality
 * This class is EXTENDED by the AUTH service which is fully featured with modification, email, etc functionality
 */

import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import firebase from "firebase/app";
import User = firebase.User;
import {DisconnectAll} from "@ngxs-labs/firestore-plugin";
import {StateReset, StateResetAll} from "ngxs-reset-plugin";
import {Store} from "@ngxs/store";
import {AccountState} from "../state/projects/account.state";

@Injectable({
  providedIn: 'root'
})
export class AuthBaseService {

  private user: User | undefined;
  private isValidUser: boolean = false;
  private userRole = null;

  constructor(protected afAuth: AngularFireAuth, protected store: Store) {
    // listen for IdToken change instead of authstate so we can detect
    // when user has had user custom claim applied if user role has been updated to admin or employee
    this.afAuth.onIdTokenChanged(async user => {
      if (user) { // user is authenticated
        this.user = user;

        user.getIdTokenResult(true).then(idTokenResult => {
          this.isValidUser = !!idTokenResult.claims.user; // this could be undefined so convert it to boolean
          this.userRole = idTokenResult.claims.userRole;
        });
      } else {
        this.store.dispatch(new DisconnectAll()); // disconnect all firebase listeners
        this.store.dispatch(new StateResetAll()); // reset state to default
        this.store.dispatch(new StateReset(AccountState)); // to reset the persistent account state
        this.user = undefined; // not authenticated so set user to null
        this.userRole = null;
        this.isValidUser = false;
      }
    });
  }

  /*______________________________________________________________________
   * GETTERS
   * ______________________________________________________________________*/

  //region GETTERS

  /**
   * Get Firebase auth user object
   */
  getUser(): firebase.User | undefined {
    return this.user;
  }

  /**
   * Get Firebase auth UID
   */
  getUserID(): string {
    return this.user?.uid as string;
  }

  /**
   * Get email
   */
  getEmail(): string {
    return this.user?.email as string;
  }

  /**
   * Get Firebase auth display name
   */
  getDisplayName(): string {
    return this.user?.displayName as string;
  }

  /**
   * Get Firebase auth display name
   */
  getPhotoURL(): string {
    return this.user?.photoURL as string;
  }

  /**
   * Check if user's email is verified
   */
  isEmailVerified(): boolean {
    return this.user?.emailVerified as boolean;
  }

  /**
   * Get user's role if it exists
   */
  getUserRole(): string | null {
    return this.userRole;
  }

  /**
   * Determines if this is a valid user
   */
  getIsValidUser(): boolean | null {
    return this.isValidUser;
  }

  //endregion

  /*______________________________________________________________________
   * UTILITY FUNCTIONS
   * ______________________________________________________________________*/

  //region UTILITY FUNCTIONS

  /**
   * Checks if user is logged in
   */
  isLoggedIn(): boolean {
    return isNotNullOrUndefined(this.getUser());
  }

  //endregion
}
