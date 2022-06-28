/*! Capacitor: https://capacitorjs.com/ - MIT License */
const capacitorExports = function (e) {
    "use strict";
    const n = (e => e.CapacitorPlatforms = (e => {
            const n = new Map;
            n.set("web", {name: "web"});
            const t = e.CapacitorPlatforms || {currentPlatform: {name: "web"}, platforms: n};
            return t.addPlatform = (e, n) => {
                t.platforms.set(e, n)
            }, t.setPlatform = e => {
                t.platforms.has(e) && (t.currentPlatform = t.platforms.get(e))
            }, t
        })(e))("undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}),
        t = n.addPlatform, i = n.setPlatform;
    var r;
    e.ExceptionCode = void 0, (r = e.ExceptionCode || (e.ExceptionCode = {})).Unimplemented = "UNIMPLEMENTED", r.Unavailable = "UNAVAILABLE";

    class o extends Error {
        constructor(e, n) {
            super(e), this.message = e, this.code = n
        }
    }

    const s = n => {
            var t, i, r, s, a;
            const l = n.CapacitorCustomPlatform || null, d = n.Capacitor || {}, c = d.Plugins = d.Plugins || {},
                u = n.CapacitorPlatforms,
                m = (null === (t = null == u ? void 0 : u.currentPlatform) || void 0 === t ? void 0 : t.getPlatform) || (() => null !== l ? l.name : (e => {
                    var n, t;
                    return (null == e ? void 0 : e.androidBridge) ? "android" : (null === (t = null === (n = null == e ? void 0 : e.webkit) || void 0 === n ? void 0 : n.messageHandlers) || void 0 === t ? void 0 : t.bridge) ? "ios" : "web"
                })(n)),
                f = (null === (i = null == u ? void 0 : u.currentPlatform) || void 0 === i ? void 0 : i.isNativePlatform) || (() => "web" !== m()),
                g = (null === (r = null == u ? void 0 : u.currentPlatform) || void 0 === r ? void 0 : r.isPluginAvailable) || (e => {
                    const n = w.get(e);
                    return !!(null == n ? void 0 : n.platforms.has(m())) || !!v(e)
                }),
                v = (null === (s = null == u ? void 0 : u.currentPlatform) || void 0 === s ? void 0 : s.getPluginHeader) || (e => {
                    var n;
                    return null === (n = d.PluginHeaders) || void 0 === n ? void 0 : n.find((n => n.name === e))
                }), w = new Map,
                p = (null === (a = null == u ? void 0 : u.currentPlatform) || void 0 === a ? void 0 : a.registerPlugin) || ((n, t = {}) => {
                    const i = w.get(n);
                    if (i) return console.warn(`Capacitor plugin "${n}" already registered. Cannot register plugins twice.`), i.proxy;
                    const r = m(), s = v(n);
                    let a;
                    const u = i => {
                        let c;
                        const u = (...u) => {
                            const m = (async () => (!a && r in t ? a = a = "function" == typeof t[r] ? await t[r]() : t[r] : null !== l && !a && "web" in t && (a = a = "function" == typeof t.web ? await t.web() : t.web), a))().then((t => {
                                const a = ((t, i) => {
                                    var a, l;
                                    if (!s) {
                                        if (t) return null === (l = t[i]) || void 0 === l ? void 0 : l.bind(t);
                                        throw new o(`"${n}" plugin is not implemented on ${r}`, e.ExceptionCode.Unimplemented)
                                    }
                                    {
                                        const e = null == s ? void 0 : s.methods.find((e => i === e.name));
                                        if (e) return "promise" === e.rtype ? e => d.nativePromise(n, i.toString(), e) : (e, t) => d.nativeCallback(n, i.toString(), e, t);
                                        if (t) return null === (a = t[i]) || void 0 === a ? void 0 : a.bind(t)
                                    }
                                })(t, i);
                                if (a) {
                                    const e = a(...u);
                                    return c = null == e ? void 0 : e.remove, e
                                }
                                throw new o(`"${n}.${i}()" is not implemented on ${r}`, e.ExceptionCode.Unimplemented)
                            }));
                            return "addListener" === i && (m.remove = async () => c()), m
                        };
                        return u.toString = () => `${i.toString()}() { [capacitor code] }`, Object.defineProperty(u, "name", {
                            value: i,
                            writable: !1,
                            configurable: !1
                        }), u
                    }, f = u("addListener"), g = u("removeListener"), p = (e, n) => {
                        const t = f({eventName: e}, n), i = async () => {
                            const i = await t;
                            g({eventName: e, callbackId: i}, n)
                        }, r = new Promise((e => t.then((() => e({remove: i})))));
                        return r.remove = async () => {
                            console.warn("Using addListener() without 'await' is deprecated."), await i()
                        }, r
                    }, h = new Proxy({}, {
                        get(e, n) {
                            switch (n) {
                                case"$$typeof":
                                    return;
                                case"toJSON":
                                    return () => ({});
                                case"addListener":
                                    return s ? p : f;
                                case"removeListener":
                                    return g;
                                default:
                                    return u(n)
                            }
                        }
                    });
                    return c[n] = h, w.set(n, {
                        name: n,
                        proxy: h,
                        platforms: new Set([...Object.keys(t), ...s ? [r] : []])
                    }), h
                });
            return d.convertFileSrc || (d.convertFileSrc = e => e), d.getPlatform = m, d.handleError = e => n.console.error(e), d.isNativePlatform = f, d.isPluginAvailable = g, d.pluginMethodNoop = (e, n, t) => Promise.reject(`${t} does not have an implementation of "${n}".`), d.registerPlugin = p, d.Exception = o, d.DEBUG = !!d.DEBUG, d.isLoggingEnabled = !!d.isLoggingEnabled, d.platform = d.getPlatform(), d.isNative = d.isNativePlatform(), d
        },
        a = (e => e.Capacitor = s(e))("undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}),
        l = a.registerPlugin, d = a.Plugins;
    const c = l("WebView");
    return e.Capacitor = a, e.CapacitorException = o, e.CapacitorPlatforms = n, e.Plugins = d, e.WebPlugin = class {
        constructor(e) {
            this.listeners = {}, this.windowListeners = {}, e && (console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`), this.config = e)
        }

        addListener(e, n) {
            this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(n);
            const t = this.windowListeners[e];
            t && !t.registered && this.addWindowListener(t);
            const i = async () => this.removeListener(e, n), r = Promise.resolve({remove: i});
            return Object.defineProperty(r, "remove", {
                value: async () => {
                    console.warn("Using addListener() without 'await' is deprecated."), await i()
                }
            }), r
        }

        async removeAllListeners() {
            this.listeners = {};
            for (const e in this.windowListeners) this.removeWindowListener(this.windowListeners[e]);
            this.windowListeners = {}
        }

        notifyListeners(e, n) {
            const t = this.listeners[e];
            t && t.forEach((e => e(n)))
        }

        hasListeners(e) {
            return !!this.listeners[e].length
        }

        registerWindowListener(e, n) {
            this.windowListeners[n] = {
                registered: !1, windowEventName: e, pluginEventName: n, handler: e => {
                    this.notifyListeners(n, e)
                }
            }
        }

        unimplemented(n = "not implemented") {
            return new a.Exception(n, e.ExceptionCode.Unimplemented)
        }

        unavailable(n = "not available") {
            return new a.Exception(n, e.ExceptionCode.Unavailable)
        }

        async removeListener(e, n) {
            const t = this.listeners[e];
            if (!t) return;
            const i = t.indexOf(n);
            this.listeners[e].splice(i, 1), this.listeners[e].length || this.removeWindowListener(this.windowListeners[e])
        }

        addWindowListener(e) {
            window.addEventListener(e.windowEventName, e.handler), e.registered = !0
        }

        removeWindowListener(e) {
            e && (window.removeEventListener(e.windowEventName, e.handler), e.registered = !1)
        }
    }, e.WebView = c, e.addPlatform = t, e.registerPlugin = l, e.registerWebPlugin = e => ((e, n) => {
        var t;
        const i = n.config, r = e.Plugins;
        if (!i || !i.name) throw new Error('Capacitor WebPlugin is using the deprecated "registerWebPlugin()" function, but without the config. Please use "registerPlugin()" instead to register this web plugin."');
        console.warn(`Capacitor plugin "${i.name}" is using the deprecated "registerWebPlugin()" function`), r[i.name] && !(null === (t = null == i ? void 0 : i.platforms) || void 0 === t ? void 0 : t.includes(e.getPlatform())) || (r[i.name] = n)
    })(a, e), e.setPlatform = i, Object.defineProperty(e, "__esModule", {value: !0}), e
}({});
//# sourceMappingURL=capacitor.js.map
