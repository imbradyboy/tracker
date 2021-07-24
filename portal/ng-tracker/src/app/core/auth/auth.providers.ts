/**
 * injectables for auth portion of application
 */


import {InjectionToken} from '@angular/core';


/*______________________________________________________________________
 * AUTH
 * ______________________________________________________________________*/
export const authErrorsListToken = new InjectionToken('authErrorsToken');

// possible firebase auth errors
export const authErrorCodes: Map<string, string> = new Map([
  ['auth/invalid-email', 'Invalid email'],
  ['auth/wrong-password', 'Invalid password'],
  ['auth/user-not-found', 'No user with that email exists'],
  ['auth/email-already-in-use', 'A user with that email already exists'],
  ['auth/network-request-failed', 'No internet connection'],
  ['auth/too-many-requests', 'Too many failed attempts'],
  ['auth/user-disabled', 'Account disabled by an admin'],
  ['auth/user-mismatch', 'Credentials don\'t match previous user']
]);
