*Alpha v0.1
This is a Firebase Usage Tracker, it is designed to to capture snapshots from firebase calls to Firestore and Realtime, Storage is not functional at this current time.

The package uses the REST API to reduce any potential overhead

to Use:
```javascript
import tracker from '@firebase-me/tracker';

tracker.init(databaseUrl, auth(optional), ping?(optional))
```
> databaseURL is the realtime database url from your web credentials
> auth - optional - only needed when initiating after the user is declared
> ping - optional - only valid if a current auth object is processed

when the user state changes, the user auth object needs to be updated:
```javascript
onAuthStateChanged(user){
    tracker.updateAuth(user)
}
```
If you are not using the web modules; the only required fields are the user UID and the ID token for authenticating the request.
you can pass it as the `user` object as such `{uid:"userUID", idToken:"ID token Credential"}`



There are 3 ways we intend to allow users to utilize this suite:
1: Pass the snapshot from the request into the appropriate tracker method and it will update to the appropriate realtime DB.
2: Assign a custom callback function via: `tracker.<service>.callback = myFuntion(payload){}`
3: If no callback(2) is assigned and the tracker has not been initialized: it will simply return the payload as a JSON object so you can handle it through a console log, custom integration, etc.



To use the trigger to log each respective database type:
```javascript
// Firestore
tracker.firestore.trigger(snapshot|data, meta?, customPath?)
// Realtime DB
tracker.realtime.trigger(snapshot|data, meta?, customPath?)
// Storage (not implimented)
// tracker.storage.trigger(snapshot|data, meta?, customPath?)
// Custom Meta
tracker.meta.trigger(payloadObject|data, meta?, customPath?)
```
Each snapshot is evaluated, Firestore as Documents (supports cached tracking)
Realtime DB is evaluated as Bytes and rounded to the nearest KB
Meta uses the same as Realtime.
Each trigger also supports custom path overrides, allowing you to define assign the snapshot path as a unique path independant of their original reference path. This can be used for custom filtering and targeting.

*Storage is not functional at this time, please do not use it as it will most likely throw errors.*
