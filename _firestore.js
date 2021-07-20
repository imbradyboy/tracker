import { Singleton, Calculate } from './index.js';
const callback;

const trigger = (snapshot, tag, path) => {
    const docCount = getDocumentCount(snapshot);
    const payload =
    {
        time: Date.now(),
        auth: Singleton.auth.uid || null,
        path: path || snapshot.path || snapshot.ref || null,
        size: docCount.count || null,
        meta: typeof tag == "string" ? tag : JSON.stringify(tag) || null,
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
function getDocumentCount(snapshot) {
    if (snapshot.docs) {
        let _count = 0;
        let _cache = 0;
        if (snapshot.size > 0) {
            snapshot.forEach(doc => {
                doc.metadata.fromCache ? cache++ : _count++;
            });
        }
        return { count: snapshot.size || _count, cache: _cache };
    }
    else {
        return {count: snapshot.exists() ? 1 : 0, cache: snapshot.metadata.fromCache ? 1 : 0}
    }
}
}
const setCallback = (func) => callback = func;
export default { trigger, callback, setCallback }