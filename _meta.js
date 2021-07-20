import { Singleton } from './index.js';
const callback;

const meta = (data, tag, path) => {
    const payload =
    {
        time: Date.now(),
        auth: Singleton.auth.uid || null,
        path: path || null,
        size: calculate(data) || null,
        meta: tag || null,
    };
    if (Singleton)
        return await fetch(Singleton.dbUrl + `/tracker.json`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            method: "POST",
        })
    else {
        if (callback && typeof callback == "function") callback(payload);
        else return payload;
    }
}

function calculate(data) {
    const rawLength = typeof data == "string" ? byteCount(s)
        : byteCount(JSON.stringify(data))
    return Math.ceil(rawLength / 1000)
}
function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

const setCallback = (func) => callback = func;
export default { meta, callback, setCallback }