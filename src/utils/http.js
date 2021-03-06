export const fetchPostDataEncode = (url = '', data = {}, fetchmethod = 'POST', fetchmode='cors') => {
    const esc = encodeURIComponent;
    var query = Object.keys(data)
                .map(k => esc(k)+ '=' + esc(data[k]))
                .join('&');
    return fetch(url, {
        method: fetchmethod, // *GET, POST, PUT, DELETE, etc.
        mode: fetchmode, // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: query
    });
};
export const fetchPostDataPreserve = (url = '', data = {}, fetchmethod = 'POST', fetchmode='cors') => {
    const esc = encodeURIComponent;
    let query = (obj) => {
                    let str = [],
                    p;
                    for (p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        let k = p, v;
                        if (Array.isArray(obj[p])){
                            let pArr = obj[p].map(a =>`"${a}"`);
                            v = `[${pArr}]`;
                        } else{
                            v = obj[p];
                        }

                       str.push(esc(k) + "=" + esc(v));
                    }
                    }
                    return str.join("&");
                };
    query = query(data);
    return fetch(url, {
        method: fetchmethod, // *GET, POST, PUT, DELETE, etc.
        mode: fetchmode, // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: query
    });
};

export const fetchGetData = (url = '', fetchmethod = 'GET', fetchmode = 'cors') => {
   
    return fetch(url, {
        method: fetchmethod, // *GET, POST, PUT, DELETE, etc.
        mode: fetchmode, // no-cors, cors, *same-origin
        // cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Accept": "application/json",
        }
    });
};