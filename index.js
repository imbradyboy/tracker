import firestore from './_firestore.js';
import realtime from './_realtime.js';
import storage from './_storage.js';
import meta from './_meta.js';

// Constants
let Singleton;

/* payload structure
{
    time: timestamp // 
    auth: string    //
    path: string    // DB.path/to/request
    size: number    // "1" = 1 kb || 1 doc 
    meta: string    // 1kb of properties
}
*/

const initiate = async function (databaseUrl, auth, ping = true) {
    Singleton ? Singleton[dbUrl] = databaseUrl :
        Singleton = { dbUrl = databaseUrl };

    if (ping && auth) {
        const pingPath = databaseUrl + `/tracker/_ping${auth.uid}.json`;
        return await fetch(pingPath, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    time: Date.now(),
                    auth: auth.uid || "Anonymous User",
                    path: "tracker/ping",
                    size: "1kb",
                    meta: "Tracker Initiation"
                }),
            method: "POST",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data;
            }, err => {
                return err;
            })
    }
}

const updateAuth = function (_auth) {
    Singleton ? Singleton[auth] = _auth :
        Singleton = { auth = _auth };
}



export default {Singleton, initiate, updateAuth, firestore,realtime,storage,meta}