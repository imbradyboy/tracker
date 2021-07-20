import firestore from './_firestore.js';
import realtime from './_realtime.js';
import storage from './_storage.js';
import meta from './_meta.js';

// Constant
let Singleton;

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
                    auth: auth.uid || "AU",
                    path: "tracker/ping",
                    size: "1kb",
                    meta: "Tracker Initiation"
                }),
            method: "PUT",
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
    if(Singleton) Singleton[auth] = _auth
    else throw new Error("Tracker is not Initialized");
    return Singleton;
}

// should use readAsArrayBuffer for accurate size
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer
export const Calculate = (data) => {
    const rawLength = typeof data == "string" ? byteCount(s)
        : byteCount(JSON.stringify(data))
    return Math.ceil(rawLength / 1000)
}
const  byteCount = (s)=> {
    return encodeURI(s).split(/%..|./).length - 1;
}

export default {Singleton, initiate, updateAuth, firestore,realtime,storage,meta}