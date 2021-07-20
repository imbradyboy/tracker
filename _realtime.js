import { Singleton, Calculate } from './index.js';
const callback;

const trigger = (snapshot, meta, path) => {
    const payload =
    {
        time: Date.now(),
        auth: Singleton.auth.uid || null,
        path: path || snapshot.ref|| null,
        size: Calculate(snapshot.val()||snapshot) || null,
        meta: typeof meta =="string"? meta: JSON.stringify(meta) || null,
    };
    if (Singleton)
        return await fetch(Singleton.dbUrl + `/tracker/realtime.json`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            method: "POST",
        })
    else {
        if (callback && typeof callback == "function") callback(payload);
        else return payload;
    }
}

const setCallback = (func) => callback = func;
export default { trigger, setCallback }