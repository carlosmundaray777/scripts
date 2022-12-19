const head = function (e, t, n, r, o, a, s) {
        (a = t.createElement(n)),
            (s = t.getElementsByTagName(n)[0]),
            a.appendChild(t.createTextNode(r.text)),
            (a.onload = o(r)),
            s ? s.parentNode.insertBefore(a, s) : t.head.appendChild(a);
        //    console.log("a", a);
    },
    fetchInject = function (e, t) {
        if (!e || !Array.isArray(e))
            return Promise.reject(new TypeError("`inputs` must be an array"));
        if (t && !(t instanceof Promise))
            return Promise.reject(new TypeError("`promise` must be a promise"));
        const n = [],
            r = t ? [].concat(t) : [],
            o = [];
        return (
            e.forEach((e) =>
                r.push(
                    window
                        .fetch(e, {
                            cache: "no-store",
                        })
                        .then((e) => [e.clone().text(), e.blob()])
                        .then((e) =>
                            Promise.all(e).then((e) => {
                                n.push({
                                    text: e[0],
                                    blob: e[1],
                                });
                            })
                        )
                )
            ),
            Promise.all(r).then(
                () => (
                    n.forEach((e) => {
                        o.push({
                            then: (t) => {
                                e.blob.type.includes("text/css")
                                    ? head(window, document, "style", e, t)
                                    : head(window, document, "script", e, t);
                            },
                        });
                    }),
                    o.forEach(async (a) => {
                        await a;
                    })
                    // Promise.all(o)
                )
            )
        );
    };

const head_module = function (e, t, n, r, o, a, s) {
        (a = t.createElement(n)),
            a.setAttribute("type", "module"),
            (s = t.getElementsByTagName(n)[0]),
            a.appendChild(t.createTextNode(r.text)),
            (a.onload = o(r)),
            s ? s.parentNode.insertBefore(a, s) : t.head.appendChild(a);
        //console.log(a);
    },
    fetchInjectModule = function (e, t) {
        if (!e || !Array.isArray(e))
            return Promise.reject(new TypeError("`inputs` must be an array"));
        if (t && !(t instanceof Promise))
            return Promise.reject(new TypeError("`promise` must be a promise"));
        const n = [],
            r = t ? [].concat(t) : [],
            o = [];
        return (
            e.forEach((e) =>
                r.push(
                    window
                        .fetch(e, {
                            cache: "no-store",
                        })
                        .then((e) => [e.clone().text(), e.blob()])
                        .then((e) =>
                            Promise.all(e).then((e) => {
                                n.push({
                                    text: e[0],
                                    blob: e[1],
                                });
                            })
                        )
                )
            ),
            Promise.all(r).then(
                () => (
                    n.forEach((e) => {
                        o.push({
                            then: (t) => {
                                e.blob.type.includes("text/css")
                                    ? head(window, document, "style", e, t)
                                    : head_module(
                                          window,
                                          document,
                                          "script",
                                          e,
                                          t
                                      );
                            },
                        });
                    }),
                    o.forEach(async (a) => {
                        await a;
                    })
                    //  Promise.all(o)
                )
            )
        );
    };
