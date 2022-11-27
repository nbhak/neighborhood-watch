import { _getProvider as e, getApp as t, _registerComponent as n, registerVersion as i, SDK_VERSION as r } from "/firebase/firebase-app.js";
const s = !1,
    o = "${JSCORE_VERSION}",
    a = function (e, t) {
        if (!e) throw l(t);
    },
    l = function (e) {
        return new Error("Firebase Database (" + o + ") INTERNAL ASSERT FAILED: " + e);
    },
    h = function (e) {
        const t = [];
        let n = 0;
        for (let i = 0; i < e.length; i++) {
            let r = e.charCodeAt(i);
            r < 128
                ? (t[n++] = r)
                : r < 2048
                ? ((t[n++] = (r >> 6) | 192), (t[n++] = (63 & r) | 128))
                : 55296 == (64512 & r) && i + 1 < e.length && 56320 == (64512 & e.charCodeAt(i + 1))
                ? ((r = 65536 + ((1023 & r) << 10) + (1023 & e.charCodeAt(++i))), (t[n++] = (r >> 18) | 240), (t[n++] = ((r >> 12) & 63) | 128), (t[n++] = ((r >> 6) & 63) | 128), (t[n++] = (63 & r) | 128))
                : ((t[n++] = (r >> 12) | 224), (t[n++] = ((r >> 6) & 63) | 128), (t[n++] = (63 & r) | 128));
        }
        return t;
    },
    c = {
        byteToCharMap_: null,
        charToByteMap_: null,
        byteToCharMapWebSafe_: null,
        charToByteMapWebSafe_: null,
        ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + "+/=";
        },
        get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + "-_.";
        },
        HAS_NATIVE_SUPPORT: "function" == typeof atob,
        encodeByteArray(e, t) {
            if (!Array.isArray(e)) throw Error("encodeByteArray takes an array as a parameter");
            this.init_();
            const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
                i = [];
            for (let t = 0; t < e.length; t += 3) {
                const r = e[t],
                    s = t + 1 < e.length,
                    o = s ? e[t + 1] : 0,
                    a = t + 2 < e.length,
                    l = a ? e[t + 2] : 0,
                    h = r >> 2,
                    c = ((3 & r) << 4) | (o >> 4);
                let u = ((15 & o) << 2) | (l >> 6),
                    d = 63 & l;
                a || ((d = 64), s || (u = 64)), i.push(n[h], n[c], n[u], n[d]);
            }
            return i.join("");
        },
        encodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(h(e), t);
        },
        decodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
                ? atob(e)
                : (function (e) {
                      const t = [];
                      let n = 0,
                          i = 0;
                      for (; n < e.length; ) {
                          const r = e[n++];
                          if (r < 128) t[i++] = String.fromCharCode(r);
                          else if (r > 191 && r < 224) {
                              const s = e[n++];
                              t[i++] = String.fromCharCode(((31 & r) << 6) | (63 & s));
                          } else if (r > 239 && r < 365) {
                              const s = (((7 & r) << 18) | ((63 & e[n++]) << 12) | ((63 & e[n++]) << 6) | (63 & e[n++])) - 65536;
                              (t[i++] = String.fromCharCode(55296 + (s >> 10))), (t[i++] = String.fromCharCode(56320 + (1023 & s)));
                          } else {
                              const s = e[n++],
                                  o = e[n++];
                              t[i++] = String.fromCharCode(((15 & r) << 12) | ((63 & s) << 6) | (63 & o));
                          }
                      }
                      return t.join("");
                  })(this.decodeStringToByteArray(e, t));
        },
        decodeStringToByteArray(e, t) {
            this.init_();
            const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
                i = [];
            for (let t = 0; t < e.length; ) {
                const r = n[e.charAt(t++)],
                    s = t < e.length ? n[e.charAt(t)] : 0;
                ++t;
                const o = t < e.length ? n[e.charAt(t)] : 64;
                ++t;
                const a = t < e.length ? n[e.charAt(t)] : 64;
                if ((++t, null == r || null == s || null == o || null == a)) throw Error();
                const l = (r << 2) | (s >> 4);
                if ((i.push(l), 64 !== o)) {
                    const e = ((s << 4) & 240) | (o >> 2);
                    if ((i.push(e), 64 !== a)) {
                        const e = ((o << 6) & 192) | a;
                        i.push(e);
                    }
                }
            }
            return i;
        },
        init_() {
            if (!this.byteToCharMap_) {
                (this.byteToCharMap_ = {}), (this.charToByteMap_ = {}), (this.byteToCharMapWebSafe_ = {}), (this.charToByteMapWebSafe_ = {});
                for (let e = 0; e < this.ENCODED_VALS.length; e++)
                    (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                        (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                        (this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e)),
                        (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
                        e >= this.ENCODED_VALS_BASE.length && ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e), (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
            }
        },
    },
    u = function (e) {
        const t = h(e);
        return c.encodeByteArray(t, !0);
    },
    d = function (e) {
        return u(e).replace(/\./g, "");
    },
    _ = function (e) {
        try {
            return c.decodeString(e, !0);
        } catch (e) {
            console.error("base64Decode failed: ", e);
        }
        return null;
    };
function p(e) {
    return f(void 0, e);
}
function f(e, t) {
    if (!(t instanceof Object)) return t;
    switch (t.constructor) {
        case Date:
            return new Date(t.getTime());
        case Object:
            void 0 === e && (e = {});
            break;
        case Array:
            e = [];
            break;
        default:
            return t;
    }
    for (const n in t) t.hasOwnProperty(n) && "__proto__" !== n && (e[n] = f(e[n], t[n]));
    return e;
}
function g() {
    return (
        "undefined" != typeof window &&
        !!(window.cordova || window.phonegap || window.PhoneGap) &&
        /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined" != typeof navigator && "string" == typeof navigator.userAgent ? navigator.userAgent : "")
    );
}
function m() {
    return !0 === s;
}
const y = () =>
        (function () {
            if ("undefined" != typeof self) return self;
            if ("undefined" != typeof window) return window;
            if ("undefined" != typeof global) return global;
            throw new Error("Unable to locate global object.");
        })().__FIREBASE_DEFAULTS__,
    v = () => {
        try {
            return (
                y() ||
                (() => {
                    if ("undefined" == typeof process || void 0 === process.env) return;
                    const e = process.env.__FIREBASE_DEFAULTS__;
                    return e ? JSON.parse(e) : void 0;
                })() ||
                (() => {
                    if ("undefined" == typeof document) return;
                    let e;
                    try {
                        e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
                    } catch (e) {
                        return;
                    }
                    const t = e && _(e[1]);
                    return t && JSON.parse(t);
                })()
            );
        } catch (e) {
            return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
        }
    },
    C = (e) => {
        const t = ((e) => {
            var t, n;
            return null === (n = null === (t = v()) || void 0 === t ? void 0 : t.emulatorHosts) || void 0 === n ? void 0 : n[e];
        })(e);
        if (!t) return;
        const n = t.lastIndexOf(":");
        if (n <= 0 || n + 1 === t.length) throw new Error(`Invalid host ${t} with no separate hostname and port!`);
        const i = parseInt(t.substring(n + 1), 10);
        return "[" === t[0] ? [t.substring(1, n - 1), i] : [t.substring(0, n), i];
    };
class w {
    constructor() {
        (this.reject = () => {}),
            (this.resolve = () => {}),
            (this.promise = new Promise((e, t) => {
                (this.resolve = e), (this.reject = t);
            }));
    }
    wrapCallback(e) {
        return (t, n) => {
            t ? this.reject(t) : this.resolve(n), "function" == typeof e && (this.promise.catch(() => {}), 1 === e.length ? e(t) : e(t, n));
        };
    }
}
function T(e) {
    return JSON.parse(e);
}
function b(e) {
    return JSON.stringify(e);
}
const E = function (e) {
    let t = {},
        n = {},
        i = {},
        r = "";
    try {
        const s = e.split(".");
        (t = T(_(s[0]) || "")), (n = T(_(s[1]) || "")), (r = s[2]), (i = n.d || {}), delete n.d;
    } catch (e) {}
    return { header: t, claims: n, data: i, signature: r };
};
function I(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
}
function S(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
}
function k(e) {
    for (const t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
    return !0;
}
function N(e, t, n) {
    const i = {};
    for (const r in e) Object.prototype.hasOwnProperty.call(e, r) && (i[r] = t.call(n, e[r], r, e));
    return i;
}
class P {
    constructor() {
        (this.chain_ = []), (this.buf_ = []), (this.W_ = []), (this.pad_ = []), (this.inbuf_ = 0), (this.total_ = 0), (this.blockSize = 64), (this.pad_[0] = 128);
        for (let e = 1; e < this.blockSize; ++e) this.pad_[e] = 0;
        this.reset();
    }
    reset() {
        (this.chain_[0] = 1732584193), (this.chain_[1] = 4023233417), (this.chain_[2] = 2562383102), (this.chain_[3] = 271733878), (this.chain_[4] = 3285377520), (this.inbuf_ = 0), (this.total_ = 0);
    }
    compress_(e, t) {
        t || (t = 0);
        const n = this.W_;
        if ("string" == typeof e) for (let i = 0; i < 16; i++) (n[i] = (e.charCodeAt(t) << 24) | (e.charCodeAt(t + 1) << 16) | (e.charCodeAt(t + 2) << 8) | e.charCodeAt(t + 3)), (t += 4);
        else for (let i = 0; i < 16; i++) (n[i] = (e[t] << 24) | (e[t + 1] << 16) | (e[t + 2] << 8) | e[t + 3]), (t += 4);
        for (let e = 16; e < 80; e++) {
            const t = n[e - 3] ^ n[e - 8] ^ n[e - 14] ^ n[e - 16];
            n[e] = 4294967295 & ((t << 1) | (t >>> 31));
        }
        let i,
            r,
            s = this.chain_[0],
            o = this.chain_[1],
            a = this.chain_[2],
            l = this.chain_[3],
            h = this.chain_[4];
        for (let e = 0; e < 80; e++) {
            e < 40 ? (e < 20 ? ((i = l ^ (o & (a ^ l))), (r = 1518500249)) : ((i = o ^ a ^ l), (r = 1859775393))) : e < 60 ? ((i = (o & a) | (l & (o | a))), (r = 2400959708)) : ((i = o ^ a ^ l), (r = 3395469782));
            const t = (((s << 5) | (s >>> 27)) + i + h + r + n[e]) & 4294967295;
            (h = l), (l = a), (a = 4294967295 & ((o << 30) | (o >>> 2))), (o = s), (s = t);
        }
        (this.chain_[0] = (this.chain_[0] + s) & 4294967295),
            (this.chain_[1] = (this.chain_[1] + o) & 4294967295),
            (this.chain_[2] = (this.chain_[2] + a) & 4294967295),
            (this.chain_[3] = (this.chain_[3] + l) & 4294967295),
            (this.chain_[4] = (this.chain_[4] + h) & 4294967295);
    }
    update(e, t) {
        if (null == e) return;
        void 0 === t && (t = e.length);
        const n = t - this.blockSize;
        let i = 0;
        const r = this.buf_;
        let s = this.inbuf_;
        for (; i < t; ) {
            if (0 === s) for (; i <= n; ) this.compress_(e, i), (i += this.blockSize);
            if ("string" == typeof e) {
                for (; i < t; )
                    if (((r[s] = e.charCodeAt(i)), ++s, ++i, s === this.blockSize)) {
                        this.compress_(r), (s = 0);
                        break;
                    }
            } else
                for (; i < t; )
                    if (((r[s] = e[i]), ++s, ++i, s === this.blockSize)) {
                        this.compress_(r), (s = 0);
                        break;
                    }
        }
        (this.inbuf_ = s), (this.total_ += t);
    }
    digest() {
        const e = [];
        let t = 8 * this.total_;
        this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        for (let e = this.blockSize - 1; e >= 56; e--) (this.buf_[e] = 255 & t), (t /= 256);
        this.compress_(this.buf_);
        let n = 0;
        for (let t = 0; t < 5; t++) for (let i = 24; i >= 0; i -= 8) (e[n] = (this.chain_[t] >> i) & 255), ++n;
        return e;
    }
}
function x(e, t) {
    return `${e} failed: ${t} argument `;
}
const R = function (e) {
    let t = 0;
    for (let n = 0; n < e.length; n++) {
        const i = e.charCodeAt(n);
        i < 128 ? t++ : i < 2048 ? (t += 2) : i >= 55296 && i <= 56319 ? ((t += 4), n++) : (t += 3);
    }
    return t;
};
function A(e) {
    return e && e._delegate ? e._delegate : e;
}
class D {
    constructor(e, t, n) {
        (this.name = e), (this.instanceFactory = t), (this.type = n), (this.multipleInstances = !1), (this.serviceProps = {}), (this.instantiationMode = "LAZY"), (this.onInstanceCreated = null);
    }
    setInstantiationMode(e) {
        return (this.instantiationMode = e), this;
    }
    setMultipleInstances(e) {
        return (this.multipleInstances = e), this;
    }
    setServiceProps(e) {
        return (this.serviceProps = e), this;
    }
    setInstanceCreatedCallback(e) {
        return (this.onInstanceCreated = e), this;
    }
}
var O;
!(function (e) {
    (e[(e.DEBUG = 0)] = "DEBUG"), (e[(e.VERBOSE = 1)] = "VERBOSE"), (e[(e.INFO = 2)] = "INFO"), (e[(e.WARN = 3)] = "WARN"), (e[(e.ERROR = 4)] = "ERROR"), (e[(e.SILENT = 5)] = "SILENT");
})(O || (O = {}));
const L = { debug: O.DEBUG, verbose: O.VERBOSE, info: O.INFO, warn: O.WARN, error: O.ERROR, silent: O.SILENT },
    F = O.INFO,
    M = { [O.DEBUG]: "log", [O.VERBOSE]: "log", [O.INFO]: "info", [O.WARN]: "warn", [O.ERROR]: "error" },
    q = (e, t, ...n) => {
        if (t < e.logLevel) return;
        const i = new Date().toISOString(),
            r = M[t];
        if (!r) throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
        console[r](`[${i}]  ${e.name}:`, ...n);
    };
const W = "@firebase/database";
let U = "";
function B(e) {
    U = e;
}
class j {
    constructor(e) {
        (this.domStorage_ = e), (this.prefix_ = "firebase:");
    }
    set(e, t) {
        null == t ? this.domStorage_.removeItem(this.prefixedName_(e)) : this.domStorage_.setItem(this.prefixedName_(e), b(t));
    }
    get(e) {
        const t = this.domStorage_.getItem(this.prefixedName_(e));
        return null == t ? null : T(t);
    }
    remove(e) {
        this.domStorage_.removeItem(this.prefixedName_(e));
    }
    prefixedName_(e) {
        return this.prefix_ + e;
    }
    toString() {
        return this.domStorage_.toString();
    }
}
class H {
    constructor() {
        (this.cache_ = {}), (this.isInMemoryStorage = !0);
    }
    set(e, t) {
        null == t ? delete this.cache_[e] : (this.cache_[e] = t);
    }
    get(e) {
        return I(this.cache_, e) ? this.cache_[e] : null;
    }
    remove(e) {
        delete this.cache_[e];
    }
}
const V = function (e) {
        try {
            if ("undefined" != typeof window && void 0 !== window[e]) {
                const t = window[e];
                return t.setItem("firebase:sentinel", "cache"), t.removeItem("firebase:sentinel"), new j(t);
            }
        } catch (e) {}
        return new H();
    },
    z = V("localStorage"),
    Y = V("sessionStorage"),
    K = new (class {
        constructor(e) {
            (this.name = e), (this._logLevel = F), (this._logHandler = q), (this._userLogHandler = null);
        }
        get logLevel() {
            return this._logLevel;
        }
        set logLevel(e) {
            if (!(e in O)) throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
            this._logLevel = e;
        }
        setLogLevel(e) {
            this._logLevel = "string" == typeof e ? L[e] : e;
        }
        get logHandler() {
            return this._logHandler;
        }
        set logHandler(e) {
            if ("function" != typeof e) throw new TypeError("Value assigned to `logHandler` must be a function");
            this._logHandler = e;
        }
        get userLogHandler() {
            return this._userLogHandler;
        }
        set userLogHandler(e) {
            this._userLogHandler = e;
        }
        debug(...e) {
            this._userLogHandler && this._userLogHandler(this, O.DEBUG, ...e), this._logHandler(this, O.DEBUG, ...e);
        }
        log(...e) {
            this._userLogHandler && this._userLogHandler(this, O.VERBOSE, ...e), this._logHandler(this, O.VERBOSE, ...e);
        }
        info(...e) {
            this._userLogHandler && this._userLogHandler(this, O.INFO, ...e), this._logHandler(this, O.INFO, ...e);
        }
        warn(...e) {
            this._userLogHandler && this._userLogHandler(this, O.WARN, ...e), this._logHandler(this, O.WARN, ...e);
        }
        error(...e) {
            this._userLogHandler && this._userLogHandler(this, O.ERROR, ...e), this._logHandler(this, O.ERROR, ...e);
        }
    })("@firebase/database"),
    Q = (function () {
        let e = 1;
        return function () {
            return e++;
        };
    })(),
    $ = function (e) {
        const t = (function (e) {
                const t = [];
                let n = 0;
                for (let i = 0; i < e.length; i++) {
                    let r = e.charCodeAt(i);
                    if (r >= 55296 && r <= 56319) {
                        const t = r - 55296;
                        i++, a(i < e.length, "Surrogate pair missing trail surrogate."), (r = 65536 + (t << 10) + (e.charCodeAt(i) - 56320));
                    }
                    r < 128
                        ? (t[n++] = r)
                        : r < 2048
                        ? ((t[n++] = (r >> 6) | 192), (t[n++] = (63 & r) | 128))
                        : r < 65536
                        ? ((t[n++] = (r >> 12) | 224), (t[n++] = ((r >> 6) & 63) | 128), (t[n++] = (63 & r) | 128))
                        : ((t[n++] = (r >> 18) | 240), (t[n++] = ((r >> 12) & 63) | 128), (t[n++] = ((r >> 6) & 63) | 128), (t[n++] = (63 & r) | 128));
                }
                return t;
            })(e),
            n = new P();
        n.update(t);
        const i = n.digest();
        return c.encodeByteArray(i);
    },
    G = function (...e) {
        let t = "";
        for (let n = 0; n < e.length; n++) {
            const i = e[n];
            Array.isArray(i) || (i && "object" == typeof i && "number" == typeof i.length) ? (t += G.apply(null, i)) : (t += "object" == typeof i ? b(i) : i), (t += " ");
        }
        return t;
    };
let J = null,
    X = !0;
const Z = function (e, t) {
        a(!t || !0 === e || !1 === e, "Can't turn on custom loggers persistently."),
            !0 === e ? ((K.logLevel = O.VERBOSE), (J = K.log.bind(K)), t && Y.set("logging_enabled", !0)) : "function" == typeof e ? (J = e) : ((J = null), Y.remove("logging_enabled"));
    },
    ee = function (...e) {
        if ((!0 === X && ((X = !1), null === J && !0 === Y.get("logging_enabled") && Z(!0)), J)) {
            const t = G.apply(null, e);
            J(t);
        }
    },
    te = function (e) {
        return function (...t) {
            ee(e, ...t);
        };
    },
    ne = function (...e) {
        const t = "FIREBASE INTERNAL ERROR: " + G(...e);
        K.error(t);
    },
    ie = function (...e) {
        const t = `FIREBASE FATAL ERROR: ${G(...e)}`;
        throw (K.error(t), new Error(t));
    },
    re = function (...e) {
        const t = "FIREBASE WARNING: " + G(...e);
        K.warn(t);
    },
    se = function (e) {
        return "number" == typeof e && (e != e || e === Number.POSITIVE_INFINITY || e === Number.NEGATIVE_INFINITY);
    },
    oe = "[MIN_NAME]",
    ae = "[MAX_NAME]",
    le = function (e, t) {
        if (e === t) return 0;
        if (e === oe || t === ae) return -1;
        if (t === oe || e === ae) return 1;
        {
            const n = ge(e),
                i = ge(t);
            return null !== n ? (null !== i ? (n - i == 0 ? e.length - t.length : n - i) : -1) : null !== i ? 1 : e < t ? -1 : 1;
        }
    },
    he = function (e, t) {
        return e === t ? 0 : e < t ? -1 : 1;
    },
    ce = function (e, t) {
        if (t && e in t) return t[e];
        throw new Error("Missing required key (" + e + ") in object: " + b(t));
    },
    ue = function (e) {
        if ("object" != typeof e || null === e) return b(e);
        const t = [];
        for (const n in e) t.push(n);
        t.sort();
        let n = "{";
        for (let i = 0; i < t.length; i++) 0 !== i && (n += ","), (n += b(t[i])), (n += ":"), (n += ue(e[t[i]]));
        return (n += "}"), n;
    },
    de = function (e, t) {
        const n = e.length;
        if (n <= t) return [e];
        const i = [];
        for (let r = 0; r < n; r += t) r + t > n ? i.push(e.substring(r, n)) : i.push(e.substring(r, r + t));
        return i;
    };
function _e(e, t) {
    for (const n in e) e.hasOwnProperty(n) && t(n, e[n]);
}
const pe = function (e) {
    a(!se(e), "Invalid JSON number");
    const t = 1023;
    let n, i, r, s, o;
    0 === e
        ? ((i = 0), (r = 0), (n = 1 / e == -1 / 0 ? 1 : 0))
        : ((n = e < 0),
          (e = Math.abs(e)) >= Math.pow(2, -1022) ? ((s = Math.min(Math.floor(Math.log(e) / Math.LN2), t)), (i = s + t), (r = Math.round(e * Math.pow(2, 52 - s) - Math.pow(2, 52)))) : ((i = 0), (r = Math.round(e / Math.pow(2, -1074)))));
    const l = [];
    for (o = 52; o; o -= 1) l.push(r % 2 ? 1 : 0), (r = Math.floor(r / 2));
    for (o = 11; o; o -= 1) l.push(i % 2 ? 1 : 0), (i = Math.floor(i / 2));
    l.push(n ? 1 : 0), l.reverse();
    const h = l.join("");
    let c = "";
    for (o = 0; o < 64; o += 8) {
        let e = parseInt(h.substr(o, 8), 2).toString(16);
        1 === e.length && (e = "0" + e), (c += e);
    }
    return c.toLowerCase();
};
const fe = new RegExp("^-?(0*)\\d{1,10}$"),
    ge = function (e) {
        if (fe.test(e)) {
            const t = Number(e);
            if (t >= -2147483648 && t <= 2147483647) return t;
        }
        return null;
    },
    me = function (e) {
        try {
            e();
        } catch (e) {
            setTimeout(() => {
                const t = e.stack || "";
                throw (re("Exception was thrown by user callback.", t), e);
            }, Math.floor(0));
        }
    },
    ye = function (e, t) {
        const n = setTimeout(e, t);
        return "number" == typeof n && "undefined" != typeof Deno && Deno.unrefTimer ? Deno.unrefTimer(n) : "object" == typeof n && n.unref && n.unref(), n;
    };
class ve {
    constructor(e, t) {
        (this.appName_ = e), (this.appCheckProvider = t), (this.appCheck = null == t ? void 0 : t.getImmediate({ optional: !0 })), this.appCheck || null == t || t.get().then((e) => (this.appCheck = e));
    }
    getToken(e) {
        return this.appCheck
            ? this.appCheck.getToken(e)
            : new Promise((t, n) => {
                  setTimeout(() => {
                      this.appCheck ? this.getToken(e).then(t, n) : t(null);
                  }, 0);
              });
    }
    addTokenChangeListener(e) {
        var t;
        null === (t = this.appCheckProvider) || void 0 === t || t.get().then((t) => t.addTokenListener(e));
    }
    notifyForInvalidToken() {
        re(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`);
    }
}
class Ce {
    constructor(e, t, n) {
        (this.appName_ = e), (this.firebaseOptions_ = t), (this.authProvider_ = n), (this.auth_ = null), (this.auth_ = n.getImmediate({ optional: !0 })), this.auth_ || n.onInit((e) => (this.auth_ = e));
    }
    getToken(e) {
        return this.auth_
            ? this.auth_.getToken(e).catch((e) => (e && "auth/token-not-initialized" === e.code ? (ee("Got auth/token-not-initialized error.  Treating as null token."), null) : Promise.reject(e)))
            : new Promise((t, n) => {
                  setTimeout(() => {
                      this.auth_ ? this.getToken(e).then(t, n) : t(null);
                  }, 0);
              });
    }
    addTokenChangeListener(e) {
        this.auth_ ? this.auth_.addAuthTokenListener(e) : this.authProvider_.get().then((t) => t.addAuthTokenListener(e));
    }
    removeTokenChangeListener(e) {
        this.authProvider_.get().then((t) => t.removeAuthTokenListener(e));
    }
    notifyForInvalidToken() {
        let e = 'Provided authentication credentials for the app named "' + this.appName_ + '" are invalid. This usually indicates your app was not initialized correctly. ';
        "credential" in this.firebaseOptions_
            ? (e += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
            : "serviceAccount" in this.firebaseOptions_
            ? (e += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
            : (e += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.'),
            re(e);
    }
}
class we {
    constructor(e) {
        this.accessToken = e;
    }
    getToken(e) {
        return Promise.resolve({ accessToken: this.accessToken });
    }
    addTokenChangeListener(e) {
        e(this.accessToken);
    }
    removeTokenChangeListener(e) {}
    notifyForInvalidToken() {}
}
we.OWNER = "owner";
const Te = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;
class be {
    constructor(e, t, n, i, r = !1, s = "", o = !1) {
        (this.secure = t),
            (this.namespace = n),
            (this.webSocketOnly = i),
            (this.nodeAdmin = r),
            (this.persistenceKey = s),
            (this.includeNamespaceInQueryParams = o),
            (this._host = e.toLowerCase()),
            (this._domain = this._host.substr(this._host.indexOf(".") + 1)),
            (this.internalHost = z.get("host:" + e) || this._host);
    }
    isCacheableHost() {
        return "s-" === this.internalHost.substr(0, 2);
    }
    isCustomHost() {
        return "firebaseio.com" !== this._domain && "firebaseio-demo.com" !== this._domain;
    }
    get host() {
        return this._host;
    }
    set host(e) {
        e !== this.internalHost && ((this.internalHost = e), this.isCacheableHost() && z.set("host:" + this._host, this.internalHost));
    }
    toString() {
        let e = this.toURLString();
        return this.persistenceKey && (e += "<" + this.persistenceKey + ">"), e;
    }
    toURLString() {
        const e = this.secure ? "https://" : "http://",
            t = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : "";
        return `${e}${this.host}/${t}`;
    }
}
function Ee(e, t, n) {
    let i;
    if ((a("string" == typeof t, "typeof type must == string"), a("object" == typeof n, "typeof params must == object"), "websocket" === t)) i = (e.secure ? "wss://" : "ws://") + e.internalHost + "/.ws?";
    else {
        if ("long_polling" !== t) throw new Error("Unknown connection type: " + t);
        i = (e.secure ? "https://" : "http://") + e.internalHost + "/.lp?";
    }
    (function (e) {
        return e.host !== e.internalHost || e.isCustomHost() || e.includeNamespaceInQueryParams;
    })(e) && (n.ns = e.namespace);
    const r = [];
    return (
        _e(n, (e, t) => {
            r.push(e + "=" + t);
        }),
        i + r.join("&")
    );
}
class Ie {
    constructor() {
        this.counters_ = {};
    }
    incrementCounter(e, t = 1) {
        I(this.counters_, e) || (this.counters_[e] = 0), (this.counters_[e] += t);
    }
    get() {
        return p(this.counters_);
    }
}
const Se = {},
    ke = {};
function Ne(e) {
    const t = e.toString();
    return Se[t] || (Se[t] = new Ie()), Se[t];
}
class Pe {
    constructor(e) {
        (this.onMessage_ = e), (this.pendingResponses = []), (this.currentResponseNum = 0), (this.closeAfterResponse = -1), (this.onClose = null);
    }
    closeAfter(e, t) {
        (this.closeAfterResponse = e), (this.onClose = t), this.closeAfterResponse < this.currentResponseNum && (this.onClose(), (this.onClose = null));
    }
    handleResponse(e, t) {
        for (this.pendingResponses[e] = t; this.pendingResponses[this.currentResponseNum]; ) {
            const e = this.pendingResponses[this.currentResponseNum];
            delete this.pendingResponses[this.currentResponseNum];
            for (let t = 0; t < e.length; ++t)
                e[t] &&
                    me(() => {
                        this.onMessage_(e[t]);
                    });
            if (this.currentResponseNum === this.closeAfterResponse) {
                this.onClose && (this.onClose(), (this.onClose = null));
                break;
            }
            this.currentResponseNum++;
        }
    }
}
class xe {
    constructor(e, t, n, i, r, s, o) {
        (this.connId = e),
            (this.repoInfo = t),
            (this.applicationId = n),
            (this.appCheckToken = i),
            (this.authToken = r),
            (this.transportSessionId = s),
            (this.lastSessionId = o),
            (this.bytesSent = 0),
            (this.bytesReceived = 0),
            (this.everConnected_ = !1),
            (this.log_ = te(e)),
            (this.stats_ = Ne(t)),
            (this.urlFn = (e) => (this.appCheckToken && (e.ac = this.appCheckToken), Ee(t, "long_polling", e)));
    }
    open(e, t) {
        (this.curSegmentNum = 0),
            (this.onDisconnect_ = t),
            (this.myPacketOrderer = new Pe(e)),
            (this.isClosed_ = !1),
            (this.connectTimeoutTimer_ = setTimeout(() => {
                this.log_("Timed out trying to connect."), this.onClosed_(), (this.connectTimeoutTimer_ = null);
            }, Math.floor(3e4))),
            (function (e) {
                if ("complete" === document.readyState) e();
                else {
                    let t = !1;
                    const n = function () {
                        document.body ? t || ((t = !0), e()) : setTimeout(n, Math.floor(10));
                    };
                    document.addEventListener
                        ? (document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1))
                        : document.attachEvent &&
                          (document.attachEvent("onreadystatechange", () => {
                              "complete" === document.readyState && n();
                          }),
                          window.attachEvent("onload", n));
                }
            })(() => {
                if (this.isClosed_) return;
                this.scriptTagHolder = new Re(
                    (...e) => {
                        const [t, n, i, r, s] = e;
                        if ((this.incrementIncomingBytes_(e), this.scriptTagHolder))
                            if ((this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_), (this.connectTimeoutTimer_ = null)), (this.everConnected_ = !0), "start" === t)) (this.id = n), (this.password = i);
                            else {
                                if ("close" !== t) throw new Error("Unrecognized command received: " + t);
                                n
                                    ? ((this.scriptTagHolder.sendNewPolls = !1),
                                      this.myPacketOrderer.closeAfter(n, () => {
                                          this.onClosed_();
                                      }))
                                    : this.onClosed_();
                            }
                    },
                    (...e) => {
                        const [t, n] = e;
                        this.incrementIncomingBytes_(e), this.myPacketOrderer.handleResponse(t, n);
                    },
                    () => {
                        this.onClosed_();
                    },
                    this.urlFn
                );
                const e = { start: "t" };
                (e.ser = Math.floor(1e8 * Math.random())),
                    this.scriptTagHolder.uniqueCallbackIdentifier && (e.cb = this.scriptTagHolder.uniqueCallbackIdentifier),
                    (e.v = "5"),
                    this.transportSessionId && (e.s = this.transportSessionId),
                    this.lastSessionId && (e.ls = this.lastSessionId),
                    this.applicationId && (e.p = this.applicationId),
                    this.appCheckToken && (e.ac = this.appCheckToken),
                    "undefined" != typeof location && location.hostname && Te.test(location.hostname) && (e.r = "f");
                const t = this.urlFn(e);
                this.log_("Connecting via long-poll to " + t), this.scriptTagHolder.addTag(t, () => {});
            });
    }
    start() {
        this.scriptTagHolder.startLongPoll(this.id, this.password), this.addDisconnectPingFrame(this.id, this.password);
    }
    static forceAllow() {
        xe.forceAllow_ = !0;
    }
    static forceDisallow() {
        xe.forceDisallow_ = !0;
    }
    static isAvailable() {
        return (
            !!xe.forceAllow_ ||
            !(
                xe.forceDisallow_ ||
                "undefined" == typeof document ||
                null == document.createElement ||
                ("object" == typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href)) ||
                ("object" == typeof Windows && "object" == typeof Windows.UI)
            )
        );
    }
    markConnectionHealthy() {}
    shutdown_() {
        (this.isClosed_ = !0),
            this.scriptTagHolder && (this.scriptTagHolder.close(), (this.scriptTagHolder = null)),
            this.myDisconnFrame && (document.body.removeChild(this.myDisconnFrame), (this.myDisconnFrame = null)),
            this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_), (this.connectTimeoutTimer_ = null));
    }
    onClosed_() {
        this.isClosed_ || (this.log_("Longpoll is closing itself"), this.shutdown_(), this.onDisconnect_ && (this.onDisconnect_(this.everConnected_), (this.onDisconnect_ = null)));
    }
    close() {
        this.isClosed_ || (this.log_("Longpoll is being closed."), this.shutdown_());
    }
    send(e) {
        const t = b(e);
        (this.bytesSent += t.length), this.stats_.incrementCounter("bytes_sent", t.length);
        const n = u(t),
            i = de(n, 1840);
        for (let e = 0; e < i.length; e++) this.scriptTagHolder.enqueueSegment(this.curSegmentNum, i.length, i[e]), this.curSegmentNum++;
    }
    addDisconnectPingFrame(e, t) {
        this.myDisconnFrame = document.createElement("iframe");
        const n = { dframe: "t" };
        (n.id = e), (n.pw = t), (this.myDisconnFrame.src = this.urlFn(n)), (this.myDisconnFrame.style.display = "none"), document.body.appendChild(this.myDisconnFrame);
    }
    incrementIncomingBytes_(e) {
        const t = b(e).length;
        (this.bytesReceived += t), this.stats_.incrementCounter("bytes_received", t);
    }
}
class Re {
    constructor(e, t, n, i) {
        (this.onDisconnect = n), (this.urlFn = i), (this.outstandingRequests = new Set()), (this.pendingSegs = []), (this.currentSerial = Math.floor(1e8 * Math.random())), (this.sendNewPolls = !0);
        {
            (this.uniqueCallbackIdentifier = Q()), (window["pLPCommand" + this.uniqueCallbackIdentifier] = e), (window["pRTLPCB" + this.uniqueCallbackIdentifier] = t), (this.myIFrame = Re.createIFrame_());
            let n = "";
            if (this.myIFrame.src && "javascript:" === this.myIFrame.src.substr(0, "javascript:".length)) {
                n = '<script>document.domain="' + document.domain + '";</script>';
            }
            const i = "<html><body>" + n + "</body></html>";
            try {
                this.myIFrame.doc.open(), this.myIFrame.doc.write(i), this.myIFrame.doc.close();
            } catch (e) {
                ee("frame writing exception"), e.stack && ee(e.stack), ee(e);
            }
        }
    }
    static createIFrame_() {
        const e = document.createElement("iframe");
        if (((e.style.display = "none"), !document.body)) throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
        document.body.appendChild(e);
        try {
            e.contentWindow.document || ee("No IE domain setting required");
        } catch (t) {
            const n = document.domain;
            e.src = "javascript:void((function(){document.open();document.domain='" + n + "';document.close();})())";
        }
        return e.contentDocument ? (e.doc = e.contentDocument) : e.contentWindow ? (e.doc = e.contentWindow.document) : e.document && (e.doc = e.document), e;
    }
    close() {
        (this.alive = !1),
            this.myIFrame &&
                ((this.myIFrame.doc.body.innerHTML = ""),
                setTimeout(() => {
                    null !== this.myIFrame && (document.body.removeChild(this.myIFrame), (this.myIFrame = null));
                }, Math.floor(0)));
        const e = this.onDisconnect;
        e && ((this.onDisconnect = null), e());
    }
    startLongPoll(e, t) {
        for (this.myID = e, this.myPW = t, this.alive = !0; this.newRequest_(); );
    }
    newRequest_() {
        if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
            this.currentSerial++;
            const e = {};
            (e.id = this.myID), (e.pw = this.myPW), (e.ser = this.currentSerial);
            let t = this.urlFn(e),
                n = "",
                i = 0;
            for (; this.pendingSegs.length > 0; ) {
                if (!(this.pendingSegs[0].d.length + 30 + n.length <= 1870)) break;
                {
                    const e = this.pendingSegs.shift();
                    (n = n + "&seg" + i + "=" + e.seg + "&ts" + i + "=" + e.ts + "&d" + i + "=" + e.d), i++;
                }
            }
            return (t += n), this.addLongPollTag_(t, this.currentSerial), !0;
        }
        return !1;
    }
    enqueueSegment(e, t, n) {
        this.pendingSegs.push({ seg: e, ts: t, d: n }), this.alive && this.newRequest_();
    }
    addLongPollTag_(e, t) {
        this.outstandingRequests.add(t);
        const n = () => {
                this.outstandingRequests.delete(t), this.newRequest_();
            },
            i = setTimeout(n, Math.floor(25e3));
        this.addTag(e, () => {
            clearTimeout(i), n();
        });
    }
    addTag(e, t) {
        setTimeout(() => {
            try {
                if (!this.sendNewPolls) return;
                const n = this.myIFrame.doc.createElement("script");
                (n.type = "text/javascript"),
                    (n.async = !0),
                    (n.src = e),
                    (n.onload = n.onreadystatechange = function () {
                        const e = n.readyState;
                        (e && "loaded" !== e && "complete" !== e) || ((n.onload = n.onreadystatechange = null), n.parentNode && n.parentNode.removeChild(n), t());
                    }),
                    (n.onerror = () => {
                        ee("Long-poll script failed to load: " + e), (this.sendNewPolls = !1), this.close();
                    }),
                    this.myIFrame.doc.body.appendChild(n);
            } catch (e) {}
        }, Math.floor(1));
    }
}
let Ae = null;
"undefined" != typeof MozWebSocket ? (Ae = MozWebSocket) : "undefined" != typeof WebSocket && (Ae = WebSocket);
class De {
    constructor(e, t, n, i, r, s, o) {
        (this.connId = e),
            (this.applicationId = n),
            (this.appCheckToken = i),
            (this.authToken = r),
            (this.keepaliveTimer = null),
            (this.frames = null),
            (this.totalFrames = 0),
            (this.bytesSent = 0),
            (this.bytesReceived = 0),
            (this.log_ = te(this.connId)),
            (this.stats_ = Ne(t)),
            (this.connURL = De.connectionURL_(t, s, o, i, n)),
            (this.nodeAdmin = t.nodeAdmin);
    }
    static connectionURL_(e, t, n, i, r) {
        const s = { v: "5" };
        return "undefined" != typeof location && location.hostname && Te.test(location.hostname) && (s.r = "f"), t && (s.s = t), n && (s.ls = n), i && (s.ac = i), r && (s.p = r), Ee(e, "websocket", s);
    }
    open(e, t) {
        (this.onDisconnect = t), (this.onMessage = e), this.log_("Websocket connecting to " + this.connURL), (this.everConnected_ = !1), z.set("previous_websocket_failure", !0);
        try {
            let e;
            m(), (this.mySock = new Ae(this.connURL, [], e));
        } catch (e) {
            this.log_("Error instantiating WebSocket.");
            const t = e.message || e.data;
            return t && this.log_(t), void this.onClosed_();
        }
        (this.mySock.onopen = () => {
            this.log_("Websocket connected."), (this.everConnected_ = !0);
        }),
            (this.mySock.onclose = () => {
                this.log_("Websocket connection was disconnected."), (this.mySock = null), this.onClosed_();
            }),
            (this.mySock.onmessage = (e) => {
                this.handleIncomingFrame(e);
            }),
            (this.mySock.onerror = (e) => {
                this.log_("WebSocket error.  Closing connection.");
                const t = e.message || e.data;
                t && this.log_(t), this.onClosed_();
            });
    }
    start() {}
    static forceDisallow() {
        De.forceDisallow_ = !0;
    }
    static isAvailable() {
        let e = !1;
        if ("undefined" != typeof navigator && navigator.userAgent) {
            const t = /Android ([0-9]{0,}\.[0-9]{0,})/,
                n = navigator.userAgent.match(t);
            n && n.length > 1 && parseFloat(n[1]) < 4.4 && (e = !0);
        }
        return !e && null !== Ae && !De.forceDisallow_;
    }
    static previouslyFailed() {
        return z.isInMemoryStorage || !0 === z.get("previous_websocket_failure");
    }
    markConnectionHealthy() {
        z.remove("previous_websocket_failure");
    }
    appendFrame_(e) {
        if ((this.frames.push(e), this.frames.length === this.totalFrames)) {
            const e = this.frames.join("");
            this.frames = null;
            const t = T(e);
            this.onMessage(t);
        }
    }
    handleNewFrameCount_(e) {
        (this.totalFrames = e), (this.frames = []);
    }
    extractFrameCount_(e) {
        if ((a(null === this.frames, "We already have a frame buffer"), e.length <= 6)) {
            const t = Number(e);
            if (!isNaN(t)) return this.handleNewFrameCount_(t), null;
        }
        return this.handleNewFrameCount_(1), e;
    }
    handleIncomingFrame(e) {
        if (null === this.mySock) return;
        const t = e.data;
        if (((this.bytesReceived += t.length), this.stats_.incrementCounter("bytes_received", t.length), this.resetKeepAlive(), null !== this.frames)) this.appendFrame_(t);
        else {
            const e = this.extractFrameCount_(t);
            null !== e && this.appendFrame_(e);
        }
    }
    send(e) {
        this.resetKeepAlive();
        const t = b(e);
        (this.bytesSent += t.length), this.stats_.incrementCounter("bytes_sent", t.length);
        const n = de(t, 16384);
        n.length > 1 && this.sendString_(String(n.length));
        for (let e = 0; e < n.length; e++) this.sendString_(n[e]);
    }
    shutdown_() {
        (this.isClosed_ = !0), this.keepaliveTimer && (clearInterval(this.keepaliveTimer), (this.keepaliveTimer = null)), this.mySock && (this.mySock.close(), (this.mySock = null));
    }
    onClosed_() {
        this.isClosed_ || (this.log_("WebSocket is closing itself"), this.shutdown_(), this.onDisconnect && (this.onDisconnect(this.everConnected_), (this.onDisconnect = null)));
    }
    close() {
        this.isClosed_ || (this.log_("WebSocket is being closed"), this.shutdown_());
    }
    resetKeepAlive() {
        clearInterval(this.keepaliveTimer),
            (this.keepaliveTimer = setInterval(() => {
                this.mySock && this.sendString_("0"), this.resetKeepAlive();
            }, Math.floor(45e3)));
    }
    sendString_(e) {
        try {
            this.mySock.send(e);
        } catch (e) {
            this.log_("Exception thrown from WebSocket.send():", e.message || e.data, "Closing connection."), setTimeout(this.onClosed_.bind(this), 0);
        }
    }
}
(De.responsesRequiredToBeHealthy = 2), (De.healthyTimeout = 3e4);
class Oe {
    constructor(e) {
        this.initTransports_(e);
    }
    static get ALL_TRANSPORTS() {
        return [xe, De];
    }
    static get IS_TRANSPORT_INITIALIZED() {
        return this.globalTransportInitialized_;
    }
    initTransports_(e) {
        const t = De && De.isAvailable();
        let n = t && !De.previouslyFailed();
        if ((e.webSocketOnly && (t || re("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), (n = !0)), n)) this.transports_ = [De];
        else {
            const e = (this.transports_ = []);
            for (const t of Oe.ALL_TRANSPORTS) t && t.isAvailable() && e.push(t);
            Oe.globalTransportInitialized_ = !0;
        }
    }
    initialTransport() {
        if (this.transports_.length > 0) return this.transports_[0];
        throw new Error("No transports available");
    }
    upgradeTransport() {
        return this.transports_.length > 1 ? this.transports_[1] : null;
    }
}
Oe.globalTransportInitialized_ = !1;
class Le {
    constructor(e, t, n, i, r, s, o, a, l, h) {
        (this.id = e),
            (this.repoInfo_ = t),
            (this.applicationId_ = n),
            (this.appCheckToken_ = i),
            (this.authToken_ = r),
            (this.onMessage_ = s),
            (this.onReady_ = o),
            (this.onDisconnect_ = a),
            (this.onKill_ = l),
            (this.lastSessionId = h),
            (this.connectionCount = 0),
            (this.pendingDataMessages = []),
            (this.state_ = 0),
            (this.log_ = te("c:" + this.id + ":")),
            (this.transportManager_ = new Oe(t)),
            this.log_("Connection created"),
            this.start_();
    }
    start_() {
        const e = this.transportManager_.initialTransport();
        (this.conn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, null, this.lastSessionId)), (this.primaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0);
        const t = this.connReceiver_(this.conn_),
            n = this.disconnReceiver_(this.conn_);
        (this.tx_ = this.conn_),
            (this.rx_ = this.conn_),
            (this.secondaryConn_ = null),
            (this.isHealthy_ = !1),
            setTimeout(() => {
                this.conn_ && this.conn_.open(t, n);
            }, Math.floor(0));
        const i = e.healthyTimeout || 0;
        i > 0 &&
            (this.healthyTimeout_ = ye(() => {
                (this.healthyTimeout_ = null),
                    this.isHealthy_ ||
                        (this.conn_ && this.conn_.bytesReceived > 102400
                            ? (this.log_("Connection exceeded healthy timeout but has received " + this.conn_.bytesReceived + " bytes.  Marking connection healthy."), (this.isHealthy_ = !0), this.conn_.markConnectionHealthy())
                            : this.conn_ && this.conn_.bytesSent > 10240
                            ? this.log_("Connection exceeded healthy timeout but has sent " + this.conn_.bytesSent + " bytes.  Leaving connection alive.")
                            : (this.log_("Closing unhealthy connection after timeout."), this.close()));
            }, Math.floor(i)));
    }
    nextTransportId_() {
        return "c:" + this.id + ":" + this.connectionCount++;
    }
    disconnReceiver_(e) {
        return (t) => {
            e === this.conn_ ? this.onConnectionLost_(t) : e === this.secondaryConn_ ? (this.log_("Secondary connection lost."), this.onSecondaryConnectionLost_()) : this.log_("closing an old connection");
        };
    }
    connReceiver_(e) {
        return (t) => {
            2 !== this.state_ && (e === this.rx_ ? this.onPrimaryMessageReceived_(t) : e === this.secondaryConn_ ? this.onSecondaryMessageReceived_(t) : this.log_("message on old connection"));
        };
    }
    sendRequest(e) {
        const t = { t: "d", d: e };
        this.sendData_(t);
    }
    tryCleanupConnection() {
        this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_ && (this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId), (this.conn_ = this.secondaryConn_), (this.secondaryConn_ = null));
    }
    onSecondaryControl_(e) {
        if ("t" in e) {
            const t = e.t;
            "a" === t
                ? this.upgradeIfSecondaryHealthy_()
                : "r" === t
                ? (this.log_("Got a reset on secondary, closing it"), this.secondaryConn_.close(), (this.tx_ !== this.secondaryConn_ && this.rx_ !== this.secondaryConn_) || this.close())
                : "o" === t && (this.log_("got pong on secondary."), this.secondaryResponsesRequired_--, this.upgradeIfSecondaryHealthy_());
        }
    }
    onSecondaryMessageReceived_(e) {
        const t = ce("t", e),
            n = ce("d", e);
        if ("c" === t) this.onSecondaryControl_(n);
        else {
            if ("d" !== t) throw new Error("Unknown protocol layer: " + t);
            this.pendingDataMessages.push(n);
        }
    }
    upgradeIfSecondaryHealthy_() {
        this.secondaryResponsesRequired_ <= 0
            ? (this.log_("Secondary connection is healthy."), (this.isHealthy_ = !0), this.secondaryConn_.markConnectionHealthy(), this.proceedWithUpgrade_())
            : (this.log_("sending ping on secondary."), this.secondaryConn_.send({ t: "c", d: { t: "p", d: {} } }));
    }
    proceedWithUpgrade_() {
        this.secondaryConn_.start(),
            this.log_("sending client ack on secondary"),
            this.secondaryConn_.send({ t: "c", d: { t: "a", d: {} } }),
            this.log_("Ending transmission on primary"),
            this.conn_.send({ t: "c", d: { t: "n", d: {} } }),
            (this.tx_ = this.secondaryConn_),
            this.tryCleanupConnection();
    }
    onPrimaryMessageReceived_(e) {
        const t = ce("t", e),
            n = ce("d", e);
        "c" === t ? this.onControl_(n) : "d" === t && this.onDataMessage_(n);
    }
    onDataMessage_(e) {
        this.onPrimaryResponse_(), this.onMessage_(e);
    }
    onPrimaryResponse_() {
        this.isHealthy_ || (this.primaryResponsesRequired_--, this.primaryResponsesRequired_ <= 0 && (this.log_("Primary connection is healthy."), (this.isHealthy_ = !0), this.conn_.markConnectionHealthy()));
    }
    onControl_(e) {
        const t = ce("t", e);
        if ("d" in e) {
            const n = e.d;
            if ("h" === t) this.onHandshake_(n);
            else if ("n" === t) {
                this.log_("recvd end transmission on primary"), (this.rx_ = this.secondaryConn_);
                for (let e = 0; e < this.pendingDataMessages.length; ++e) this.onDataMessage_(this.pendingDataMessages[e]);
                (this.pendingDataMessages = []), this.tryCleanupConnection();
            } else
                "s" === t
                    ? this.onConnectionShutdown_(n)
                    : "r" === t
                    ? this.onReset_(n)
                    : "e" === t
                    ? ne("Server Error: " + n)
                    : "o" === t
                    ? (this.log_("got pong on primary."), this.onPrimaryResponse_(), this.sendPingOnPrimaryIfNecessary_())
                    : ne("Unknown control packet command: " + t);
        }
    }
    onHandshake_(e) {
        const t = e.ts,
            n = e.v,
            i = e.h;
        (this.sessionId = e.s), (this.repoInfo_.host = i), 0 === this.state_ && (this.conn_.start(), this.onConnectionEstablished_(this.conn_, t), "5" !== n && re("Protocol version mismatch detected"), this.tryStartUpgrade_());
    }
    tryStartUpgrade_() {
        const e = this.transportManager_.upgradeTransport();
        e && this.startUpgrade_(e);
    }
    startUpgrade_(e) {
        (this.secondaryConn_ = new e(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.appCheckToken_, this.authToken_, this.sessionId)), (this.secondaryResponsesRequired_ = e.responsesRequiredToBeHealthy || 0);
        const t = this.connReceiver_(this.secondaryConn_),
            n = this.disconnReceiver_(this.secondaryConn_);
        this.secondaryConn_.open(t, n),
            ye(() => {
                this.secondaryConn_ && (this.log_("Timed out trying to upgrade."), this.secondaryConn_.close());
            }, Math.floor(6e4));
    }
    onReset_(e) {
        this.log_("Reset packet received.  New host: " + e), (this.repoInfo_.host = e), 1 === this.state_ ? this.close() : (this.closeConnections_(), this.start_());
    }
    onConnectionEstablished_(e, t) {
        this.log_("Realtime connection established."),
            (this.conn_ = e),
            (this.state_ = 1),
            this.onReady_ && (this.onReady_(t, this.sessionId), (this.onReady_ = null)),
            0 === this.primaryResponsesRequired_
                ? (this.log_("Primary connection is healthy."), (this.isHealthy_ = !0))
                : ye(() => {
                      this.sendPingOnPrimaryIfNecessary_();
                  }, Math.floor(5e3));
    }
    sendPingOnPrimaryIfNecessary_() {
        this.isHealthy_ || 1 !== this.state_ || (this.log_("sending ping on primary."), this.sendData_({ t: "c", d: { t: "p", d: {} } }));
    }
    onSecondaryConnectionLost_() {
        const e = this.secondaryConn_;
        (this.secondaryConn_ = null), (this.tx_ !== e && this.rx_ !== e) || this.close();
    }
    onConnectionLost_(e) {
        (this.conn_ = null),
            e || 0 !== this.state_
                ? 1 === this.state_ && this.log_("Realtime connection lost.")
                : (this.log_("Realtime connection failed."), this.repoInfo_.isCacheableHost() && (z.remove("host:" + this.repoInfo_.host), (this.repoInfo_.internalHost = this.repoInfo_.host))),
            this.close();
    }
    onConnectionShutdown_(e) {
        this.log_("Connection shutdown command received. Shutting down..."), this.onKill_ && (this.onKill_(e), (this.onKill_ = null)), (this.onDisconnect_ = null), this.close();
    }
    sendData_(e) {
        if (1 !== this.state_) throw "Connection is not connected";
        this.tx_.send(e);
    }
    close() {
        2 !== this.state_ && (this.log_("Closing realtime connection."), (this.state_ = 2), this.closeConnections_(), this.onDisconnect_ && (this.onDisconnect_(), (this.onDisconnect_ = null)));
    }
    closeConnections_() {
        this.log_("Shutting down all connections"),
            this.conn_ && (this.conn_.close(), (this.conn_ = null)),
            this.secondaryConn_ && (this.secondaryConn_.close(), (this.secondaryConn_ = null)),
            this.healthyTimeout_ && (clearTimeout(this.healthyTimeout_), (this.healthyTimeout_ = null));
    }
}
class Fe {
    put(e, t, n, i) {}
    merge(e, t, n, i) {}
    refreshAuthToken(e) {}
    refreshAppCheckToken(e) {}
    onDisconnectPut(e, t, n) {}
    onDisconnectMerge(e, t, n) {}
    onDisconnectCancel(e, t) {}
    reportStats(e) {}
}
class Me {
    constructor(e) {
        (this.allowedEvents_ = e), (this.listeners_ = {}), a(Array.isArray(e) && e.length > 0, "Requires a non-empty array");
    }
    trigger(e, ...t) {
        if (Array.isArray(this.listeners_[e])) {
            const n = [...this.listeners_[e]];
            for (let e = 0; e < n.length; e++) n[e].callback.apply(n[e].context, t);
        }
    }
    on(e, t, n) {
        this.validateEventType_(e), (this.listeners_[e] = this.listeners_[e] || []), this.listeners_[e].push({ callback: t, context: n });
        const i = this.getInitialEvent(e);
        i && t.apply(n, i);
    }
    off(e, t, n) {
        this.validateEventType_(e);
        const i = this.listeners_[e] || [];
        for (let e = 0; e < i.length; e++) if (i[e].callback === t && (!n || n === i[e].context)) return void i.splice(e, 1);
    }
    validateEventType_(e) {
        a(
            this.allowedEvents_.find((t) => t === e),
            "Unknown event: " + e
        );
    }
}
class qe extends Me {
    constructor() {
        super(["online"]),
            (this.online_ = !0),
            "undefined" == typeof window ||
                void 0 === window.addEventListener ||
                g() ||
                (window.addEventListener(
                    "online",
                    () => {
                        this.online_ || ((this.online_ = !0), this.trigger("online", !0));
                    },
                    !1
                ),
                window.addEventListener(
                    "offline",
                    () => {
                        this.online_ && ((this.online_ = !1), this.trigger("online", !1));
                    },
                    !1
                ));
    }
    static getInstance() {
        return new qe();
    }
    getInitialEvent(e) {
        return a("online" === e, "Unknown event type: " + e), [this.online_];
    }
    currentlyOnline() {
        return this.online_;
    }
}
class We {
    constructor(e, t) {
        if (void 0 === t) {
            this.pieces_ = e.split("/");
            let t = 0;
            for (let e = 0; e < this.pieces_.length; e++) this.pieces_[e].length > 0 && ((this.pieces_[t] = this.pieces_[e]), t++);
            (this.pieces_.length = t), (this.pieceNum_ = 0);
        } else (this.pieces_ = e), (this.pieceNum_ = t);
    }
    toString() {
        let e = "";
        for (let t = this.pieceNum_; t < this.pieces_.length; t++) "" !== this.pieces_[t] && (e += "/" + this.pieces_[t]);
        return e || "/";
    }
}
function Ue() {
    return new We("");
}
function Be(e) {
    return e.pieceNum_ >= e.pieces_.length ? null : e.pieces_[e.pieceNum_];
}
function je(e) {
    return e.pieces_.length - e.pieceNum_;
}
function He(e) {
    let t = e.pieceNum_;
    return t < e.pieces_.length && t++, new We(e.pieces_, t);
}
function Ve(e) {
    return e.pieceNum_ < e.pieces_.length ? e.pieces_[e.pieces_.length - 1] : null;
}
function ze(e, t = 0) {
    return e.pieces_.slice(e.pieceNum_ + t);
}
function Ye(e) {
    if (e.pieceNum_ >= e.pieces_.length) return null;
    const t = [];
    for (let n = e.pieceNum_; n < e.pieces_.length - 1; n++) t.push(e.pieces_[n]);
    return new We(t, 0);
}
function Ke(e, t) {
    const n = [];
    for (let t = e.pieceNum_; t < e.pieces_.length; t++) n.push(e.pieces_[t]);
    if (t instanceof We) for (let e = t.pieceNum_; e < t.pieces_.length; e++) n.push(t.pieces_[e]);
    else {
        const e = t.split("/");
        for (let t = 0; t < e.length; t++) e[t].length > 0 && n.push(e[t]);
    }
    return new We(n, 0);
}
function Qe(e) {
    return e.pieceNum_ >= e.pieces_.length;
}
function $e(e, t) {
    const n = Be(e),
        i = Be(t);
    if (null === n) return t;
    if (n === i) return $e(He(e), He(t));
    throw new Error("INTERNAL ERROR: innerPath (" + t + ") is not within outerPath (" + e + ")");
}
function Ge(e, t) {
    const n = ze(e, 0),
        i = ze(t, 0);
    for (let e = 0; e < n.length && e < i.length; e++) {
        const t = le(n[e], i[e]);
        if (0 !== t) return t;
    }
    return n.length === i.length ? 0 : n.length < i.length ? -1 : 1;
}
function Je(e, t) {
    if (je(e) !== je(t)) return !1;
    for (let n = e.pieceNum_, i = t.pieceNum_; n <= e.pieces_.length; n++, i++) if (e.pieces_[n] !== t.pieces_[i]) return !1;
    return !0;
}
function Xe(e, t) {
    let n = e.pieceNum_,
        i = t.pieceNum_;
    if (je(e) > je(t)) return !1;
    for (; n < e.pieces_.length; ) {
        if (e.pieces_[n] !== t.pieces_[i]) return !1;
        ++n, ++i;
    }
    return !0;
}
class Ze {
    constructor(e, t) {
        (this.errorPrefix_ = t), (this.parts_ = ze(e, 0)), (this.byteLength_ = Math.max(1, this.parts_.length));
        for (let e = 0; e < this.parts_.length; e++) this.byteLength_ += R(this.parts_[e]);
        et(this);
    }
}
function et(e) {
    if (e.byteLength_ > 768) throw new Error(e.errorPrefix_ + "has a key path longer than 768 bytes (" + e.byteLength_ + ").");
    if (e.parts_.length > 32) throw new Error(e.errorPrefix_ + "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " + tt(e));
}
function tt(e) {
    return 0 === e.parts_.length ? "" : "in property '" + e.parts_.join(".") + "'";
}
class nt extends Me {
    constructor() {
        let e, t;
        super(["visible"]),
            "undefined" != typeof document &&
                void 0 !== document.addEventListener &&
                (void 0 !== document.hidden
                    ? ((t = "visibilitychange"), (e = "hidden"))
                    : void 0 !== document.mozHidden
                    ? ((t = "mozvisibilitychange"), (e = "mozHidden"))
                    : void 0 !== document.msHidden
                    ? ((t = "msvisibilitychange"), (e = "msHidden"))
                    : void 0 !== document.webkitHidden && ((t = "webkitvisibilitychange"), (e = "webkitHidden"))),
            (this.visible_ = !0),
            t &&
                document.addEventListener(
                    t,
                    () => {
                        const t = !document[e];
                        t !== this.visible_ && ((this.visible_ = t), this.trigger("visible", t));
                    },
                    !1
                );
    }
    static getInstance() {
        return new nt();
    }
    getInitialEvent(e) {
        return a("visible" === e, "Unknown event type: " + e), [this.visible_];
    }
}
class it extends Fe {
    constructor(e, t, n, i, r, s, o, a) {
        if (
            (super(),
            (this.repoInfo_ = e),
            (this.applicationId_ = t),
            (this.onDataUpdate_ = n),
            (this.onConnectStatus_ = i),
            (this.onServerInfoUpdate_ = r),
            (this.authTokenProvider_ = s),
            (this.appCheckTokenProvider_ = o),
            (this.authOverride_ = a),
            (this.id = it.nextPersistentConnectionId_++),
            (this.log_ = te("p:" + this.id + ":")),
            (this.interruptReasons_ = {}),
            (this.listens = new Map()),
            (this.outstandingPuts_ = []),
            (this.outstandingGets_ = []),
            (this.outstandingPutCount_ = 0),
            (this.outstandingGetCount_ = 0),
            (this.onDisconnectRequestQueue_ = []),
            (this.connected_ = !1),
            (this.reconnectDelay_ = 1e3),
            (this.maxReconnectDelay_ = 3e5),
            (this.securityDebugCallback_ = null),
            (this.lastSessionId = null),
            (this.establishConnectionTimer_ = null),
            (this.visible_ = !1),
            (this.requestCBHash_ = {}),
            (this.requestNumber_ = 0),
            (this.realtime_ = null),
            (this.authToken_ = null),
            (this.appCheckToken_ = null),
            (this.forceTokenRefresh_ = !1),
            (this.invalidAuthTokenCount_ = 0),
            (this.invalidAppCheckTokenCount_ = 0),
            (this.firstConnection_ = !0),
            (this.lastConnectionAttemptTime_ = null),
            (this.lastConnectionEstablishedTime_ = null),
            a && !m())
        )
            throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
        nt.getInstance().on("visible", this.onVisible_, this), -1 === e.host.indexOf("fblocal") && qe.getInstance().on("online", this.onOnline_, this);
    }
    sendRequest(e, t, n) {
        const i = ++this.requestNumber_,
            r = { r: i, a: e, b: t };
        this.log_(b(r)), a(this.connected_, "sendRequest call when we're not connected not allowed."), this.realtime_.sendRequest(r), n && (this.requestCBHash_[i] = n);
    }
    get(e) {
        this.initConnection_();
        const t = new w(),
            n = {
                action: "g",
                request: { p: e._path.toString(), q: e._queryObject },
                onComplete: (e) => {
                    const n = e.d;
                    "ok" === e.s ? t.resolve(n) : t.reject(n);
                },
            };
        this.outstandingGets_.push(n), this.outstandingGetCount_++;
        const i = this.outstandingGets_.length - 1;
        return this.connected_ && this.sendGet_(i), t.promise;
    }
    listen(e, t, n, i) {
        this.initConnection_();
        const r = e._queryIdentifier,
            s = e._path.toString();
        this.log_("Listen called for " + s + " " + r),
            this.listens.has(s) || this.listens.set(s, new Map()),
            a(e._queryParams.isDefault() || !e._queryParams.loadsAllData(), "listen() called for non-default but complete query"),
            a(!this.listens.get(s).has(r), "listen() called twice for same path/queryId.");
        const o = { onComplete: i, hashFn: t, query: e, tag: n };
        this.listens.get(s).set(r, o), this.connected_ && this.sendListen_(o);
    }
    sendGet_(e) {
        const t = this.outstandingGets_[e];
        this.sendRequest("g", t.request, (n) => {
            delete this.outstandingGets_[e], this.outstandingGetCount_--, 0 === this.outstandingGetCount_ && (this.outstandingGets_ = []), t.onComplete && t.onComplete(n);
        });
    }
    sendListen_(e) {
        const t = e.query,
            n = t._path.toString(),
            i = t._queryIdentifier;
        this.log_("Listen on " + n + " for " + i);
        const r = { p: n };
        e.tag && ((r.q = t._queryObject), (r.t = e.tag)),
            (r.h = e.hashFn()),
            this.sendRequest("q", r, (r) => {
                const s = r.d,
                    o = r.s;
                it.warnOnListenWarnings_(s, t);
                (this.listens.get(n) && this.listens.get(n).get(i)) === e && (this.log_("listen response", r), "ok" !== o && this.removeListen_(n, i), e.onComplete && e.onComplete(o, s));
            });
    }
    static warnOnListenWarnings_(e, t) {
        if (e && "object" == typeof e && I(e, "w")) {
            const n = S(e, "w");
            if (Array.isArray(n) && ~n.indexOf("no_index")) {
                const e = '".indexOn": "' + t._queryParams.getIndex().toString() + '"',
                    n = t._path.toString();
                re(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`);
            }
        }
    }
    refreshAuthToken(e) {
        (this.authToken_ = e), this.log_("Auth token refreshed"), this.authToken_ ? this.tryAuth() : this.connected_ && this.sendRequest("unauth", {}, () => {}), this.reduceReconnectDelayIfAdminCredential_(e);
    }
    reduceReconnectDelayIfAdminCredential_(e) {
        ((e && 40 === e.length) ||
            (function (e) {
                const t = E(e).claims;
                return "object" == typeof t && !0 === t.admin;
            })(e)) &&
            (this.log_("Admin auth credential detected.  Reducing max reconnect time."), (this.maxReconnectDelay_ = 3e4));
    }
    refreshAppCheckToken(e) {
        (this.appCheckToken_ = e), this.log_("App check token refreshed"), this.appCheckToken_ ? this.tryAppCheck() : this.connected_ && this.sendRequest("unappeck", {}, () => {});
    }
    tryAuth() {
        if (this.connected_ && this.authToken_) {
            const e = this.authToken_,
                t = (function (e) {
                    const t = E(e).claims;
                    return !!t && "object" == typeof t && t.hasOwnProperty("iat");
                })(e)
                    ? "auth"
                    : "gauth",
                n = { cred: e };
            null === this.authOverride_ ? (n.noauth = !0) : "object" == typeof this.authOverride_ && (n.authvar = this.authOverride_),
                this.sendRequest(t, n, (t) => {
                    const n = t.s,
                        i = t.d || "error";
                    this.authToken_ === e && ("ok" === n ? (this.invalidAuthTokenCount_ = 0) : this.onAuthRevoked_(n, i));
                });
        }
    }
    tryAppCheck() {
        this.connected_ &&
            this.appCheckToken_ &&
            this.sendRequest("appcheck", { token: this.appCheckToken_ }, (e) => {
                const t = e.s,
                    n = e.d || "error";
                "ok" === t ? (this.invalidAppCheckTokenCount_ = 0) : this.onAppCheckRevoked_(t, n);
            });
    }
    unlisten(e, t) {
        const n = e._path.toString(),
            i = e._queryIdentifier;
        this.log_("Unlisten called for " + n + " " + i), a(e._queryParams.isDefault() || !e._queryParams.loadsAllData(), "unlisten() called for non-default but complete query");
        this.removeListen_(n, i) && this.connected_ && this.sendUnlisten_(n, i, e._queryObject, t);
    }
    sendUnlisten_(e, t, n, i) {
        this.log_("Unlisten on " + e + " for " + t);
        const r = { p: e };
        i && ((r.q = n), (r.t = i)), this.sendRequest("n", r);
    }
    onDisconnectPut(e, t, n) {
        this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("o", e, t, n) : this.onDisconnectRequestQueue_.push({ pathString: e, action: "o", data: t, onComplete: n });
    }
    onDisconnectMerge(e, t, n) {
        this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("om", e, t, n) : this.onDisconnectRequestQueue_.push({ pathString: e, action: "om", data: t, onComplete: n });
    }
    onDisconnectCancel(e, t) {
        this.initConnection_(), this.connected_ ? this.sendOnDisconnect_("oc", e, null, t) : this.onDisconnectRequestQueue_.push({ pathString: e, action: "oc", data: null, onComplete: t });
    }
    sendOnDisconnect_(e, t, n, i) {
        const r = { p: t, d: n };
        this.log_("onDisconnect " + e, r),
            this.sendRequest(e, r, (e) => {
                i &&
                    setTimeout(() => {
                        i(e.s, e.d);
                    }, Math.floor(0));
            });
    }
    put(e, t, n, i) {
        this.putInternal("p", e, t, n, i);
    }
    merge(e, t, n, i) {
        this.putInternal("m", e, t, n, i);
    }
    putInternal(e, t, n, i, r) {
        this.initConnection_();
        const s = { p: t, d: n };
        void 0 !== r && (s.h = r), this.outstandingPuts_.push({ action: e, request: s, onComplete: i }), this.outstandingPutCount_++;
        const o = this.outstandingPuts_.length - 1;
        this.connected_ ? this.sendPut_(o) : this.log_("Buffering put: " + t);
    }
    sendPut_(e) {
        const t = this.outstandingPuts_[e].action,
            n = this.outstandingPuts_[e].request,
            i = this.outstandingPuts_[e].onComplete;
        (this.outstandingPuts_[e].queued = this.connected_),
            this.sendRequest(t, n, (n) => {
                this.log_(t + " response", n), delete this.outstandingPuts_[e], this.outstandingPutCount_--, 0 === this.outstandingPutCount_ && (this.outstandingPuts_ = []), i && i(n.s, n.d);
            });
    }
    reportStats(e) {
        if (this.connected_) {
            const t = { c: e };
            this.log_("reportStats", t),
                this.sendRequest("s", t, (e) => {
                    if ("ok" !== e.s) {
                        const t = e.d;
                        this.log_("reportStats", "Error sending stats: " + t);
                    }
                });
        }
    }
    onDataMessage_(e) {
        if ("r" in e) {
            this.log_("from server: " + b(e));
            const t = e.r,
                n = this.requestCBHash_[t];
            n && (delete this.requestCBHash_[t], n(e.b));
        } else {
            if ("error" in e) throw "A server-side error has occurred: " + e.error;
            "a" in e && this.onDataPush_(e.a, e.b);
        }
    }
    onDataPush_(e, t) {
        this.log_("handleServerMessage", e, t),
            "d" === e
                ? this.onDataUpdate_(t.p, t.d, !1, t.t)
                : "m" === e
                ? this.onDataUpdate_(t.p, t.d, !0, t.t)
                : "c" === e
                ? this.onListenRevoked_(t.p, t.q)
                : "ac" === e
                ? this.onAuthRevoked_(t.s, t.d)
                : "apc" === e
                ? this.onAppCheckRevoked_(t.s, t.d)
                : "sd" === e
                ? this.onSecurityDebugPacket_(t)
                : ne("Unrecognized action received from server: " + b(e) + "\nAre you using the latest client?");
    }
    onReady_(e, t) {
        this.log_("connection ready"),
            (this.connected_ = !0),
            (this.lastConnectionEstablishedTime_ = new Date().getTime()),
            this.handleTimestamp_(e),
            (this.lastSessionId = t),
            this.firstConnection_ && this.sendConnectStats_(),
            this.restoreState_(),
            (this.firstConnection_ = !1),
            this.onConnectStatus_(!0);
    }
    scheduleConnect_(e) {
        a(!this.realtime_, "Scheduling a connect when we're already connected/ing?"),
            this.establishConnectionTimer_ && clearTimeout(this.establishConnectionTimer_),
            (this.establishConnectionTimer_ = setTimeout(() => {
                (this.establishConnectionTimer_ = null), this.establishConnection_();
            }, Math.floor(e)));
    }
    initConnection_() {
        !this.realtime_ && this.firstConnection_ && this.scheduleConnect_(0);
    }
    onVisible_(e) {
        e && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_ && (this.log_("Window became visible.  Reducing delay."), (this.reconnectDelay_ = 1e3), this.realtime_ || this.scheduleConnect_(0)), (this.visible_ = e);
    }
    onOnline_(e) {
        e ? (this.log_("Browser went online."), (this.reconnectDelay_ = 1e3), this.realtime_ || this.scheduleConnect_(0)) : (this.log_("Browser went offline.  Killing connection."), this.realtime_ && this.realtime_.close());
    }
    onRealtimeDisconnect_() {
        if ((this.log_("data client disconnected"), (this.connected_ = !1), (this.realtime_ = null), this.cancelSentTransactions_(), (this.requestCBHash_ = {}), this.shouldReconnect_())) {
            if (this.visible_) {
                if (this.lastConnectionEstablishedTime_) {
                    new Date().getTime() - this.lastConnectionEstablishedTime_ > 3e4 && (this.reconnectDelay_ = 1e3), (this.lastConnectionEstablishedTime_ = null);
                }
            } else this.log_("Window isn't visible.  Delaying reconnect."), (this.reconnectDelay_ = this.maxReconnectDelay_), (this.lastConnectionAttemptTime_ = new Date().getTime());
            const e = new Date().getTime() - this.lastConnectionAttemptTime_;
            let t = Math.max(0, this.reconnectDelay_ - e);
            (t = Math.random() * t), this.log_("Trying to reconnect in " + t + "ms"), this.scheduleConnect_(t), (this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, 1.3 * this.reconnectDelay_));
        }
        this.onConnectStatus_(!1);
    }
    async establishConnection_() {
        if (this.shouldReconnect_()) {
            this.log_("Making a connection attempt"), (this.lastConnectionAttemptTime_ = new Date().getTime()), (this.lastConnectionEstablishedTime_ = null);
            const e = this.onDataMessage_.bind(this),
                t = this.onReady_.bind(this),
                n = this.onRealtimeDisconnect_.bind(this),
                i = this.id + ":" + it.nextConnectionId_++,
                r = this.lastSessionId;
            let s = !1,
                o = null;
            const l = function () {
                    o ? o.close() : ((s = !0), n());
                },
                h = function (e) {
                    a(o, "sendRequest call when we're not connected not allowed."), o.sendRequest(e);
                };
            this.realtime_ = { close: l, sendRequest: h };
            const c = this.forceTokenRefresh_;
            this.forceTokenRefresh_ = !1;
            try {
                const [a, l] = await Promise.all([this.authTokenProvider_.getToken(c), this.appCheckTokenProvider_.getToken(c)]);
                s
                    ? ee("getToken() completed but was canceled")
                    : (ee("getToken() completed. Creating connection."),
                      (this.authToken_ = a && a.accessToken),
                      (this.appCheckToken_ = l && l.token),
                      (o = new Le(
                          i,
                          this.repoInfo_,
                          this.applicationId_,
                          this.appCheckToken_,
                          this.authToken_,
                          e,
                          t,
                          n,
                          (e) => {
                              re(e + " (" + this.repoInfo_.toString() + ")"), this.interrupt("server_kill");
                          },
                          r
                      )));
            } catch (e) {
                this.log_("Failed to get token: " + e), s || (this.repoInfo_.nodeAdmin && re(e), l());
            }
        }
    }
    interrupt(e) {
        ee("Interrupting connection for reason: " + e),
            (this.interruptReasons_[e] = !0),
            this.realtime_ ? this.realtime_.close() : (this.establishConnectionTimer_ && (clearTimeout(this.establishConnectionTimer_), (this.establishConnectionTimer_ = null)), this.connected_ && this.onRealtimeDisconnect_());
    }
    resume(e) {
        ee("Resuming connection for reason: " + e), delete this.interruptReasons_[e], k(this.interruptReasons_) && ((this.reconnectDelay_ = 1e3), this.realtime_ || this.scheduleConnect_(0));
    }
    handleTimestamp_(e) {
        const t = e - new Date().getTime();
        this.onServerInfoUpdate_({ serverTimeOffset: t });
    }
    cancelSentTransactions_() {
        for (let e = 0; e < this.outstandingPuts_.length; e++) {
            const t = this.outstandingPuts_[e];
            t && "h" in t.request && t.queued && (t.onComplete && t.onComplete("disconnect"), delete this.outstandingPuts_[e], this.outstandingPutCount_--);
        }
        0 === this.outstandingPutCount_ && (this.outstandingPuts_ = []);
    }
    onListenRevoked_(e, t) {
        let n;
        n = t ? t.map((e) => ue(e)).join("$") : "default";
        const i = this.removeListen_(e, n);
        i && i.onComplete && i.onComplete("permission_denied");
    }
    removeListen_(e, t) {
        const n = new We(e).toString();
        let i;
        if (this.listens.has(n)) {
            const e = this.listens.get(n);
            (i = e.get(t)), e.delete(t), 0 === e.size && this.listens.delete(n);
        } else i = void 0;
        return i;
    }
    onAuthRevoked_(e, t) {
        ee("Auth token revoked: " + e + "/" + t),
            (this.authToken_ = null),
            (this.forceTokenRefresh_ = !0),
            this.realtime_.close(),
            ("invalid_token" !== e && "permission_denied" !== e) || (this.invalidAuthTokenCount_++, this.invalidAuthTokenCount_ >= 3 && ((this.reconnectDelay_ = 3e4), this.authTokenProvider_.notifyForInvalidToken()));
    }
    onAppCheckRevoked_(e, t) {
        ee("App check token revoked: " + e + "/" + t),
            (this.appCheckToken_ = null),
            (this.forceTokenRefresh_ = !0),
            ("invalid_token" !== e && "permission_denied" !== e) || (this.invalidAppCheckTokenCount_++, this.invalidAppCheckTokenCount_ >= 3 && this.appCheckTokenProvider_.notifyForInvalidToken());
    }
    onSecurityDebugPacket_(e) {
        this.securityDebugCallback_ ? this.securityDebugCallback_(e) : "msg" in e && console.log("FIREBASE: " + e.msg.replace("\n", "\nFIREBASE: "));
    }
    restoreState_() {
        this.tryAuth(), this.tryAppCheck();
        for (const e of this.listens.values()) for (const t of e.values()) this.sendListen_(t);
        for (let e = 0; e < this.outstandingPuts_.length; e++) this.outstandingPuts_[e] && this.sendPut_(e);
        for (; this.onDisconnectRequestQueue_.length; ) {
            const e = this.onDisconnectRequestQueue_.shift();
            this.sendOnDisconnect_(e.action, e.pathString, e.data, e.onComplete);
        }
        for (let e = 0; e < this.outstandingGets_.length; e++) this.outstandingGets_[e] && this.sendGet_(e);
    }
    sendConnectStats_() {
        const e = {};
        (e["sdk.js." + U.replace(/\./g, "-")] = 1), g() ? (e["framework.cordova"] = 1) : "object" == typeof navigator && "ReactNative" === navigator.product && (e["framework.reactnative"] = 1), this.reportStats(e);
    }
    shouldReconnect_() {
        const e = qe.getInstance().currentlyOnline();
        return k(this.interruptReasons_) && e;
    }
}
(it.nextPersistentConnectionId_ = 0), (it.nextConnectionId_ = 0);
class rt {
    constructor(e, t) {
        (this.name = e), (this.node = t);
    }
    static Wrap(e, t) {
        return new rt(e, t);
    }
}
class st {
    getCompare() {
        return this.compare.bind(this);
    }
    indexedValueChanged(e, t) {
        const n = new rt(oe, e),
            i = new rt(oe, t);
        return 0 !== this.compare(n, i);
    }
    minPost() {
        return rt.MIN;
    }
}
let ot;
class at extends st {
    static get __EMPTY_NODE() {
        return ot;
    }
    static set __EMPTY_NODE(e) {
        ot = e;
    }
    compare(e, t) {
        return le(e.name, t.name);
    }
    isDefinedOn(e) {
        throw l("KeyIndex.isDefinedOn not expected to be called.");
    }
    indexedValueChanged(e, t) {
        return !1;
    }
    minPost() {
        return rt.MIN;
    }
    maxPost() {
        return new rt(ae, ot);
    }
    makePost(e, t) {
        return a("string" == typeof e, "KeyIndex indexValue must always be a string."), new rt(e, ot);
    }
    toString() {
        return ".key";
    }
}
const lt = new at();
class ht {
    constructor(e, t, n, i, r = null) {
        (this.isReverse_ = i), (this.resultGenerator_ = r), (this.nodeStack_ = []);
        let s = 1;
        for (; !e.isEmpty(); )
            if (((e = e), (s = t ? n(e.key, t) : 1), i && (s *= -1), s < 0)) e = this.isReverse_ ? e.left : e.right;
            else {
                if (0 === s) {
                    this.nodeStack_.push(e);
                    break;
                }
                this.nodeStack_.push(e), (e = this.isReverse_ ? e.right : e.left);
            }
    }
    getNext() {
        if (0 === this.nodeStack_.length) return null;
        let e,
            t = this.nodeStack_.pop();
        if (((e = this.resultGenerator_ ? this.resultGenerator_(t.key, t.value) : { key: t.key, value: t.value }), this.isReverse_)) for (t = t.left; !t.isEmpty(); ) this.nodeStack_.push(t), (t = t.right);
        else for (t = t.right; !t.isEmpty(); ) this.nodeStack_.push(t), (t = t.left);
        return e;
    }
    hasNext() {
        return this.nodeStack_.length > 0;
    }
    peek() {
        if (0 === this.nodeStack_.length) return null;
        const e = this.nodeStack_[this.nodeStack_.length - 1];
        return this.resultGenerator_ ? this.resultGenerator_(e.key, e.value) : { key: e.key, value: e.value };
    }
}
class ct {
    constructor(e, t, n, i, r) {
        (this.key = e), (this.value = t), (this.color = null != n ? n : ct.RED), (this.left = null != i ? i : ut.EMPTY_NODE), (this.right = null != r ? r : ut.EMPTY_NODE);
    }
    copy(e, t, n, i, r) {
        return new ct(null != e ? e : this.key, null != t ? t : this.value, null != n ? n : this.color, null != i ? i : this.left, null != r ? r : this.right);
    }
    count() {
        return this.left.count() + 1 + this.right.count();
    }
    isEmpty() {
        return !1;
    }
    inorderTraversal(e) {
        return this.left.inorderTraversal(e) || !!e(this.key, this.value) || this.right.inorderTraversal(e);
    }
    reverseTraversal(e) {
        return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e);
    }
    min_() {
        return this.left.isEmpty() ? this : this.left.min_();
    }
    minKey() {
        return this.min_().key;
    }
    maxKey() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
    }
    insert(e, t, n) {
        let i = this;
        const r = n(e, i.key);
        return (i = r < 0 ? i.copy(null, null, null, i.left.insert(e, t, n), null) : 0 === r ? i.copy(null, t, null, null, null) : i.copy(null, null, null, null, i.right.insert(e, t, n))), i.fixUp_();
    }
    removeMin_() {
        if (this.left.isEmpty()) return ut.EMPTY_NODE;
        let e = this;
        return e.left.isRed_() || e.left.left.isRed_() || (e = e.moveRedLeft_()), (e = e.copy(null, null, null, e.left.removeMin_(), null)), e.fixUp_();
    }
    remove(e, t) {
        let n, i;
        if (((n = this), t(e, n.key) < 0)) n.left.isEmpty() || n.left.isRed_() || n.left.left.isRed_() || (n = n.moveRedLeft_()), (n = n.copy(null, null, null, n.left.remove(e, t), null));
        else {
            if ((n.left.isRed_() && (n = n.rotateRight_()), n.right.isEmpty() || n.right.isRed_() || n.right.left.isRed_() || (n = n.moveRedRight_()), 0 === t(e, n.key))) {
                if (n.right.isEmpty()) return ut.EMPTY_NODE;
                (i = n.right.min_()), (n = n.copy(i.key, i.value, null, null, n.right.removeMin_()));
            }
            n = n.copy(null, null, null, null, n.right.remove(e, t));
        }
        return n.fixUp_();
    }
    isRed_() {
        return this.color;
    }
    fixUp_() {
        let e = this;
        return e.right.isRed_() && !e.left.isRed_() && (e = e.rotateLeft_()), e.left.isRed_() && e.left.left.isRed_() && (e = e.rotateRight_()), e.left.isRed_() && e.right.isRed_() && (e = e.colorFlip_()), e;
    }
    moveRedLeft_() {
        let e = this.colorFlip_();
        return e.right.left.isRed_() && ((e = e.copy(null, null, null, null, e.right.rotateRight_())), (e = e.rotateLeft_()), (e = e.colorFlip_())), e;
    }
    moveRedRight_() {
        let e = this.colorFlip_();
        return e.left.left.isRed_() && ((e = e.rotateRight_()), (e = e.colorFlip_())), e;
    }
    rotateLeft_() {
        const e = this.copy(null, null, ct.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, e, null);
    }
    rotateRight_() {
        const e = this.copy(null, null, ct.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, e);
    }
    colorFlip_() {
        const e = this.left.copy(null, null, !this.left.color, null, null),
            t = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, e, t);
    }
    checkMaxDepth_() {
        const e = this.check_();
        return Math.pow(2, e) <= this.count() + 1;
    }
    check_() {
        if (this.isRed_() && this.left.isRed_()) throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
        if (this.right.isRed_()) throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
        const e = this.left.check_();
        if (e !== this.right.check_()) throw new Error("Black depths differ");
        return e + (this.isRed_() ? 0 : 1);
    }
}
(ct.RED = !0), (ct.BLACK = !1);
class ut {
    constructor(e, t = ut.EMPTY_NODE) {
        (this.comparator_ = e), (this.root_ = t);
    }
    insert(e, t) {
        return new ut(this.comparator_, this.root_.insert(e, t, this.comparator_).copy(null, null, ct.BLACK, null, null));
    }
    remove(e) {
        return new ut(this.comparator_, this.root_.remove(e, this.comparator_).copy(null, null, ct.BLACK, null, null));
    }
    get(e) {
        let t,
            n = this.root_;
        for (; !n.isEmpty(); ) {
            if (((t = this.comparator_(e, n.key)), 0 === t)) return n.value;
            t < 0 ? (n = n.left) : t > 0 && (n = n.right);
        }
        return null;
    }
    getPredecessorKey(e) {
        let t,
            n = this.root_,
            i = null;
        for (; !n.isEmpty(); ) {
            if (((t = this.comparator_(e, n.key)), 0 === t)) {
                if (n.left.isEmpty()) return i ? i.key : null;
                for (n = n.left; !n.right.isEmpty(); ) n = n.right;
                return n.key;
            }
            t < 0 ? (n = n.left) : t > 0 && ((i = n), (n = n.right));
        }
        throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
    }
    isEmpty() {
        return this.root_.isEmpty();
    }
    count() {
        return this.root_.count();
    }
    minKey() {
        return this.root_.minKey();
    }
    maxKey() {
        return this.root_.maxKey();
    }
    inorderTraversal(e) {
        return this.root_.inorderTraversal(e);
    }
    reverseTraversal(e) {
        return this.root_.reverseTraversal(e);
    }
    getIterator(e) {
        return new ht(this.root_, null, this.comparator_, !1, e);
    }
    getIteratorFrom(e, t) {
        return new ht(this.root_, e, this.comparator_, !1, t);
    }
    getReverseIteratorFrom(e, t) {
        return new ht(this.root_, e, this.comparator_, !0, t);
    }
    getReverseIterator(e) {
        return new ht(this.root_, null, this.comparator_, !0, e);
    }
}
function dt(e, t) {
    return le(e.name, t.name);
}
function _t(e, t) {
    return le(e, t);
}
let pt;
ut.EMPTY_NODE = new (class {
    copy(e, t, n, i, r) {
        return this;
    }
    insert(e, t, n) {
        return new ct(e, t, null);
    }
    remove(e, t) {
        return this;
    }
    count() {
        return 0;
    }
    isEmpty() {
        return !0;
    }
    inorderTraversal(e) {
        return !1;
    }
    reverseTraversal(e) {
        return !1;
    }
    minKey() {
        return null;
    }
    maxKey() {
        return null;
    }
    check_() {
        return 0;
    }
    isRed_() {
        return !1;
    }
})();
const ft = function (e) {
        return "number" == typeof e ? "number:" + pe(e) : "string:" + e;
    },
    gt = function (e) {
        if (e.isLeafNode()) {
            const t = e.val();
            a("string" == typeof t || "number" == typeof t || ("object" == typeof t && I(t, ".sv")), "Priority must be a string or number.");
        } else a(e === pt || e.isEmpty(), "priority of unexpected type.");
        a(e === pt || e.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
    };
let mt, yt, vt;
class Ct {
    constructor(e, t = Ct.__childrenNodeConstructor.EMPTY_NODE) {
        (this.value_ = e), (this.priorityNode_ = t), (this.lazyHash_ = null), a(void 0 !== this.value_ && null !== this.value_, "LeafNode shouldn't be created with null/undefined value."), gt(this.priorityNode_);
    }
    static set __childrenNodeConstructor(e) {
        mt = e;
    }
    static get __childrenNodeConstructor() {
        return mt;
    }
    isLeafNode() {
        return !0;
    }
    getPriority() {
        return this.priorityNode_;
    }
    updatePriority(e) {
        return new Ct(this.value_, e);
    }
    getImmediateChild(e) {
        return ".priority" === e ? this.priorityNode_ : Ct.__childrenNodeConstructor.EMPTY_NODE;
    }
    getChild(e) {
        return Qe(e) ? this : ".priority" === Be(e) ? this.priorityNode_ : Ct.__childrenNodeConstructor.EMPTY_NODE;
    }
    hasChild() {
        return !1;
    }
    getPredecessorChildName(e, t) {
        return null;
    }
    updateImmediateChild(e, t) {
        return ".priority" === e ? this.updatePriority(t) : t.isEmpty() && ".priority" !== e ? this : Ct.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e, t).updatePriority(this.priorityNode_);
    }
    updateChild(e, t) {
        const n = Be(e);
        return null === n
            ? t
            : t.isEmpty() && ".priority" !== n
            ? this
            : (a(".priority" !== n || 1 === je(e), ".priority must be the last token in a path"), this.updateImmediateChild(n, Ct.__childrenNodeConstructor.EMPTY_NODE.updateChild(He(e), t)));
    }
    isEmpty() {
        return !1;
    }
    numChildren() {
        return 0;
    }
    forEachChild(e, t) {
        return !1;
    }
    val(e) {
        return e && !this.getPriority().isEmpty() ? { ".value": this.getValue(), ".priority": this.getPriority().val() } : this.getValue();
    }
    hash() {
        if (null === this.lazyHash_) {
            let e = "";
            this.priorityNode_.isEmpty() || (e += "priority:" + ft(this.priorityNode_.val()) + ":");
            const t = typeof this.value_;
            (e += t + ":"), (e += "number" === t ? pe(this.value_) : this.value_), (this.lazyHash_ = $(e));
        }
        return this.lazyHash_;
    }
    getValue() {
        return this.value_;
    }
    compareTo(e) {
        return e === Ct.__childrenNodeConstructor.EMPTY_NODE ? 1 : e instanceof Ct.__childrenNodeConstructor ? -1 : (a(e.isLeafNode(), "Unknown node type"), this.compareToLeafNode_(e));
    }
    compareToLeafNode_(e) {
        const t = typeof e.value_,
            n = typeof this.value_,
            i = Ct.VALUE_TYPE_ORDER.indexOf(t),
            r = Ct.VALUE_TYPE_ORDER.indexOf(n);
        return a(i >= 0, "Unknown leaf type: " + t), a(r >= 0, "Unknown leaf type: " + n), i === r ? ("object" === n ? 0 : this.value_ < e.value_ ? -1 : this.value_ === e.value_ ? 0 : 1) : r - i;
    }
    withIndex() {
        return this;
    }
    isIndexed() {
        return !0;
    }
    equals(e) {
        if (e === this) return !0;
        if (e.isLeafNode()) {
            const t = e;
            return this.value_ === t.value_ && this.priorityNode_.equals(t.priorityNode_);
        }
        return !1;
    }
}
Ct.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
const wt = new (class extends st {
        compare(e, t) {
            const n = e.node.getPriority(),
                i = t.node.getPriority(),
                r = n.compareTo(i);
            return 0 === r ? le(e.name, t.name) : r;
        }
        isDefinedOn(e) {
            return !e.getPriority().isEmpty();
        }
        indexedValueChanged(e, t) {
            return !e.getPriority().equals(t.getPriority());
        }
        minPost() {
            return rt.MIN;
        }
        maxPost() {
            return new rt(ae, new Ct("[PRIORITY-POST]", vt));
        }
        makePost(e, t) {
            const n = yt(e);
            return new rt(t, new Ct("[PRIORITY-POST]", n));
        }
        toString() {
            return ".priority";
        }
    })(),
    Tt = Math.log(2);
class bt {
    constructor(e) {
        var t;
        (this.count = ((t = e + 1), parseInt(Math.log(t) / Tt, 10))), (this.current_ = this.count - 1);
        const n = ((i = this.count), parseInt(Array(i + 1).join("1"), 2));
        var i;
        this.bits_ = (e + 1) & n;
    }
    nextBitIsOne() {
        const e = !(this.bits_ & (1 << this.current_));
        return this.current_--, e;
    }
}
const Et = function (e, t, n, i) {
    e.sort(t);
    const r = function (t, i) {
            const s = i - t;
            let o, a;
            if (0 === s) return null;
            if (1 === s) return (o = e[t]), (a = n ? n(o) : o), new ct(a, o.node, ct.BLACK, null, null);
            {
                const l = parseInt(s / 2, 10) + t,
                    h = r(t, l),
                    c = r(l + 1, i);
                return (o = e[l]), (a = n ? n(o) : o), new ct(a, o.node, ct.BLACK, h, c);
            }
        },
        s = (function (t) {
            let i = null,
                s = null,
                o = e.length;
            const a = function (t, i) {
                    const s = o - t,
                        a = o;
                    o -= t;
                    const h = r(s + 1, a),
                        c = e[s],
                        u = n ? n(c) : c;
                    l(new ct(u, c.node, i, null, h));
                },
                l = function (e) {
                    i ? ((i.left = e), (i = e)) : ((s = e), (i = e));
                };
            for (let e = 0; e < t.count; ++e) {
                const n = t.nextBitIsOne(),
                    i = Math.pow(2, t.count - (e + 1));
                n ? a(i, ct.BLACK) : (a(i, ct.BLACK), a(i, ct.RED));
            }
            return s;
        })(new bt(e.length));
    return new ut(i || t, s);
};
let It;
const St = {};
class kt {
    constructor(e, t) {
        (this.indexes_ = e), (this.indexSet_ = t);
    }
    static get Default() {
        return a(St && wt, "ChildrenNode.ts has not been loaded"), (It = It || new kt({ ".priority": St }, { ".priority": wt })), It;
    }
    get(e) {
        const t = S(this.indexes_, e);
        if (!t) throw new Error("No index defined for " + e);
        return t instanceof ut ? t : null;
    }
    hasIndex(e) {
        return I(this.indexSet_, e.toString());
    }
    addIndex(e, t) {
        a(e !== lt, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
        const n = [];
        let i = !1;
        const r = t.getIterator(rt.Wrap);
        let s,
            o = r.getNext();
        for (; o; ) (i = i || e.isDefinedOn(o.node)), n.push(o), (o = r.getNext());
        s = i ? Et(n, e.getCompare()) : St;
        const l = e.toString(),
            h = Object.assign({}, this.indexSet_);
        h[l] = e;
        const c = Object.assign({}, this.indexes_);
        return (c[l] = s), new kt(c, h);
    }
    addToIndexes(e, t) {
        const n = N(this.indexes_, (n, i) => {
            const r = S(this.indexSet_, i);
            if ((a(r, "Missing index implementation for " + i), n === St)) {
                if (r.isDefinedOn(e.node)) {
                    const n = [],
                        i = t.getIterator(rt.Wrap);
                    let s = i.getNext();
                    for (; s; ) s.name !== e.name && n.push(s), (s = i.getNext());
                    return n.push(e), Et(n, r.getCompare());
                }
                return St;
            }
            {
                const i = t.get(e.name);
                let r = n;
                return i && (r = r.remove(new rt(e.name, i))), r.insert(e, e.node);
            }
        });
        return new kt(n, this.indexSet_);
    }
    removeFromIndexes(e, t) {
        const n = N(this.indexes_, (n) => {
            if (n === St) return n;
            {
                const i = t.get(e.name);
                return i ? n.remove(new rt(e.name, i)) : n;
            }
        });
        return new kt(n, this.indexSet_);
    }
}
let Nt;
class Pt {
    constructor(e, t, n) {
        (this.children_ = e),
            (this.priorityNode_ = t),
            (this.indexMap_ = n),
            (this.lazyHash_ = null),
            this.priorityNode_ && gt(this.priorityNode_),
            this.children_.isEmpty() && a(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority");
    }
    static get EMPTY_NODE() {
        return Nt || (Nt = new Pt(new ut(_t), null, kt.Default));
    }
    isLeafNode() {
        return !1;
    }
    getPriority() {
        return this.priorityNode_ || Nt;
    }
    updatePriority(e) {
        return this.children_.isEmpty() ? this : new Pt(this.children_, e, this.indexMap_);
    }
    getImmediateChild(e) {
        if (".priority" === e) return this.getPriority();
        {
            const t = this.children_.get(e);
            return null === t ? Nt : t;
        }
    }
    getChild(e) {
        const t = Be(e);
        return null === t ? this : this.getImmediateChild(t).getChild(He(e));
    }
    hasChild(e) {
        return null !== this.children_.get(e);
    }
    updateImmediateChild(e, t) {
        if ((a(t, "We should always be passing snapshot nodes"), ".priority" === e)) return this.updatePriority(t);
        {
            const n = new rt(e, t);
            let i, r;
            t.isEmpty() ? ((i = this.children_.remove(e)), (r = this.indexMap_.removeFromIndexes(n, this.children_))) : ((i = this.children_.insert(e, t)), (r = this.indexMap_.addToIndexes(n, this.children_)));
            const s = i.isEmpty() ? Nt : this.priorityNode_;
            return new Pt(i, s, r);
        }
    }
    updateChild(e, t) {
        const n = Be(e);
        if (null === n) return t;
        {
            a(".priority" !== Be(e) || 1 === je(e), ".priority must be the last token in a path");
            const i = this.getImmediateChild(n).updateChild(He(e), t);
            return this.updateImmediateChild(n, i);
        }
    }
    isEmpty() {
        return this.children_.isEmpty();
    }
    numChildren() {
        return this.children_.count();
    }
    val(e) {
        if (this.isEmpty()) return null;
        const t = {};
        let n = 0,
            i = 0,
            r = !0;
        if (
            (this.forEachChild(wt, (s, o) => {
                (t[s] = o.val(e)), n++, r && Pt.INTEGER_REGEXP_.test(s) ? (i = Math.max(i, Number(s))) : (r = !1);
            }),
            !e && r && i < 2 * n)
        ) {
            const e = [];
            for (const n in t) e[n] = t[n];
            return e;
        }
        return e && !this.getPriority().isEmpty() && (t[".priority"] = this.getPriority().val()), t;
    }
    hash() {
        if (null === this.lazyHash_) {
            let e = "";
            this.getPriority().isEmpty() || (e += "priority:" + ft(this.getPriority().val()) + ":"),
                this.forEachChild(wt, (t, n) => {
                    const i = n.hash();
                    "" !== i && (e += ":" + t + ":" + i);
                }),
                (this.lazyHash_ = "" === e ? "" : $(e));
        }
        return this.lazyHash_;
    }
    getPredecessorChildName(e, t, n) {
        const i = this.resolveIndex_(n);
        if (i) {
            const n = i.getPredecessorKey(new rt(e, t));
            return n ? n.name : null;
        }
        return this.children_.getPredecessorKey(e);
    }
    getFirstChildName(e) {
        const t = this.resolveIndex_(e);
        if (t) {
            const e = t.minKey();
            return e && e.name;
        }
        return this.children_.minKey();
    }
    getFirstChild(e) {
        const t = this.getFirstChildName(e);
        return t ? new rt(t, this.children_.get(t)) : null;
    }
    getLastChildName(e) {
        const t = this.resolveIndex_(e);
        if (t) {
            const e = t.maxKey();
            return e && e.name;
        }
        return this.children_.maxKey();
    }
    getLastChild(e) {
        const t = this.getLastChildName(e);
        return t ? new rt(t, this.children_.get(t)) : null;
    }
    forEachChild(e, t) {
        const n = this.resolveIndex_(e);
        return n ? n.inorderTraversal((e) => t(e.name, e.node)) : this.children_.inorderTraversal(t);
    }
    getIterator(e) {
        return this.getIteratorFrom(e.minPost(), e);
    }
    getIteratorFrom(e, t) {
        const n = this.resolveIndex_(t);
        if (n) return n.getIteratorFrom(e, (e) => e);
        {
            const n = this.children_.getIteratorFrom(e.name, rt.Wrap);
            let i = n.peek();
            for (; null != i && t.compare(i, e) < 0; ) n.getNext(), (i = n.peek());
            return n;
        }
    }
    getReverseIterator(e) {
        return this.getReverseIteratorFrom(e.maxPost(), e);
    }
    getReverseIteratorFrom(e, t) {
        const n = this.resolveIndex_(t);
        if (n) return n.getReverseIteratorFrom(e, (e) => e);
        {
            const n = this.children_.getReverseIteratorFrom(e.name, rt.Wrap);
            let i = n.peek();
            for (; null != i && t.compare(i, e) > 0; ) n.getNext(), (i = n.peek());
            return n;
        }
    }
    compareTo(e) {
        return this.isEmpty() ? (e.isEmpty() ? 0 : -1) : e.isLeafNode() || e.isEmpty() ? 1 : e === xt ? -1 : 0;
    }
    withIndex(e) {
        if (e === lt || this.indexMap_.hasIndex(e)) return this;
        {
            const t = this.indexMap_.addIndex(e, this.children_);
            return new Pt(this.children_, this.priorityNode_, t);
        }
    }
    isIndexed(e) {
        return e === lt || this.indexMap_.hasIndex(e);
    }
    equals(e) {
        if (e === this) return !0;
        if (e.isLeafNode()) return !1;
        {
            const t = e;
            if (this.getPriority().equals(t.getPriority())) {
                if (this.children_.count() === t.children_.count()) {
                    const e = this.getIterator(wt),
                        n = t.getIterator(wt);
                    let i = e.getNext(),
                        r = n.getNext();
                    for (; i && r; ) {
                        if (i.name !== r.name || !i.node.equals(r.node)) return !1;
                        (i = e.getNext()), (r = n.getNext());
                    }
                    return null === i && null === r;
                }
                return !1;
            }
            return !1;
        }
    }
    resolveIndex_(e) {
        return e === lt ? null : this.indexMap_.get(e.toString());
    }
}
Pt.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
const xt = new (class extends Pt {
    constructor() {
        super(new ut(_t), Pt.EMPTY_NODE, kt.Default);
    }
    compareTo(e) {
        return e === this ? 0 : 1;
    }
    equals(e) {
        return e === this;
    }
    getPriority() {
        return this;
    }
    getImmediateChild(e) {
        return Pt.EMPTY_NODE;
    }
    isEmpty() {
        return !1;
    }
})();
Object.defineProperties(rt, { MIN: { value: new rt(oe, Pt.EMPTY_NODE) }, MAX: { value: new rt(ae, xt) } }),
    (at.__EMPTY_NODE = Pt.EMPTY_NODE),
    (Ct.__childrenNodeConstructor = Pt),
    (pt = xt),
    (function (e) {
        vt = e;
    })(xt);
function Rt(e, t = null) {
    if (null === e) return Pt.EMPTY_NODE;
    if (
        ("object" == typeof e && ".priority" in e && (t = e[".priority"]),
        a(null === t || "string" == typeof t || "number" == typeof t || ("object" == typeof t && ".sv" in t), "Invalid priority type found: " + typeof t),
        "object" == typeof e && ".value" in e && null !== e[".value"] && (e = e[".value"]),
        "object" != typeof e || ".sv" in e)
    ) {
        return new Ct(e, Rt(t));
    }
    if (e instanceof Array) {
        let n = Pt.EMPTY_NODE;
        return (
            _e(e, (t, i) => {
                if (I(e, t) && "." !== t.substring(0, 1)) {
                    const e = Rt(i);
                    (!e.isLeafNode() && e.isEmpty()) || (n = n.updateImmediateChild(t, e));
                }
            }),
            n.updatePriority(Rt(t))
        );
    }
    {
        const n = [];
        let i = !1;
        if (
            (_e(e, (e, t) => {
                if ("." !== e.substring(0, 1)) {
                    const r = Rt(t);
                    r.isEmpty() || ((i = i || !r.getPriority().isEmpty()), n.push(new rt(e, r)));
                }
            }),
            0 === n.length)
        )
            return Pt.EMPTY_NODE;
        const r = Et(n, dt, (e) => e.name, _t);
        if (i) {
            const e = Et(n, wt.getCompare());
            return new Pt(r, Rt(t), new kt({ ".priority": e }, { ".priority": wt }));
        }
        return new Pt(r, Rt(t), kt.Default);
    }
}
!(function (e) {
    yt = e;
})(Rt);
class At extends st {
    constructor(e) {
        super(), (this.indexPath_ = e), a(!Qe(e) && ".priority" !== Be(e), "Can't create PathIndex with empty path or .priority key");
    }
    extractChild(e) {
        return e.getChild(this.indexPath_);
    }
    isDefinedOn(e) {
        return !e.getChild(this.indexPath_).isEmpty();
    }
    compare(e, t) {
        const n = this.extractChild(e.node),
            i = this.extractChild(t.node),
            r = n.compareTo(i);
        return 0 === r ? le(e.name, t.name) : r;
    }
    makePost(e, t) {
        const n = Rt(e),
            i = Pt.EMPTY_NODE.updateChild(this.indexPath_, n);
        return new rt(t, i);
    }
    maxPost() {
        const e = Pt.EMPTY_NODE.updateChild(this.indexPath_, xt);
        return new rt(ae, e);
    }
    toString() {
        return ze(this.indexPath_, 0).join("/");
    }
}
const Dt = new (class extends st {
        compare(e, t) {
            const n = e.node.compareTo(t.node);
            return 0 === n ? le(e.name, t.name) : n;
        }
        isDefinedOn(e) {
            return !0;
        }
        indexedValueChanged(e, t) {
            return !e.equals(t);
        }
        minPost() {
            return rt.MIN;
        }
        maxPost() {
            return rt.MAX;
        }
        makePost(e, t) {
            const n = Rt(e);
            return new rt(t, n);
        }
        toString() {
            return ".value";
        }
    })(),
    Ot = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
    Lt = (function () {
        let e = 0;
        const t = [];
        return function (n) {
            const i = n === e;
            let r;
            e = n;
            const s = new Array(8);
            for (r = 7; r >= 0; r--) (s[r] = Ot.charAt(n % 64)), (n = Math.floor(n / 64));
            a(0 === n, "Cannot push at time == 0");
            let o = s.join("");
            if (i) {
                for (r = 11; r >= 0 && 63 === t[r]; r--) t[r] = 0;
                t[r]++;
            } else for (r = 0; r < 12; r++) t[r] = Math.floor(64 * Math.random());
            for (r = 0; r < 12; r++) o += Ot.charAt(t[r]);
            return a(20 === o.length, "nextPushId: Length should be 20."), o;
        };
    })(),
    Ft = function (e) {
        if ("2147483647" === e) return "-";
        const t = ge(e);
        if (null != t) return "" + (t + 1);
        const n = new Array(e.length);
        for (let t = 0; t < n.length; t++) n[t] = e.charAt(t);
        if (n.length < 786) return n.push("-"), n.join("");
        let i = n.length - 1;
        for (; i >= 0 && "z" === n[i]; ) i--;
        if (-1 === i) return ae;
        const r = n[i],
            s = Ot.charAt(Ot.indexOf(r) + 1);
        return (n[i] = s), n.slice(0, i + 1).join("");
    },
    Mt = function (e) {
        if ("-2147483648" === e) return oe;
        const t = ge(e);
        if (null != t) return "" + (t - 1);
        const n = new Array(e.length);
        for (let t = 0; t < n.length; t++) n[t] = e.charAt(t);
        return "-" === n[n.length - 1] ? (1 === n.length ? "2147483647" : (delete n[n.length - 1], n.join(""))) : ((n[n.length - 1] = Ot.charAt(Ot.indexOf(n[n.length - 1]) - 1)), n.join("") + "z".repeat(786 - n.length));
    };
function qt(e) {
    return { type: "value", snapshotNode: e };
}
function Wt(e, t) {
    return { type: "child_added", snapshotNode: t, childName: e };
}
function Ut(e, t) {
    return { type: "child_removed", snapshotNode: t, childName: e };
}
function Bt(e, t, n) {
    return { type: "child_changed", snapshotNode: t, childName: e, oldSnap: n };
}
class jt {
    constructor(e) {
        this.index_ = e;
    }
    updateChild(e, t, n, i, r, s) {
        a(e.isIndexed(this.index_), "A node must be indexed if only a child is updated");
        const o = e.getImmediateChild(t);
        return o.getChild(i).equals(n.getChild(i)) && o.isEmpty() === n.isEmpty()
            ? e
            : (null != s &&
                  (n.isEmpty()
                      ? e.hasChild(t)
                          ? s.trackChildChange(Ut(t, o))
                          : a(e.isLeafNode(), "A child remove without an old child only makes sense on a leaf node")
                      : o.isEmpty()
                      ? s.trackChildChange(Wt(t, n))
                      : s.trackChildChange(Bt(t, n, o))),
              e.isLeafNode() && n.isEmpty() ? e : e.updateImmediateChild(t, n).withIndex(this.index_));
    }
    updateFullNode(e, t, n) {
        return (
            null != n &&
                (e.isLeafNode() ||
                    e.forEachChild(wt, (e, i) => {
                        t.hasChild(e) || n.trackChildChange(Ut(e, i));
                    }),
                t.isLeafNode() ||
                    t.forEachChild(wt, (t, i) => {
                        if (e.hasChild(t)) {
                            const r = e.getImmediateChild(t);
                            r.equals(i) || n.trackChildChange(Bt(t, i, r));
                        } else n.trackChildChange(Wt(t, i));
                    })),
            t.withIndex(this.index_)
        );
    }
    updatePriority(e, t) {
        return e.isEmpty() ? Pt.EMPTY_NODE : e.updatePriority(t);
    }
    filtersNodes() {
        return !1;
    }
    getIndexedFilter() {
        return this;
    }
    getIndex() {
        return this.index_;
    }
}
class Ht {
    constructor(e) {
        (this.indexedFilter_ = new jt(e.getIndex())), (this.index_ = e.getIndex()), (this.startPost_ = Ht.getStartPost_(e)), (this.endPost_ = Ht.getEndPost_(e));
    }
    getStartPost() {
        return this.startPost_;
    }
    getEndPost() {
        return this.endPost_;
    }
    matches(e) {
        return this.index_.compare(this.getStartPost(), e) <= 0 && this.index_.compare(e, this.getEndPost()) <= 0;
    }
    updateChild(e, t, n, i, r, s) {
        return this.matches(new rt(t, n)) || (n = Pt.EMPTY_NODE), this.indexedFilter_.updateChild(e, t, n, i, r, s);
    }
    updateFullNode(e, t, n) {
        t.isLeafNode() && (t = Pt.EMPTY_NODE);
        let i = t.withIndex(this.index_);
        i = i.updatePriority(Pt.EMPTY_NODE);
        const r = this;
        return (
            t.forEachChild(wt, (e, t) => {
                r.matches(new rt(e, t)) || (i = i.updateImmediateChild(e, Pt.EMPTY_NODE));
            }),
            this.indexedFilter_.updateFullNode(e, i, n)
        );
    }
    updatePriority(e, t) {
        return e;
    }
    filtersNodes() {
        return !0;
    }
    getIndexedFilter() {
        return this.indexedFilter_;
    }
    getIndex() {
        return this.index_;
    }
    static getStartPost_(e) {
        if (e.hasStart()) {
            const t = e.getIndexStartName();
            return e.getIndex().makePost(e.getIndexStartValue(), t);
        }
        return e.getIndex().minPost();
    }
    static getEndPost_(e) {
        if (e.hasEnd()) {
            const t = e.getIndexEndName();
            return e.getIndex().makePost(e.getIndexEndValue(), t);
        }
        return e.getIndex().maxPost();
    }
}
class Vt {
    constructor(e) {
        (this.rangedFilter_ = new Ht(e)), (this.index_ = e.getIndex()), (this.limit_ = e.getLimit()), (this.reverse_ = !e.isViewFromLeft());
    }
    updateChild(e, t, n, i, r, s) {
        return (
            this.rangedFilter_.matches(new rt(t, n)) || (n = Pt.EMPTY_NODE),
            e.getImmediateChild(t).equals(n) ? e : e.numChildren() < this.limit_ ? this.rangedFilter_.getIndexedFilter().updateChild(e, t, n, i, r, s) : this.fullLimitUpdateChild_(e, t, n, r, s)
        );
    }
    updateFullNode(e, t, n) {
        let i;
        if (t.isLeafNode() || t.isEmpty()) i = Pt.EMPTY_NODE.withIndex(this.index_);
        else if (2 * this.limit_ < t.numChildren() && t.isIndexed(this.index_)) {
            let e;
            (i = Pt.EMPTY_NODE.withIndex(this.index_)), (e = this.reverse_ ? t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_) : t.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_));
            let n = 0;
            for (; e.hasNext() && n < this.limit_; ) {
                const t = e.getNext();
                let r;
                if (((r = this.reverse_ ? this.index_.compare(this.rangedFilter_.getStartPost(), t) <= 0 : this.index_.compare(t, this.rangedFilter_.getEndPost()) <= 0), !r)) break;
                (i = i.updateImmediateChild(t.name, t.node)), n++;
            }
        } else {
            let e, n, r, s;
            if (((i = t.withIndex(this.index_)), (i = i.updatePriority(Pt.EMPTY_NODE)), this.reverse_)) {
                (s = i.getReverseIterator(this.index_)), (e = this.rangedFilter_.getEndPost()), (n = this.rangedFilter_.getStartPost());
                const t = this.index_.getCompare();
                r = (e, n) => t(n, e);
            } else (s = i.getIterator(this.index_)), (e = this.rangedFilter_.getStartPost()), (n = this.rangedFilter_.getEndPost()), (r = this.index_.getCompare());
            let o = 0,
                a = !1;
            for (; s.hasNext(); ) {
                const t = s.getNext();
                !a && r(e, t) <= 0 && (a = !0);
                a && o < this.limit_ && r(t, n) <= 0 ? o++ : (i = i.updateImmediateChild(t.name, Pt.EMPTY_NODE));
            }
        }
        return this.rangedFilter_.getIndexedFilter().updateFullNode(e, i, n);
    }
    updatePriority(e, t) {
        return e;
    }
    filtersNodes() {
        return !0;
    }
    getIndexedFilter() {
        return this.rangedFilter_.getIndexedFilter();
    }
    getIndex() {
        return this.index_;
    }
    fullLimitUpdateChild_(e, t, n, i, r) {
        let s;
        if (this.reverse_) {
            const e = this.index_.getCompare();
            s = (t, n) => e(n, t);
        } else s = this.index_.getCompare();
        const o = e;
        a(o.numChildren() === this.limit_, "");
        const l = new rt(t, n),
            h = this.reverse_ ? o.getFirstChild(this.index_) : o.getLastChild(this.index_),
            c = this.rangedFilter_.matches(l);
        if (o.hasChild(t)) {
            const e = o.getImmediateChild(t);
            let a = i.getChildAfterChild(this.index_, h, this.reverse_);
            for (; null != a && (a.name === t || o.hasChild(a.name)); ) a = i.getChildAfterChild(this.index_, a, this.reverse_);
            const u = null == a ? 1 : s(a, l);
            if (c && !n.isEmpty() && u >= 0) return null != r && r.trackChildChange(Bt(t, n, e)), o.updateImmediateChild(t, n);
            {
                null != r && r.trackChildChange(Ut(t, e));
                const n = o.updateImmediateChild(t, Pt.EMPTY_NODE);
                return null != a && this.rangedFilter_.matches(a) ? (null != r && r.trackChildChange(Wt(a.name, a.node)), n.updateImmediateChild(a.name, a.node)) : n;
            }
        }
        return n.isEmpty() ? e : c && s(h, l) >= 0 ? (null != r && (r.trackChildChange(Ut(h.name, h.node)), r.trackChildChange(Wt(t, n))), o.updateImmediateChild(t, n).updateImmediateChild(h.name, Pt.EMPTY_NODE)) : e;
    }
}
class zt {
    constructor() {
        (this.limitSet_ = !1),
            (this.startSet_ = !1),
            (this.startNameSet_ = !1),
            (this.startAfterSet_ = !1),
            (this.endSet_ = !1),
            (this.endNameSet_ = !1),
            (this.endBeforeSet_ = !1),
            (this.limit_ = 0),
            (this.viewFrom_ = ""),
            (this.indexStartValue_ = null),
            (this.indexStartName_ = ""),
            (this.indexEndValue_ = null),
            (this.indexEndName_ = ""),
            (this.index_ = wt);
    }
    hasStart() {
        return this.startSet_;
    }
    hasStartAfter() {
        return this.startAfterSet_;
    }
    hasEndBefore() {
        return this.endBeforeSet_;
    }
    isViewFromLeft() {
        return "" === this.viewFrom_ ? this.startSet_ : "l" === this.viewFrom_;
    }
    getIndexStartValue() {
        return a(this.startSet_, "Only valid if start has been set"), this.indexStartValue_;
    }
    getIndexStartName() {
        return a(this.startSet_, "Only valid if start has been set"), this.startNameSet_ ? this.indexStartName_ : oe;
    }
    hasEnd() {
        return this.endSet_;
    }
    getIndexEndValue() {
        return a(this.endSet_, "Only valid if end has been set"), this.indexEndValue_;
    }
    getIndexEndName() {
        return a(this.endSet_, "Only valid if end has been set"), this.endNameSet_ ? this.indexEndName_ : ae;
    }
    hasLimit() {
        return this.limitSet_;
    }
    hasAnchoredLimit() {
        return this.limitSet_ && "" !== this.viewFrom_;
    }
    getLimit() {
        return a(this.limitSet_, "Only valid if limit has been set"), this.limit_;
    }
    getIndex() {
        return this.index_;
    }
    loadsAllData() {
        return !(this.startSet_ || this.endSet_ || this.limitSet_);
    }
    isDefault() {
        return this.loadsAllData() && this.index_ === wt;
    }
    copy() {
        const e = new zt();
        return (
            (e.limitSet_ = this.limitSet_),
            (e.limit_ = this.limit_),
            (e.startSet_ = this.startSet_),
            (e.indexStartValue_ = this.indexStartValue_),
            (e.startNameSet_ = this.startNameSet_),
            (e.indexStartName_ = this.indexStartName_),
            (e.endSet_ = this.endSet_),
            (e.indexEndValue_ = this.indexEndValue_),
            (e.endNameSet_ = this.endNameSet_),
            (e.indexEndName_ = this.indexEndName_),
            (e.index_ = this.index_),
            (e.viewFrom_ = this.viewFrom_),
            e
        );
    }
}
function Yt(e, t, n) {
    const i = e.copy();
    return (i.startSet_ = !0), void 0 === t && (t = null), (i.indexStartValue_ = t), null != n ? ((i.startNameSet_ = !0), (i.indexStartName_ = n)) : ((i.startNameSet_ = !1), (i.indexStartName_ = "")), i;
}
function Kt(e, t, n) {
    const i = e.copy();
    return (i.endSet_ = !0), void 0 === t && (t = null), (i.indexEndValue_ = t), void 0 !== n ? ((i.endNameSet_ = !0), (i.indexEndName_ = n)) : ((i.endNameSet_ = !1), (i.indexEndName_ = "")), i;
}
function Qt(e, t) {
    const n = e.copy();
    return (n.index_ = t), n;
}
function $t(e) {
    const t = {};
    if (e.isDefault()) return t;
    let n;
    return (
        e.index_ === wt ? (n = "$priority") : e.index_ === Dt ? (n = "$value") : e.index_ === lt ? (n = "$key") : (a(e.index_ instanceof At, "Unrecognized index type!"), (n = e.index_.toString())),
        (t.orderBy = b(n)),
        e.startSet_ && ((t.startAt = b(e.indexStartValue_)), e.startNameSet_ && (t.startAt += "," + b(e.indexStartName_))),
        e.endSet_ && ((t.endAt = b(e.indexEndValue_)), e.endNameSet_ && (t.endAt += "," + b(e.indexEndName_))),
        e.limitSet_ && (e.isViewFromLeft() ? (t.limitToFirst = e.limit_) : (t.limitToLast = e.limit_)),
        t
    );
}
function Gt(e) {
    const t = {};
    if ((e.startSet_ && ((t.sp = e.indexStartValue_), e.startNameSet_ && (t.sn = e.indexStartName_)), e.endSet_ && ((t.ep = e.indexEndValue_), e.endNameSet_ && (t.en = e.indexEndName_)), e.limitSet_)) {
        t.l = e.limit_;
        let n = e.viewFrom_;
        "" === n && (n = e.isViewFromLeft() ? "l" : "r"), (t.vf = n);
    }
    return e.index_ !== wt && (t.i = e.index_.toString()), t;
}
class Jt extends Fe {
    constructor(e, t, n, i) {
        super(), (this.repoInfo_ = e), (this.onDataUpdate_ = t), (this.authTokenProvider_ = n), (this.appCheckTokenProvider_ = i), (this.log_ = te("p:rest:")), (this.listens_ = {});
    }
    reportStats(e) {
        throw new Error("Method not implemented.");
    }
    static getListenId_(e, t) {
        return void 0 !== t ? "tag$" + t : (a(e._queryParams.isDefault(), "should have a tag if it's not a default query."), e._path.toString());
    }
    listen(e, t, n, i) {
        const r = e._path.toString();
        this.log_("Listen called for " + r + " " + e._queryIdentifier);
        const s = Jt.getListenId_(e, n),
            o = {};
        this.listens_[s] = o;
        const a = $t(e._queryParams);
        this.restRequest_(r + ".json", a, (e, t) => {
            let a = t;
            if ((404 === e && ((a = null), (e = null)), null === e && this.onDataUpdate_(r, a, !1, n), S(this.listens_, s) === o)) {
                let t;
                (t = e ? (401 === e ? "permission_denied" : "rest_error:" + e) : "ok"), i(t, null);
            }
        });
    }
    unlisten(e, t) {
        const n = Jt.getListenId_(e, t);
        delete this.listens_[n];
    }
    get(e) {
        const t = $t(e._queryParams),
            n = e._path.toString(),
            i = new w();
        return (
            this.restRequest_(n + ".json", t, (e, t) => {
                let r = t;
                404 === e && ((r = null), (e = null)), null === e ? (this.onDataUpdate_(n, r, !1, null), i.resolve(r)) : i.reject(new Error(r));
            }),
            i.promise
        );
    }
    refreshAuthToken(e) {}
    restRequest_(e, t = {}, n) {
        return (
            (t.format = "export"),
            Promise.all([this.authTokenProvider_.getToken(!1), this.appCheckTokenProvider_.getToken(!1)]).then(([i, r]) => {
                i && i.accessToken && (t.auth = i.accessToken), r && r.token && (t.ac = r.token);
                const s =
                    (this.repoInfo_.secure ? "https://" : "http://") +
                    this.repoInfo_.host +
                    e +
                    "?ns=" +
                    this.repoInfo_.namespace +
                    (function (e) {
                        const t = [];
                        for (const [n, i] of Object.entries(e))
                            Array.isArray(i)
                                ? i.forEach((e) => {
                                      t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e));
                                  })
                                : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(i));
                        return t.length ? "&" + t.join("&") : "";
                    })(t);
                this.log_("Sending REST request for " + s);
                const o = new XMLHttpRequest();
                (o.onreadystatechange = () => {
                    if (n && 4 === o.readyState) {
                        this.log_("REST Response for " + s + " received. status:", o.status, "response:", o.responseText);
                        let e = null;
                        if (o.status >= 200 && o.status < 300) {
                            try {
                                e = T(o.responseText);
                            } catch (e) {
                                re("Failed to parse JSON response for " + s + ": " + o.responseText);
                            }
                            n(null, e);
                        } else 401 !== o.status && 404 !== o.status && re("Got unsuccessful REST response for " + s + " Status: " + o.status), n(o.status);
                        n = null;
                    }
                }),
                    o.open("GET", s, !0),
                    o.send();
            })
        );
    }
}
class Xt {
    constructor() {
        this.rootNode_ = Pt.EMPTY_NODE;
    }
    getNode(e) {
        return this.rootNode_.getChild(e);
    }
    updateSnapshot(e, t) {
        this.rootNode_ = this.rootNode_.updateChild(e, t);
    }
}
function Zt() {
    return { value: null, children: new Map() };
}
function en(e, t, n) {
    if (Qe(t)) (e.value = n), e.children.clear();
    else if (null !== e.value) e.value = e.value.updateChild(t, n);
    else {
        const i = Be(t);
        e.children.has(i) || e.children.set(i, Zt());
        en(e.children.get(i), (t = He(t)), n);
    }
}
function tn(e, t) {
    if (Qe(t)) return (e.value = null), e.children.clear(), !0;
    if (null !== e.value) {
        if (e.value.isLeafNode()) return !1;
        {
            const n = e.value;
            return (
                (e.value = null),
                n.forEachChild(wt, (t, n) => {
                    en(e, new We(t), n);
                }),
                tn(e, t)
            );
        }
    }
    if (e.children.size > 0) {
        const n = Be(t);
        if (((t = He(t)), e.children.has(n))) {
            tn(e.children.get(n), t) && e.children.delete(n);
        }
        return 0 === e.children.size;
    }
    return !0;
}
function nn(e, t, n) {
    null !== e.value
        ? n(t, e.value)
        : (function (e, t) {
              e.children.forEach((e, n) => {
                  t(n, e);
              });
          })(e, (e, i) => {
              nn(i, new We(t.toString() + "/" + e), n);
          });
}
class rn {
    constructor(e) {
        (this.collection_ = e), (this.last_ = null);
    }
    get() {
        const e = this.collection_.get(),
            t = Object.assign({}, e);
        return (
            this.last_ &&
                _e(this.last_, (e, n) => {
                    t[e] = t[e] - n;
                }),
            (this.last_ = e),
            t
        );
    }
}
class sn {
    constructor(e, t) {
        (this.server_ = t), (this.statsToReport_ = {}), (this.statsListener_ = new rn(e));
        const n = 1e4 + 2e4 * Math.random();
        ye(this.reportStats_.bind(this), Math.floor(n));
    }
    reportStats_() {
        const e = this.statsListener_.get(),
            t = {};
        let n = !1;
        _e(e, (e, i) => {
            i > 0 && I(this.statsToReport_, e) && ((t[e] = i), (n = !0));
        }),
            n && this.server_.reportStats(t),
            ye(this.reportStats_.bind(this), Math.floor(2 * Math.random() * 3e5));
    }
}
var on;
function an(e) {
    return { fromUser: !1, fromServer: !0, queryId: e, tagged: !0 };
}
!(function (e) {
    (e[(e.OVERWRITE = 0)] = "OVERWRITE"), (e[(e.MERGE = 1)] = "MERGE"), (e[(e.ACK_USER_WRITE = 2)] = "ACK_USER_WRITE"), (e[(e.LISTEN_COMPLETE = 3)] = "LISTEN_COMPLETE");
})(on || (on = {}));
class ln {
    constructor(e, t, n) {
        (this.path = e), (this.affectedTree = t), (this.revert = n), (this.type = on.ACK_USER_WRITE), (this.source = { fromUser: !0, fromServer: !1, queryId: null, tagged: !1 });
    }
    operationForChild(e) {
        if (Qe(this.path)) {
            if (null != this.affectedTree.value) return a(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths."), this;
            {
                const t = this.affectedTree.subtree(new We(e));
                return new ln(Ue(), t, this.revert);
            }
        }
        return a(Be(this.path) === e, "operationForChild called for unrelated child."), new ln(He(this.path), this.affectedTree, this.revert);
    }
}
class hn {
    constructor(e, t) {
        (this.source = e), (this.path = t), (this.type = on.LISTEN_COMPLETE);
    }
    operationForChild(e) {
        return Qe(this.path) ? new hn(this.source, Ue()) : new hn(this.source, He(this.path));
    }
}
class cn {
    constructor(e, t, n) {
        (this.source = e), (this.path = t), (this.snap = n), (this.type = on.OVERWRITE);
    }
    operationForChild(e) {
        return Qe(this.path) ? new cn(this.source, Ue(), this.snap.getImmediateChild(e)) : new cn(this.source, He(this.path), this.snap);
    }
}
class un {
    constructor(e, t, n) {
        (this.source = e), (this.path = t), (this.children = n), (this.type = on.MERGE);
    }
    operationForChild(e) {
        if (Qe(this.path)) {
            const t = this.children.subtree(new We(e));
            return t.isEmpty() ? null : t.value ? new cn(this.source, Ue(), t.value) : new un(this.source, Ue(), t);
        }
        return a(Be(this.path) === e, "Can't get a merge for a child not on the path of the operation"), new un(this.source, He(this.path), this.children);
    }
    toString() {
        return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")";
    }
}
class dn {
    constructor(e, t, n) {
        (this.node_ = e), (this.fullyInitialized_ = t), (this.filtered_ = n);
    }
    isFullyInitialized() {
        return this.fullyInitialized_;
    }
    isFiltered() {
        return this.filtered_;
    }
    isCompleteForPath(e) {
        if (Qe(e)) return this.isFullyInitialized() && !this.filtered_;
        const t = Be(e);
        return this.isCompleteForChild(t);
    }
    isCompleteForChild(e) {
        return (this.isFullyInitialized() && !this.filtered_) || this.node_.hasChild(e);
    }
    getNode() {
        return this.node_;
    }
}
class _n {
    constructor(e) {
        (this.query_ = e), (this.index_ = this.query_._queryParams.getIndex());
    }
}
function pn(e, t, n, i, r, s) {
    const o = i.filter((e) => e.type === n);
    o.sort((t, n) =>
        (function (e, t, n) {
            if (null == t.childName || null == n.childName) throw l("Should only compare child_ events.");
            const i = new rt(t.childName, t.snapshotNode),
                r = new rt(n.childName, n.snapshotNode);
            return e.index_.compare(i, r);
        })(e, t, n)
    ),
        o.forEach((n) => {
            const i = (function (e, t, n) {
                return "value" === t.type || "child_removed" === t.type || (t.prevName = n.getPredecessorChildName(t.childName, t.snapshotNode, e.index_)), t;
            })(e, n, s);
            r.forEach((r) => {
                r.respondsTo(n.type) && t.push(r.createEvent(i, e.query_));
            });
        });
}
function fn(e, t) {
    return { eventCache: e, serverCache: t };
}
function gn(e, t, n, i) {
    return fn(new dn(t, n, i), e.serverCache);
}
function mn(e, t, n, i) {
    return fn(e.eventCache, new dn(t, n, i));
}
function yn(e) {
    return e.eventCache.isFullyInitialized() ? e.eventCache.getNode() : null;
}
function vn(e) {
    return e.serverCache.isFullyInitialized() ? e.serverCache.getNode() : null;
}
let Cn;
class wn {
    constructor(e, t = (() => (Cn || (Cn = new ut(he)), Cn))()) {
        (this.value = e), (this.children = t);
    }
    static fromObject(e) {
        let t = new wn(null);
        return (
            _e(e, (e, n) => {
                t = t.set(new We(e), n);
            }),
            t
        );
    }
    isEmpty() {
        return null === this.value && this.children.isEmpty();
    }
    findRootMostMatchingPathAndValue(e, t) {
        if (null != this.value && t(this.value)) return { path: Ue(), value: this.value };
        if (Qe(e)) return null;
        {
            const n = Be(e),
                i = this.children.get(n);
            if (null !== i) {
                const r = i.findRootMostMatchingPathAndValue(He(e), t);
                if (null != r) {
                    return { path: Ke(new We(n), r.path), value: r.value };
                }
                return null;
            }
            return null;
        }
    }
    findRootMostValueAndPath(e) {
        return this.findRootMostMatchingPathAndValue(e, () => !0);
    }
    subtree(e) {
        if (Qe(e)) return this;
        {
            const t = Be(e),
                n = this.children.get(t);
            return null !== n ? n.subtree(He(e)) : new wn(null);
        }
    }
    set(e, t) {
        if (Qe(e)) return new wn(t, this.children);
        {
            const n = Be(e),
                i = (this.children.get(n) || new wn(null)).set(He(e), t),
                r = this.children.insert(n, i);
            return new wn(this.value, r);
        }
    }
    remove(e) {
        if (Qe(e)) return this.children.isEmpty() ? new wn(null) : new wn(null, this.children);
        {
            const t = Be(e),
                n = this.children.get(t);
            if (n) {
                const i = n.remove(He(e));
                let r;
                return (r = i.isEmpty() ? this.children.remove(t) : this.children.insert(t, i)), null === this.value && r.isEmpty() ? new wn(null) : new wn(this.value, r);
            }
            return this;
        }
    }
    get(e) {
        if (Qe(e)) return this.value;
        {
            const t = Be(e),
                n = this.children.get(t);
            return n ? n.get(He(e)) : null;
        }
    }
    setTree(e, t) {
        if (Qe(e)) return t;
        {
            const n = Be(e),
                i = (this.children.get(n) || new wn(null)).setTree(He(e), t);
            let r;
            return (r = i.isEmpty() ? this.children.remove(n) : this.children.insert(n, i)), new wn(this.value, r);
        }
    }
    fold(e) {
        return this.fold_(Ue(), e);
    }
    fold_(e, t) {
        const n = {};
        return (
            this.children.inorderTraversal((i, r) => {
                n[i] = r.fold_(Ke(e, i), t);
            }),
            t(e, this.value, n)
        );
    }
    findOnPath(e, t) {
        return this.findOnPath_(e, Ue(), t);
    }
    findOnPath_(e, t, n) {
        const i = !!this.value && n(t, this.value);
        if (i) return i;
        if (Qe(e)) return null;
        {
            const i = Be(e),
                r = this.children.get(i);
            return r ? r.findOnPath_(He(e), Ke(t, i), n) : null;
        }
    }
    foreachOnPath(e, t) {
        return this.foreachOnPath_(e, Ue(), t);
    }
    foreachOnPath_(e, t, n) {
        if (Qe(e)) return this;
        {
            this.value && n(t, this.value);
            const i = Be(e),
                r = this.children.get(i);
            return r ? r.foreachOnPath_(He(e), Ke(t, i), n) : new wn(null);
        }
    }
    foreach(e) {
        this.foreach_(Ue(), e);
    }
    foreach_(e, t) {
        this.children.inorderTraversal((n, i) => {
            i.foreach_(Ke(e, n), t);
        }),
            this.value && t(e, this.value);
    }
    foreachChild(e) {
        this.children.inorderTraversal((t, n) => {
            n.value && e(t, n.value);
        });
    }
}
class Tn {
    constructor(e) {
        this.writeTree_ = e;
    }
    static empty() {
        return new Tn(new wn(null));
    }
}
function bn(e, t, n) {
    if (Qe(t)) return new Tn(new wn(n));
    {
        const i = e.writeTree_.findRootMostValueAndPath(t);
        if (null != i) {
            const r = i.path;
            let s = i.value;
            const o = $e(r, t);
            return (s = s.updateChild(o, n)), new Tn(e.writeTree_.set(r, s));
        }
        {
            const i = new wn(n),
                r = e.writeTree_.setTree(t, i);
            return new Tn(r);
        }
    }
}
function En(e, t, n) {
    let i = e;
    return (
        _e(n, (e, n) => {
            i = bn(i, Ke(t, e), n);
        }),
        i
    );
}
function In(e, t) {
    if (Qe(t)) return Tn.empty();
    {
        const n = e.writeTree_.setTree(t, new wn(null));
        return new Tn(n);
    }
}
function Sn(e, t) {
    return null != kn(e, t);
}
function kn(e, t) {
    const n = e.writeTree_.findRootMostValueAndPath(t);
    return null != n ? e.writeTree_.get(n.path).getChild($e(n.path, t)) : null;
}
function Nn(e) {
    const t = [],
        n = e.writeTree_.value;
    return (
        null != n
            ? n.isLeafNode() ||
              n.forEachChild(wt, (e, n) => {
                  t.push(new rt(e, n));
              })
            : e.writeTree_.children.inorderTraversal((e, n) => {
                  null != n.value && t.push(new rt(e, n.value));
              }),
        t
    );
}
function Pn(e, t) {
    if (Qe(t)) return e;
    {
        const n = kn(e, t);
        return new Tn(null != n ? new wn(n) : e.writeTree_.subtree(t));
    }
}
function xn(e) {
    return e.writeTree_.isEmpty();
}
function Rn(e, t) {
    return An(Ue(), e.writeTree_, t);
}
function An(e, t, n) {
    if (null != t.value) return n.updateChild(e, t.value);
    {
        let i = null;
        return (
            t.children.inorderTraversal((t, r) => {
                ".priority" === t ? (a(null !== r.value, "Priority writes must always be leaf nodes"), (i = r.value)) : (n = An(Ke(e, t), r, n));
            }),
            n.getChild(e).isEmpty() || null === i || (n = n.updateChild(Ke(e, ".priority"), i)),
            n
        );
    }
}
function Dn(e, t) {
    return Yn(t, e);
}
function On(e, t) {
    const n = e.allWrites.findIndex((e) => e.writeId === t);
    a(n >= 0, "removeWrite called with nonexistent writeId.");
    const i = e.allWrites[n];
    e.allWrites.splice(n, 1);
    let r = i.visible,
        s = !1,
        o = e.allWrites.length - 1;
    for (; r && o >= 0; ) {
        const t = e.allWrites[o];
        t.visible && (o >= n && Ln(t, i.path) ? (r = !1) : Xe(i.path, t.path) && (s = !0)), o--;
    }
    if (r) {
        if (s)
            return (
                (function (e) {
                    (e.visibleWrites = Mn(e.allWrites, Fn, Ue())), e.allWrites.length > 0 ? (e.lastWriteId = e.allWrites[e.allWrites.length - 1].writeId) : (e.lastWriteId = -1);
                })(e),
                !0
            );
        if (i.snap) e.visibleWrites = In(e.visibleWrites, i.path);
        else {
            _e(i.children, (t) => {
                e.visibleWrites = In(e.visibleWrites, Ke(i.path, t));
            });
        }
        return !0;
    }
    return !1;
}
function Ln(e, t) {
    if (e.snap) return Xe(e.path, t);
    for (const n in e.children) if (e.children.hasOwnProperty(n) && Xe(Ke(e.path, n), t)) return !0;
    return !1;
}
function Fn(e) {
    return e.visible;
}
function Mn(e, t, n) {
    let i = Tn.empty();
    for (let r = 0; r < e.length; ++r) {
        const s = e[r];
        if (t(s)) {
            const e = s.path;
            let t;
            if (s.snap) Xe(n, e) ? ((t = $e(n, e)), (i = bn(i, t, s.snap))) : Xe(e, n) && ((t = $e(e, n)), (i = bn(i, Ue(), s.snap.getChild(t))));
            else {
                if (!s.children) throw l("WriteRecord should have .snap or .children");
                if (Xe(n, e)) (t = $e(n, e)), (i = En(i, t, s.children));
                else if (Xe(e, n))
                    if (((t = $e(e, n)), Qe(t))) i = En(i, Ue(), s.children);
                    else {
                        const e = S(s.children, Be(t));
                        if (e) {
                            const n = e.getChild(He(t));
                            i = bn(i, Ue(), n);
                        }
                    }
            }
        }
    }
    return i;
}
function qn(e, t, n, i, r) {
    if (i || r) {
        const s = Pn(e.visibleWrites, t);
        if (!r && xn(s)) return n;
        if (r || null != n || Sn(s, Ue())) {
            const s = function (e) {
                return (e.visible || r) && (!i || !~i.indexOf(e.writeId)) && (Xe(e.path, t) || Xe(t, e.path));
            };
            return Rn(Mn(e.allWrites, s, t), n || Pt.EMPTY_NODE);
        }
        return null;
    }
    {
        const i = kn(e.visibleWrites, t);
        if (null != i) return i;
        {
            const i = Pn(e.visibleWrites, t);
            if (xn(i)) return n;
            if (null != n || Sn(i, Ue())) {
                return Rn(i, n || Pt.EMPTY_NODE);
            }
            return null;
        }
    }
}
function Wn(e, t, n, i) {
    return qn(e.writeTree, e.treePath, t, n, i);
}
function Un(e, t) {
    return (function (e, t, n) {
        let i = Pt.EMPTY_NODE;
        const r = kn(e.visibleWrites, t);
        if (r)
            return (
                r.isLeafNode() ||
                    r.forEachChild(wt, (e, t) => {
                        i = i.updateImmediateChild(e, t);
                    }),
                i
            );
        if (n) {
            const r = Pn(e.visibleWrites, t);
            return (
                n.forEachChild(wt, (e, t) => {
                    const n = Rn(Pn(r, new We(e)), t);
                    i = i.updateImmediateChild(e, n);
                }),
                Nn(r).forEach((e) => {
                    i = i.updateImmediateChild(e.name, e.node);
                }),
                i
            );
        }
        return (
            Nn(Pn(e.visibleWrites, t)).forEach((e) => {
                i = i.updateImmediateChild(e.name, e.node);
            }),
            i
        );
    })(e.writeTree, e.treePath, t);
}
function Bn(e, t, n, i) {
    return (function (e, t, n, i, r) {
        a(i || r, "Either existingEventSnap or existingServerSnap must exist");
        const s = Ke(t, n);
        if (Sn(e.visibleWrites, s)) return null;
        {
            const t = Pn(e.visibleWrites, s);
            return xn(t) ? r.getChild(n) : Rn(t, r.getChild(n));
        }
    })(e.writeTree, e.treePath, t, n, i);
}
function jn(e, t) {
    return (function (e, t) {
        return kn(e.visibleWrites, t);
    })(e.writeTree, Ke(e.treePath, t));
}
function Hn(e, t, n, i, r, s) {
    return (function (e, t, n, i, r, s, o) {
        let a;
        const l = Pn(e.visibleWrites, t),
            h = kn(l, Ue());
        if (null != h) a = h;
        else {
            if (null == n) return [];
            a = Rn(l, n);
        }
        if (((a = a.withIndex(o)), a.isEmpty() || a.isLeafNode())) return [];
        {
            const e = [],
                t = o.getCompare(),
                n = s ? a.getReverseIteratorFrom(i, o) : a.getIteratorFrom(i, o);
            let l = n.getNext();
            for (; l && e.length < r; ) 0 !== t(l, i) && e.push(l), (l = n.getNext());
            return e;
        }
    })(e.writeTree, e.treePath, t, n, i, r, s);
}
function Vn(e, t, n) {
    return (function (e, t, n, i) {
        const r = Ke(t, n),
            s = kn(e.visibleWrites, r);
        if (null != s) return s;
        if (i.isCompleteForChild(n)) return Rn(Pn(e.visibleWrites, r), i.getNode().getImmediateChild(n));
        return null;
    })(e.writeTree, e.treePath, t, n);
}
function zn(e, t) {
    return Yn(Ke(e.treePath, t), e.writeTree);
}
function Yn(e, t) {
    return { treePath: e, writeTree: t };
}
class Kn {
    constructor() {
        this.changeMap = new Map();
    }
    trackChildChange(e) {
        const t = e.type,
            n = e.childName;
        a("child_added" === t || "child_changed" === t || "child_removed" === t, "Only child changes supported for tracking"), a(".priority" !== n, "Only non-priority child changes can be tracked.");
        const i = this.changeMap.get(n);
        if (i) {
            const r = i.type;
            if ("child_added" === t && "child_removed" === r) this.changeMap.set(n, Bt(n, e.snapshotNode, i.snapshotNode));
            else if ("child_removed" === t && "child_added" === r) this.changeMap.delete(n);
            else if ("child_removed" === t && "child_changed" === r) this.changeMap.set(n, Ut(n, i.oldSnap));
            else if ("child_changed" === t && "child_added" === r) this.changeMap.set(n, Wt(n, e.snapshotNode));
            else {
                if ("child_changed" !== t || "child_changed" !== r) throw l("Illegal combination of changes: " + e + " occurred after " + i);
                this.changeMap.set(n, Bt(n, e.snapshotNode, i.oldSnap));
            }
        } else this.changeMap.set(n, e);
    }
    getChanges() {
        return Array.from(this.changeMap.values());
    }
}
const Qn = new (class {
    getCompleteChild(e) {
        return null;
    }
    getChildAfterChild(e, t, n) {
        return null;
    }
})();
class $n {
    constructor(e, t, n = null) {
        (this.writes_ = e), (this.viewCache_ = t), (this.optCompleteServerCache_ = n);
    }
    getCompleteChild(e) {
        const t = this.viewCache_.eventCache;
        if (t.isCompleteForChild(e)) return t.getNode().getImmediateChild(e);
        {
            const t = null != this.optCompleteServerCache_ ? new dn(this.optCompleteServerCache_, !0, !1) : this.viewCache_.serverCache;
            return Vn(this.writes_, e, t);
        }
    }
    getChildAfterChild(e, t, n) {
        const i = null != this.optCompleteServerCache_ ? this.optCompleteServerCache_ : vn(this.viewCache_),
            r = Hn(this.writes_, i, t, 1, n, e);
        return 0 === r.length ? null : r[0];
    }
}
function Gn(e, t, n, i, r) {
    const s = new Kn();
    let o, h;
    if (n.type === on.OVERWRITE) {
        const l = n;
        l.source.fromUser ? (o = Zn(e, t, l.path, l.snap, i, r, s)) : (a(l.source.fromServer, "Unknown source."), (h = l.source.tagged || (t.serverCache.isFiltered() && !Qe(l.path))), (o = Xn(e, t, l.path, l.snap, i, r, h, s)));
    } else if (n.type === on.MERGE) {
        const l = n;
        l.source.fromUser
            ? (o = (function (e, t, n, i, r, s, o) {
                  let a = t;
                  return (
                      i.foreach((i, l) => {
                          const h = Ke(n, i);
                          ei(t, Be(h)) && (a = Zn(e, a, h, l, r, s, o));
                      }),
                      i.foreach((i, l) => {
                          const h = Ke(n, i);
                          ei(t, Be(h)) || (a = Zn(e, a, h, l, r, s, o));
                      }),
                      a
                  );
              })(e, t, l.path, l.children, i, r, s))
            : (a(l.source.fromServer, "Unknown source."), (h = l.source.tagged || t.serverCache.isFiltered()), (o = ni(e, t, l.path, l.children, i, r, h, s)));
    } else if (n.type === on.ACK_USER_WRITE) {
        const l = n;
        o = l.revert
            ? (function (e, t, n, i, r, s) {
                  let o;
                  if (null != jn(i, n)) return t;
                  {
                      const l = new $n(i, t, r),
                          h = t.eventCache.getNode();
                      let c;
                      if (Qe(n) || ".priority" === Be(n)) {
                          let n;
                          if (t.serverCache.isFullyInitialized()) n = Wn(i, vn(t));
                          else {
                              const e = t.serverCache.getNode();
                              a(e instanceof Pt, "serverChildren would be complete if leaf node"), (n = Un(i, e));
                          }
                          (n = n), (c = e.filter.updateFullNode(h, n, s));
                      } else {
                          const r = Be(n);
                          let a = Vn(i, r, t.serverCache);
                          null == a && t.serverCache.isCompleteForChild(r) && (a = h.getImmediateChild(r)),
                              (c = null != a ? e.filter.updateChild(h, r, a, He(n), l, s) : t.eventCache.getNode().hasChild(r) ? e.filter.updateChild(h, r, Pt.EMPTY_NODE, He(n), l, s) : h),
                              c.isEmpty() && t.serverCache.isFullyInitialized() && ((o = Wn(i, vn(t))), o.isLeafNode() && (c = e.filter.updateFullNode(c, o, s)));
                      }
                      return (o = t.serverCache.isFullyInitialized() || null != jn(i, Ue())), gn(t, c, o, e.filter.filtersNodes());
                  }
              })(e, t, l.path, i, r, s)
            : (function (e, t, n, i, r, s, o) {
                  if (null != jn(r, n)) return t;
                  const a = t.serverCache.isFiltered(),
                      l = t.serverCache;
                  if (null != i.value) {
                      if ((Qe(n) && l.isFullyInitialized()) || l.isCompleteForPath(n)) return Xn(e, t, n, l.getNode().getChild(n), r, s, a, o);
                      if (Qe(n)) {
                          let i = new wn(null);
                          return (
                              l.getNode().forEachChild(lt, (e, t) => {
                                  i = i.set(new We(e), t);
                              }),
                              ni(e, t, n, i, r, s, a, o)
                          );
                      }
                      return t;
                  }
                  {
                      let h = new wn(null);
                      return (
                          i.foreach((e, t) => {
                              const i = Ke(n, e);
                              l.isCompleteForPath(i) && (h = h.set(e, l.getNode().getChild(i)));
                          }),
                          ni(e, t, n, h, r, s, a, o)
                      );
                  }
              })(e, t, l.path, l.affectedTree, i, r, s);
    } else {
        if (n.type !== on.LISTEN_COMPLETE) throw l("Unknown operation type: " + n.type);
        o = (function (e, t, n, i, r) {
            const s = t.serverCache,
                o = mn(t, s.getNode(), s.isFullyInitialized() || Qe(n), s.isFiltered());
            return Jn(e, o, n, i, Qn, r);
        })(e, t, n.path, i, s);
    }
    const c = s.getChanges();
    return (
        (function (e, t, n) {
            const i = t.eventCache;
            if (i.isFullyInitialized()) {
                const r = i.getNode().isLeafNode() || i.getNode().isEmpty(),
                    s = yn(e);
                (n.length > 0 || !e.eventCache.isFullyInitialized() || (r && !i.getNode().equals(s)) || !i.getNode().getPriority().equals(s.getPriority())) && n.push(qt(yn(t)));
            }
        })(t, o, c),
        { viewCache: o, changes: c }
    );
}
function Jn(e, t, n, i, r, s) {
    const o = t.eventCache;
    if (null != jn(i, n)) return t;
    {
        let l, h;
        if (Qe(n))
            if ((a(t.serverCache.isFullyInitialized(), "If change path is empty, we must have complete server data"), t.serverCache.isFiltered())) {
                const n = vn(t),
                    r = Un(i, n instanceof Pt ? n : Pt.EMPTY_NODE);
                l = e.filter.updateFullNode(t.eventCache.getNode(), r, s);
            } else {
                const n = Wn(i, vn(t));
                l = e.filter.updateFullNode(t.eventCache.getNode(), n, s);
            }
        else {
            const c = Be(n);
            if (".priority" === c) {
                a(1 === je(n), "Can't have a priority with additional path components");
                const r = o.getNode();
                h = t.serverCache.getNode();
                const s = Bn(i, n, r, h);
                l = null != s ? e.filter.updatePriority(r, s) : o.getNode();
            } else {
                const a = He(n);
                let u;
                if (o.isCompleteForChild(c)) {
                    h = t.serverCache.getNode();
                    const e = Bn(i, n, o.getNode(), h);
                    u = null != e ? o.getNode().getImmediateChild(c).updateChild(a, e) : o.getNode().getImmediateChild(c);
                } else u = Vn(i, c, t.serverCache);
                l = null != u ? e.filter.updateChild(o.getNode(), c, u, a, r, s) : o.getNode();
            }
        }
        return gn(t, l, o.isFullyInitialized() || Qe(n), e.filter.filtersNodes());
    }
}
function Xn(e, t, n, i, r, s, o, a) {
    const l = t.serverCache;
    let h;
    const c = o ? e.filter : e.filter.getIndexedFilter();
    if (Qe(n)) h = c.updateFullNode(l.getNode(), i, null);
    else if (c.filtersNodes() && !l.isFiltered()) {
        const e = l.getNode().updateChild(n, i);
        h = c.updateFullNode(l.getNode(), e, null);
    } else {
        const e = Be(n);
        if (!l.isCompleteForPath(n) && je(n) > 1) return t;
        const r = He(n),
            s = l.getNode().getImmediateChild(e).updateChild(r, i);
        h = ".priority" === e ? c.updatePriority(l.getNode(), s) : c.updateChild(l.getNode(), e, s, r, Qn, null);
    }
    const u = mn(t, h, l.isFullyInitialized() || Qe(n), c.filtersNodes());
    return Jn(e, u, n, r, new $n(r, u, s), a);
}
function Zn(e, t, n, i, r, s, o) {
    const a = t.eventCache;
    let l, h;
    const c = new $n(r, t, s);
    if (Qe(n)) (h = e.filter.updateFullNode(t.eventCache.getNode(), i, o)), (l = gn(t, h, !0, e.filter.filtersNodes()));
    else {
        const r = Be(n);
        if (".priority" === r) (h = e.filter.updatePriority(t.eventCache.getNode(), i)), (l = gn(t, h, a.isFullyInitialized(), a.isFiltered()));
        else {
            const s = He(n),
                h = a.getNode().getImmediateChild(r);
            let u;
            if (Qe(s)) u = i;
            else {
                const e = c.getCompleteChild(r);
                u = null != e ? (".priority" === Ve(s) && e.getChild(Ye(s)).isEmpty() ? e : e.updateChild(s, i)) : Pt.EMPTY_NODE;
            }
            if (h.equals(u)) l = t;
            else {
                l = gn(t, e.filter.updateChild(a.getNode(), r, u, s, c, o), a.isFullyInitialized(), e.filter.filtersNodes());
            }
        }
    }
    return l;
}
function ei(e, t) {
    return e.eventCache.isCompleteForChild(t);
}
function ti(e, t, n) {
    return (
        n.foreach((e, n) => {
            t = t.updateChild(e, n);
        }),
        t
    );
}
function ni(e, t, n, i, r, s, o, a) {
    if (t.serverCache.getNode().isEmpty() && !t.serverCache.isFullyInitialized()) return t;
    let l,
        h = t;
    l = Qe(n) ? i : new wn(null).setTree(n, i);
    const c = t.serverCache.getNode();
    return (
        l.children.inorderTraversal((n, i) => {
            if (c.hasChild(n)) {
                const l = ti(0, t.serverCache.getNode().getImmediateChild(n), i);
                h = Xn(e, h, new We(n), l, r, s, o, a);
            }
        }),
        l.children.inorderTraversal((n, i) => {
            const l = !t.serverCache.isCompleteForChild(n) && null === i.value;
            if (!c.hasChild(n) && !l) {
                const l = ti(0, t.serverCache.getNode().getImmediateChild(n), i);
                h = Xn(e, h, new We(n), l, r, s, o, a);
            }
        }),
        h
    );
}
class ii {
    constructor(e, t) {
        (this.query_ = e), (this.eventRegistrations_ = []);
        const n = this.query_._queryParams,
            i = new jt(n.getIndex()),
            r = (s = n).loadsAllData() ? new jt(s.getIndex()) : s.hasLimit() ? new Vt(s) : new Ht(s);
        var s;
        this.processor_ = (function (e) {
            return { filter: e };
        })(r);
        const o = t.serverCache,
            a = t.eventCache,
            l = i.updateFullNode(Pt.EMPTY_NODE, o.getNode(), null),
            h = r.updateFullNode(Pt.EMPTY_NODE, a.getNode(), null),
            c = new dn(l, o.isFullyInitialized(), i.filtersNodes()),
            u = new dn(h, a.isFullyInitialized(), r.filtersNodes());
        (this.viewCache_ = fn(u, c)), (this.eventGenerator_ = new _n(this.query_));
    }
    get query() {
        return this.query_;
    }
}
function ri(e, t) {
    const n = vn(e.viewCache_);
    return n && (e.query._queryParams.loadsAllData() || (!Qe(t) && !n.getImmediateChild(Be(t)).isEmpty())) ? n.getChild(t) : null;
}
function si(e) {
    return 0 === e.eventRegistrations_.length;
}
function oi(e, t, n) {
    const i = [];
    if (n) {
        a(null == t, "A cancel should cancel all event registrations.");
        const r = e.query._path;
        e.eventRegistrations_.forEach((e) => {
            const t = e.createCancelEvent(n, r);
            t && i.push(t);
        });
    }
    if (t) {
        let n = [];
        for (let i = 0; i < e.eventRegistrations_.length; ++i) {
            const r = e.eventRegistrations_[i];
            if (r.matches(t)) {
                if (t.hasAnyCallback()) {
                    n = n.concat(e.eventRegistrations_.slice(i + 1));
                    break;
                }
            } else n.push(r);
        }
        e.eventRegistrations_ = n;
    } else e.eventRegistrations_ = [];
    return i;
}
function ai(e, t, n, i) {
    t.type === on.MERGE && null !== t.source.queryId && (a(vn(e.viewCache_), "We should always have a full cache before handling merges"), a(yn(e.viewCache_), "Missing event cache, even though we have a server cache"));
    const r = e.viewCache_,
        s = Gn(e.processor_, r, t, n, i);
    var o, l;
    return (
        (o = e.processor_),
        (l = s.viewCache),
        a(l.eventCache.getNode().isIndexed(o.filter.getIndex()), "Event snap not indexed"),
        a(l.serverCache.getNode().isIndexed(o.filter.getIndex()), "Server snap not indexed"),
        a(s.viewCache.serverCache.isFullyInitialized() || !r.serverCache.isFullyInitialized(), "Once a server snap is complete, it should never go back"),
        (e.viewCache_ = s.viewCache),
        li(e, s.changes, s.viewCache.eventCache.getNode(), null)
    );
}
function li(e, t, n, i) {
    const r = i ? [i] : e.eventRegistrations_;
    return (function (e, t, n, i) {
        const r = [],
            s = [];
        return (
            t.forEach((t) => {
                var n;
                "child_changed" === t.type && e.index_.indexedValueChanged(t.oldSnap, t.snapshotNode) && s.push(((n = t.childName), { type: "child_moved", snapshotNode: t.snapshotNode, childName: n }));
            }),
            pn(e, r, "child_removed", t, i, n),
            pn(e, r, "child_added", t, i, n),
            pn(e, r, "child_moved", s, i, n),
            pn(e, r, "child_changed", t, i, n),
            pn(e, r, "value", t, i, n),
            r
        );
    })(e.eventGenerator_, t, n, r);
}
let hi, ci;
class ui {
    constructor() {
        this.views = new Map();
    }
}
function di(e, t, n, i) {
    const r = t.source.queryId;
    if (null !== r) {
        const s = e.views.get(r);
        return a(null != s, "SyncTree gave us an op for an invalid query."), ai(s, t, n, i);
    }
    {
        let r = [];
        for (const s of e.views.values()) r = r.concat(ai(s, t, n, i));
        return r;
    }
}
function _i(e, t, n, i, r) {
    const s = t._queryIdentifier,
        o = e.views.get(s);
    if (!o) {
        let e = Wn(n, r ? i : null),
            s = !1;
        e ? (s = !0) : i instanceof Pt ? ((e = Un(n, i)), (s = !1)) : ((e = Pt.EMPTY_NODE), (s = !1));
        const o = fn(new dn(e, s, !1), new dn(i, r, !1));
        return new ii(t, o);
    }
    return o;
}
function pi(e, t, n, i, r, s) {
    const o = _i(e, t, i, r, s);
    return (
        e.views.has(t._queryIdentifier) || e.views.set(t._queryIdentifier, o),
        (function (e, t) {
            e.eventRegistrations_.push(t);
        })(o, n),
        (function (e, t) {
            const n = e.viewCache_.eventCache,
                i = [];
            n.getNode().isLeafNode() ||
                n.getNode().forEachChild(wt, (e, t) => {
                    i.push(Wt(e, t));
                });
            return n.isFullyInitialized() && i.push(qt(n.getNode())), li(e, i, n.getNode(), t);
        })(o, n)
    );
}
function fi(e, t, n, i) {
    const r = t._queryIdentifier,
        s = [];
    let o = [];
    const l = Ci(e);
    if ("default" === r) for (const [t, r] of e.views.entries()) (o = o.concat(oi(r, n, i))), si(r) && (e.views.delete(t), r.query._queryParams.loadsAllData() || s.push(r.query));
    else {
        const t = e.views.get(r);
        t && ((o = o.concat(oi(t, n, i))), si(t) && (e.views.delete(r), t.query._queryParams.loadsAllData() || s.push(t.query)));
    }
    return l && !Ci(e) && s.push(new (a(hi, "Reference.ts has not been loaded"), hi)(t._repo, t._path)), { removed: s, events: o };
}
function gi(e) {
    const t = [];
    for (const n of e.views.values()) n.query._queryParams.loadsAllData() || t.push(n);
    return t;
}
function mi(e, t) {
    let n = null;
    for (const i of e.views.values()) n = n || ri(i, t);
    return n;
}
function yi(e, t) {
    if (t._queryParams.loadsAllData()) return wi(e);
    {
        const n = t._queryIdentifier;
        return e.views.get(n);
    }
}
function vi(e, t) {
    return null != yi(e, t);
}
function Ci(e) {
    return null != wi(e);
}
function wi(e) {
    for (const t of e.views.values()) if (t.query._queryParams.loadsAllData()) return t;
    return null;
}
let Ti = 1;
class bi {
    constructor(e) {
        (this.listenProvider_ = e), (this.syncPointTree_ = new wn(null)), (this.pendingWriteTree_ = { visibleWrites: Tn.empty(), allWrites: [], lastWriteId: -1 }), (this.tagToQueryMap = new Map()), (this.queryToTagMap = new Map());
    }
}
function Ei(e, t, n, i, r) {
    return (
        (function (e, t, n, i, r) {
            a(i > e.lastWriteId, "Stacking an older write on top of newer ones"),
                void 0 === r && (r = !0),
                e.allWrites.push({ path: t, snap: n, writeId: i, visible: r }),
                r && (e.visibleWrites = bn(e.visibleWrites, t, n)),
                (e.lastWriteId = i);
        })(e.pendingWriteTree_, t, n, i, r),
        r ? Di(e, new cn({ fromUser: !0, fromServer: !1, queryId: null, tagged: !1 }, t, n)) : []
    );
}
function Ii(e, t, n, i) {
    !(function (e, t, n, i) {
        a(i > e.lastWriteId, "Stacking an older merge on top of newer ones"), e.allWrites.push({ path: t, children: n, writeId: i, visible: !0 }), (e.visibleWrites = En(e.visibleWrites, t, n)), (e.lastWriteId = i);
    })(e.pendingWriteTree_, t, n, i);
    const r = wn.fromObject(n);
    return Di(e, new un({ fromUser: !0, fromServer: !1, queryId: null, tagged: !1 }, t, r));
}
function Si(e, t, n = !1) {
    const i = (function (e, t) {
        for (let n = 0; n < e.allWrites.length; n++) {
            const i = e.allWrites[n];
            if (i.writeId === t) return i;
        }
        return null;
    })(e.pendingWriteTree_, t);
    if (On(e.pendingWriteTree_, t)) {
        let t = new wn(null);
        return (
            null != i.snap
                ? (t = t.set(Ue(), !0))
                : _e(i.children, (e) => {
                      t = t.set(new We(e), !0);
                  }),
            Di(e, new ln(i.path, t, n))
        );
    }
    return [];
}
function ki(e, t, n) {
    return Di(e, new cn({ fromUser: !1, fromServer: !0, queryId: null, tagged: !1 }, t, n));
}
function Ni(e, t, n, i, r = !1) {
    const s = t._path,
        o = e.syncPointTree_.get(s);
    let a = [];
    if (o && ("default" === t._queryIdentifier || vi(o, t))) {
        const l = fi(o, t, n, i);
        0 === o.views.size && (e.syncPointTree_ = e.syncPointTree_.remove(s));
        const h = l.removed;
        if (((a = l.events), !r)) {
            const n = -1 !== h.findIndex((e) => e._queryParams.loadsAllData()),
                r = e.syncPointTree_.findOnPath(s, (e, t) => Ci(t));
            if (n && !r) {
                const t = e.syncPointTree_.subtree(s);
                if (!t.isEmpty()) {
                    const n = (function (e) {
                        return e.fold((e, t, n) => {
                            if (t && Ci(t)) {
                                return [wi(t)];
                            }
                            {
                                let e = [];
                                return (
                                    t && (e = gi(t)),
                                    _e(n, (t, n) => {
                                        e = e.concat(n);
                                    }),
                                    e
                                );
                            }
                        });
                    })(t);
                    for (let t = 0; t < n.length; ++t) {
                        const i = n[t],
                            r = i.query,
                            s = Fi(e, i);
                        e.listenProvider_.startListening(ji(r), Mi(e, r), s.hashFn, s.onComplete);
                    }
                }
            }
            if (!r && h.length > 0 && !i)
                if (n) {
                    const n = null;
                    e.listenProvider_.stopListening(ji(t), n);
                } else
                    h.forEach((t) => {
                        const n = e.queryToTagMap.get(qi(t));
                        e.listenProvider_.stopListening(ji(t), n);
                    });
        }
        !(function (e, t) {
            for (let n = 0; n < t.length; ++n) {
                const i = t[n];
                if (!i._queryParams.loadsAllData()) {
                    const t = qi(i),
                        n = e.queryToTagMap.get(t);
                    e.queryToTagMap.delete(t), e.tagToQueryMap.delete(n);
                }
            }
        })(e, h);
    }
    return a;
}
function Pi(e, t, n, i) {
    const r = Wi(e, i);
    if (null != r) {
        const i = Ui(r),
            s = i.path,
            o = i.queryId,
            a = $e(s, t);
        return Bi(e, s, new cn(an(o), a, n));
    }
    return [];
}
function xi(e, t, n, i = !1) {
    const r = t._path;
    let s = null,
        o = !1;
    e.syncPointTree_.foreachOnPath(r, (e, t) => {
        const n = $e(e, r);
        (s = s || mi(t, n)), (o = o || Ci(t));
    });
    let l,
        h = e.syncPointTree_.get(r);
    if ((h ? ((o = o || Ci(h)), (s = s || mi(h, Ue()))) : ((h = new ui()), (e.syncPointTree_ = e.syncPointTree_.set(r, h))), null != s)) l = !0;
    else {
        (l = !1), (s = Pt.EMPTY_NODE);
        e.syncPointTree_.subtree(r).foreachChild((e, t) => {
            const n = mi(t, Ue());
            n && (s = s.updateImmediateChild(e, n));
        });
    }
    const c = vi(h, t);
    if (!c && !t._queryParams.loadsAllData()) {
        const n = qi(t);
        a(!e.queryToTagMap.has(n), "View does not exist, but we have a tag");
        const i = Ti++;
        e.queryToTagMap.set(n, i), e.tagToQueryMap.set(i, n);
    }
    let u = pi(h, t, n, Dn(e.pendingWriteTree_, r), s, l);
    if (!c && !o && !i) {
        const n = yi(h, t);
        u = u.concat(
            (function (e, t, n) {
                const i = t._path,
                    r = Mi(e, t),
                    s = Fi(e, n),
                    o = e.listenProvider_.startListening(ji(t), r, s.hashFn, s.onComplete),
                    l = e.syncPointTree_.subtree(i);
                if (r) a(!Ci(l.value), "If we're adding a query, it shouldn't be shadowed");
                else {
                    const t = l.fold((e, t, n) => {
                        if (!Qe(e) && t && Ci(t)) return [wi(t).query];
                        {
                            let e = [];
                            return (
                                t && (e = e.concat(gi(t).map((e) => e.query))),
                                _e(n, (t, n) => {
                                    e = e.concat(n);
                                }),
                                e
                            );
                        }
                    });
                    for (let n = 0; n < t.length; ++n) {
                        const i = t[n];
                        e.listenProvider_.stopListening(ji(i), Mi(e, i));
                    }
                }
                return o;
            })(e, t, n)
        );
    }
    return u;
}
function Ri(e, t, n) {
    const i = e.pendingWriteTree_,
        r = e.syncPointTree_.findOnPath(t, (e, n) => {
            const i = mi(n, $e(e, t));
            if (i) return i;
        });
    return qn(i, t, r, n, !0);
}
function Ai(e, t) {
    const n = t._path;
    let i = null;
    e.syncPointTree_.foreachOnPath(n, (e, t) => {
        const r = $e(e, n);
        i = i || mi(t, r);
    });
    let r = e.syncPointTree_.get(n);
    r ? (i = i || mi(r, Ue())) : ((r = new ui()), (e.syncPointTree_ = e.syncPointTree_.set(n, r)));
    const s = null != i,
        o = s ? new dn(i, !0, !1) : null;
    return (function (e) {
        return yn(e.viewCache_);
    })(_i(r, t, Dn(e.pendingWriteTree_, t._path), s ? o.getNode() : Pt.EMPTY_NODE, s));
}
function Di(e, t) {
    return Oi(t, e.syncPointTree_, null, Dn(e.pendingWriteTree_, Ue()));
}
function Oi(e, t, n, i) {
    if (Qe(e.path)) return Li(e, t, n, i);
    {
        const r = t.get(Ue());
        null == n && null != r && (n = mi(r, Ue()));
        let s = [];
        const o = Be(e.path),
            a = e.operationForChild(o),
            l = t.children.get(o);
        if (l && a) {
            const e = n ? n.getImmediateChild(o) : null,
                t = zn(i, o);
            s = s.concat(Oi(a, l, e, t));
        }
        return r && (s = s.concat(di(r, e, i, n))), s;
    }
}
function Li(e, t, n, i) {
    const r = t.get(Ue());
    null == n && null != r && (n = mi(r, Ue()));
    let s = [];
    return (
        t.children.inorderTraversal((t, r) => {
            const o = n ? n.getImmediateChild(t) : null,
                a = zn(i, t),
                l = e.operationForChild(t);
            l && (s = s.concat(Li(l, r, o, a)));
        }),
        r && (s = s.concat(di(r, e, i, n))),
        s
    );
}
function Fi(e, t) {
    const n = t.query,
        i = Mi(e, n);
    return {
        hashFn: () => {
            const e =
                (function (e) {
                    return e.viewCache_.serverCache.getNode();
                })(t) || Pt.EMPTY_NODE;
            return e.hash();
        },
        onComplete: (t) => {
            if ("ok" === t)
                return i
                    ? (function (e, t, n) {
                          const i = Wi(e, n);
                          if (i) {
                              const n = Ui(i),
                                  r = n.path,
                                  s = n.queryId,
                                  o = $e(r, t);
                              return Bi(e, r, new hn(an(s), o));
                          }
                          return [];
                      })(e, n._path, i)
                    : (function (e, t) {
                          return Di(e, new hn({ fromUser: !1, fromServer: !0, queryId: null, tagged: !1 }, t));
                      })(e, n._path);
            {
                const i = (function (e, t) {
                    let n = "Unknown Error";
                    "too_big" === e
                        ? (n = "The data requested exceeds the maximum size that can be accessed with a single request.")
                        : "permission_denied" === e
                        ? (n = "Client doesn't have permission to access the desired data.")
                        : "unavailable" === e && (n = "The service is unavailable");
                    const i = new Error(e + " at " + t._path.toString() + ": " + n);
                    return (i.code = e.toUpperCase()), i;
                })(t, n);
                return Ni(e, n, null, i);
            }
        },
    };
}
function Mi(e, t) {
    const n = qi(t);
    return e.queryToTagMap.get(n);
}
function qi(e) {
    return e._path.toString() + "$" + e._queryIdentifier;
}
function Wi(e, t) {
    return e.tagToQueryMap.get(t);
}
function Ui(e) {
    const t = e.indexOf("$");
    return a(-1 !== t && t < e.length - 1, "Bad queryKey."), { queryId: e.substr(t + 1), path: new We(e.substr(0, t)) };
}
function Bi(e, t, n) {
    const i = e.syncPointTree_.get(t);
    a(i, "Missing sync point for query tag that we're tracking");
    return di(i, n, Dn(e.pendingWriteTree_, t), null);
}
function ji(e) {
    return e._queryParams.loadsAllData() && !e._queryParams.isDefault() ? new (a(ci, "Reference.ts has not been loaded"), ci)(e._repo, e._path) : e;
}
class Hi {
    constructor(e) {
        this.node_ = e;
    }
    getImmediateChild(e) {
        const t = this.node_.getImmediateChild(e);
        return new Hi(t);
    }
    node() {
        return this.node_;
    }
}
class Vi {
    constructor(e, t) {
        (this.syncTree_ = e), (this.path_ = t);
    }
    getImmediateChild(e) {
        const t = Ke(this.path_, e);
        return new Vi(this.syncTree_, t);
    }
    node() {
        return Ri(this.syncTree_, this.path_);
    }
}
const zi = function (e, t, n) {
        return e && "object" == typeof e
            ? (a(".sv" in e, "Unexpected leaf node or priority contents"),
              "string" == typeof e[".sv"] ? Yi(e[".sv"], t, n) : "object" == typeof e[".sv"] ? Ki(e[".sv"], t) : void a(!1, "Unexpected server value: " + JSON.stringify(e, null, 2)))
            : e;
    },
    Yi = function (e, t, n) {
        if ("timestamp" === e) return n.timestamp;
        a(!1, "Unexpected server value: " + e);
    },
    Ki = function (e, t, n) {
        e.hasOwnProperty("increment") || a(!1, "Unexpected server value: " + JSON.stringify(e, null, 2));
        const i = e.increment;
        "number" != typeof i && a(!1, "Unexpected increment value: " + i);
        const r = t.node();
        if ((a(null != r, "Expected ChildrenNode.EMPTY_NODE for nulls"), !r.isLeafNode())) return i;
        const s = r.getValue();
        return "number" != typeof s ? i : s + i;
    },
    Qi = function (e, t, n, i) {
        return Gi(t, new Vi(n, e), i);
    },
    $i = function (e, t, n) {
        return Gi(e, new Hi(t), n);
    };
function Gi(e, t, n) {
    const i = e.getPriority().val(),
        r = zi(i, t.getImmediateChild(".priority"), n);
    let s;
    if (e.isLeafNode()) {
        const i = e,
            s = zi(i.getValue(), t, n);
        return s !== i.getValue() || r !== i.getPriority().val() ? new Ct(s, Rt(r)) : e;
    }
    {
        const i = e;
        return (
            (s = i),
            r !== i.getPriority().val() && (s = s.updatePriority(new Ct(r))),
            i.forEachChild(wt, (e, i) => {
                const r = Gi(i, t.getImmediateChild(e), n);
                r !== i && (s = s.updateImmediateChild(e, r));
            }),
            s
        );
    }
}
class Ji {
    constructor(e = "", t = null, n = { children: {}, childCount: 0 }) {
        (this.name = e), (this.parent = t), (this.node = n);
    }
}
function Xi(e, t) {
    let n = t instanceof We ? t : new We(t),
        i = e,
        r = Be(n);
    for (; null !== r; ) {
        const e = S(i.node.children, r) || { children: {}, childCount: 0 };
        (i = new Ji(r, i, e)), (n = He(n)), (r = Be(n));
    }
    return i;
}
function Zi(e) {
    return e.node.value;
}
function er(e, t) {
    (e.node.value = t), sr(e);
}
function tr(e) {
    return e.node.childCount > 0;
}
function nr(e, t) {
    _e(e.node.children, (n, i) => {
        t(new Ji(n, e, i));
    });
}
function ir(e, t, n, i) {
    n && !i && t(e),
        nr(e, (e) => {
            ir(e, t, !0, i);
        }),
        n && i && t(e);
}
function rr(e) {
    return new We(null === e.parent ? e.name : rr(e.parent) + "/" + e.name);
}
function sr(e) {
    null !== e.parent &&
        (function (e, t, n) {
            const i = (function (e) {
                    return void 0 === Zi(e) && !tr(e);
                })(n),
                r = I(e.node.children, t);
            i && r ? (delete e.node.children[t], e.node.childCount--, sr(e)) : i || r || ((e.node.children[t] = n.node), e.node.childCount++, sr(e));
        })(e.parent, e.name, e);
}
const or = /[\[\].#$\/\u0000-\u001F\u007F]/,
    ar = /[\[\].#$\u0000-\u001F\u007F]/,
    lr = function (e) {
        return "string" == typeof e && 0 !== e.length && !or.test(e);
    },
    hr = function (e) {
        return "string" == typeof e && 0 !== e.length && !ar.test(e);
    },
    cr = function (e) {
        return null === e || "string" == typeof e || ("number" == typeof e && !se(e)) || (e && "object" == typeof e && I(e, ".sv"));
    },
    ur = function (e, t, n, i) {
        (i && void 0 === t) || dr(x(e, "value"), t, n);
    },
    dr = function (e, t, n) {
        const i = n instanceof We ? new Ze(n, e) : n;
        if (void 0 === t) throw new Error(e + "contains undefined " + tt(i));
        if ("function" == typeof t) throw new Error(e + "contains a function " + tt(i) + " with contents = " + t.toString());
        if (se(t)) throw new Error(e + "contains " + t.toString() + " " + tt(i));
        if ("string" == typeof t && t.length > 10485760 / 3 && R(t) > 10485760) throw new Error(e + "contains a string greater than 10485760 utf8 bytes " + tt(i) + " ('" + t.substring(0, 50) + "...')");
        if (t && "object" == typeof t) {
            let n = !1,
                r = !1;
            if (
                (_e(t, (t, s) => {
                    if (".value" === t) n = !0;
                    else if (".priority" !== t && ".sv" !== t && ((r = !0), !lr(t)))
                        throw new Error(e + " contains an invalid key (" + t + ") " + tt(i) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
                    !(function (e, t) {
                        e.parts_.length > 0 && (e.byteLength_ += 1), e.parts_.push(t), (e.byteLength_ += R(t)), et(e);
                    })(i, t),
                        dr(e, s, i),
                        (function (e) {
                            const t = e.parts_.pop();
                            (e.byteLength_ -= R(t)), e.parts_.length > 0 && (e.byteLength_ -= 1);
                        })(i);
                }),
                n && r)
            )
                throw new Error(e + ' contains ".value" child ' + tt(i) + " in addition to actual children.");
        }
    },
    _r = function (e, t, n, i) {
        if (i && void 0 === t) return;
        const r = x(e, "values");
        if (!t || "object" != typeof t || Array.isArray(t)) throw new Error(r + " must be an object containing the children to replace.");
        const s = [];
        _e(t, (e, t) => {
            const i = new We(e);
            if ((dr(r, t, Ke(n, i)), ".priority" === Ve(i) && !cr(t))) throw new Error(r + "contains an invalid value for '" + i.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
            s.push(i);
        }),
            (function (e, t) {
                let n, i;
                for (n = 0; n < t.length; n++) {
                    i = t[n];
                    const r = ze(i);
                    for (let t = 0; t < r.length; t++)
                        if (".priority" === r[t] && t === r.length - 1);
                        else if (!lr(r[t])) throw new Error(e + "contains an invalid key (" + r[t] + ") in path " + i.toString() + '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
                }
                t.sort(Ge);
                let r = null;
                for (n = 0; n < t.length; n++) {
                    if (((i = t[n]), null !== r && Xe(r, i))) throw new Error(e + "contains a path " + r.toString() + " that is ancestor of another path " + i.toString());
                    r = i;
                }
            })(r, s);
    },
    pr = function (e, t, n) {
        if (!n || void 0 !== t) {
            if (se(t)) throw new Error(x(e, "priority") + "is " + t.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
            if (!cr(t)) throw new Error(x(e, "priority") + "must be a valid Firebase priority (a string, finite number, server value, or null).");
        }
    },
    fr = function (e, t, n, i) {
        if (!((i && void 0 === n) || lr(n))) throw new Error(x(e, t) + 'was an invalid key = "' + n + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
    },
    gr = function (e, t, n, i) {
        if (!((i && void 0 === n) || hr(n))) throw new Error(x(e, t) + 'was an invalid path = "' + n + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
    },
    mr = function (e, t) {
        if (".info" === Be(t)) throw new Error(e + " failed = Can't modify data under /.info/");
    },
    yr = function (e, t) {
        const n = t.path.toString();
        if (
            "string" != typeof t.repoInfo.host ||
            0 === t.repoInfo.host.length ||
            (!lr(t.repoInfo.namespace) && "localhost" !== t.repoInfo.host.split(":")[0]) ||
            (0 !== n.length &&
                !(function (e) {
                    return e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), hr(e);
                })(n))
        )
            throw new Error(x(e, "url") + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');
    };
class vr {
    constructor() {
        (this.eventLists_ = []), (this.recursionDepth_ = 0);
    }
}
function Cr(e, t) {
    let n = null;
    for (let i = 0; i < t.length; i++) {
        const r = t[i],
            s = r.getPath();
        null === n || Je(s, n.path) || (e.eventLists_.push(n), (n = null)), null === n && (n = { events: [], path: s }), n.events.push(r);
    }
    n && e.eventLists_.push(n);
}
function wr(e, t, n) {
    Cr(e, n), br(e, (e) => Je(e, t));
}
function Tr(e, t, n) {
    Cr(e, n), br(e, (e) => Xe(e, t) || Xe(t, e));
}
function br(e, t) {
    e.recursionDepth_++;
    let n = !0;
    for (let i = 0; i < e.eventLists_.length; i++) {
        const r = e.eventLists_[i];
        if (r) {
            t(r.path) ? (Er(e.eventLists_[i]), (e.eventLists_[i] = null)) : (n = !1);
        }
    }
    n && (e.eventLists_ = []), e.recursionDepth_--;
}
function Er(e) {
    for (let t = 0; t < e.events.length; t++) {
        const n = e.events[t];
        if (null !== n) {
            e.events[t] = null;
            const i = n.getEventRunner();
            J && ee("event: " + n.toString()), me(i);
        }
    }
}
class Ir {
    constructor(e, t, n, i) {
        (this.repoInfo_ = e),
            (this.forceRestClient_ = t),
            (this.authTokenProvider_ = n),
            (this.appCheckProvider_ = i),
            (this.dataUpdateCount = 0),
            (this.statsListener_ = null),
            (this.eventQueue_ = new vr()),
            (this.nextWriteId_ = 1),
            (this.interceptServerDataCallback_ = null),
            (this.onDisconnect_ = Zt()),
            (this.transactionQueueTree_ = new Ji()),
            (this.persistentConnection_ = null),
            (this.key = this.repoInfo_.toURLString());
    }
    toString() {
        return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host;
    }
}
function Sr(e, t, n) {
    if (
        ((e.stats_ = Ne(e.repoInfo_)),
        e.forceRestClient_ || (("object" == typeof window && window.navigator && window.navigator.userAgent) || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0)
    )
        (e.server_ = new Jt(
            e.repoInfo_,
            (t, n, i, r) => {
                Pr(e, t, n, i, r);
            },
            e.authTokenProvider_,
            e.appCheckProvider_
        )),
            setTimeout(() => xr(e, !0), 0);
    else {
        if (null != n) {
            if ("object" != typeof n) throw new Error("Only objects are supported for option databaseAuthVariableOverride");
            try {
                b(n);
            } catch (e) {
                throw new Error("Invalid authOverride provided: " + e);
            }
        }
        (e.persistentConnection_ = new it(
            e.repoInfo_,
            t,
            (t, n, i, r) => {
                Pr(e, t, n, i, r);
            },
            (t) => {
                xr(e, t);
            },
            (t) => {
                !(function (e, t) {
                    _e(t, (t, n) => {
                        Rr(e, t, n);
                    });
                })(e, t);
            },
            e.authTokenProvider_,
            e.appCheckProvider_,
            n
        )),
            (e.server_ = e.persistentConnection_);
    }
    e.authTokenProvider_.addTokenChangeListener((t) => {
        e.server_.refreshAuthToken(t);
    }),
        e.appCheckProvider_.addTokenChangeListener((t) => {
            e.server_.refreshAppCheckToken(t.token);
        }),
        (e.statsReporter_ = (function (e, t) {
            const n = e.toString();
            return ke[n] || (ke[n] = t()), ke[n];
        })(e.repoInfo_, () => new sn(e.stats_, e.server_))),
        (e.infoData_ = new Xt()),
        (e.infoSyncTree_ = new bi({
            startListening: (t, n, i, r) => {
                let s = [];
                const o = e.infoData_.getNode(t._path);
                return (
                    o.isEmpty() ||
                        ((s = ki(e.infoSyncTree_, t._path, o)),
                        setTimeout(() => {
                            r("ok");
                        }, 0)),
                    s
                );
            },
            stopListening: () => {},
        })),
        Rr(e, "connected", !1),
        (e.serverSyncTree_ = new bi({
            startListening: (t, n, i, r) => (
                e.server_.listen(t, i, n, (n, i) => {
                    const s = r(n, i);
                    Tr(e.eventQueue_, t._path, s);
                }),
                []
            ),
            stopListening: (t, n) => {
                e.server_.unlisten(t, n);
            },
        }));
}
function kr(e) {
    const t = e.infoData_.getNode(new We(".info/serverTimeOffset")).val() || 0;
    return new Date().getTime() + t;
}
function Nr(e) {
    return ((t = (t = { timestamp: kr(e) }) || {}).timestamp = t.timestamp || new Date().getTime()), t;
    var t;
}
function Pr(e, t, n, i, r) {
    e.dataUpdateCount++;
    const s = new We(t);
    n = e.interceptServerDataCallback_ ? e.interceptServerDataCallback_(t, n) : n;
    let o = [];
    if (r)
        if (i) {
            const t = N(n, (e) => Rt(e));
            o = (function (e, t, n, i) {
                const r = Wi(e, i);
                if (r) {
                    const i = Ui(r),
                        s = i.path,
                        o = i.queryId,
                        a = $e(s, t),
                        l = wn.fromObject(n);
                    return Bi(e, s, new un(an(o), a, l));
                }
                return [];
            })(e.serverSyncTree_, s, t, r);
        } else {
            const t = Rt(n);
            o = Pi(e.serverSyncTree_, s, t, r);
        }
    else if (i) {
        const t = N(n, (e) => Rt(e));
        o = (function (e, t, n) {
            const i = wn.fromObject(n);
            return Di(e, new un({ fromUser: !1, fromServer: !0, queryId: null, tagged: !1 }, t, i));
        })(e.serverSyncTree_, s, t);
    } else {
        const t = Rt(n);
        o = ki(e.serverSyncTree_, s, t);
    }
    let a = s;
    o.length > 0 && (a = jr(e, s)), Tr(e.eventQueue_, a, o);
}
function xr(e, t) {
    Rr(e, "connected", t),
        !1 === t &&
            (function (e) {
                qr(e, "onDisconnectEvents");
                const t = Nr(e),
                    n = Zt();
                nn(e.onDisconnect_, Ue(), (i, r) => {
                    const s = Qi(i, r, e.serverSyncTree_, t);
                    en(n, i, s);
                });
                let i = [];
                nn(n, Ue(), (t, n) => {
                    i = i.concat(ki(e.serverSyncTree_, t, n));
                    const r = Kr(e, t);
                    jr(e, r);
                }),
                    (e.onDisconnect_ = Zt()),
                    Tr(e.eventQueue_, Ue(), i);
            })(e);
}
function Rr(e, t, n) {
    const i = new We("/.info/" + t),
        r = Rt(n);
    e.infoData_.updateSnapshot(i, r);
    const s = ki(e.infoSyncTree_, i, r);
    Tr(e.eventQueue_, i, s);
}
function Ar(e) {
    return e.nextWriteId_++;
}
function Dr(e, t, n, i, r) {
    qr(e, "set", { path: t.toString(), value: n, priority: i });
    const s = Nr(e),
        o = Rt(n, i),
        a = Ri(e.serverSyncTree_, t),
        l = $i(o, a, s),
        h = Ar(e),
        c = Ei(e.serverSyncTree_, t, l, h, !0);
    Cr(e.eventQueue_, c),
        e.server_.put(t.toString(), o.val(!0), (n, i) => {
            const s = "ok" === n;
            s || re("set at " + t + " failed: " + n);
            const o = Si(e.serverSyncTree_, h, !s);
            Tr(e.eventQueue_, t, o), Wr(e, r, n, i);
        });
    const u = Kr(e, t);
    jr(e, u), Tr(e.eventQueue_, u, []);
}
function Or(e, t, n) {
    e.server_.onDisconnectCancel(t.toString(), (i, r) => {
        "ok" === i && tn(e.onDisconnect_, t), Wr(e, n, i, r);
    });
}
function Lr(e, t, n, i) {
    const r = Rt(n);
    e.server_.onDisconnectPut(t.toString(), r.val(!0), (n, s) => {
        "ok" === n && en(e.onDisconnect_, t, r), Wr(e, i, n, s);
    });
}
function Fr(e, t, n) {
    let i;
    (i = ".info" === Be(t._path) ? Ni(e.infoSyncTree_, t, n) : Ni(e.serverSyncTree_, t, n)), wr(e.eventQueue_, t._path, i);
}
function Mr(e) {
    e.persistentConnection_ && e.persistentConnection_.interrupt("repo_interrupt");
}
function qr(e, ...t) {
    let n = "";
    e.persistentConnection_ && (n = e.persistentConnection_.id + ":"), ee(n, ...t);
}
function Wr(e, t, n, i) {
    t &&
        me(() => {
            if ("ok" === n) t(null);
            else {
                const e = (n || "error").toUpperCase();
                let r = e;
                i && (r += ": " + i);
                const s = new Error(r);
                (s.code = e), t(s);
            }
        });
}
function Ur(e, t, n) {
    return Ri(e.serverSyncTree_, t, n) || Pt.EMPTY_NODE;
}
function Br(e, t = e.transactionQueueTree_) {
    if ((t || Yr(e, t), Zi(t))) {
        const n = Vr(e, t);
        a(n.length > 0, "Sending zero length transaction queue");
        n.every((e) => 0 === e.status) &&
            (function (e, t, n) {
                const i = n.map((e) => e.currentWriteId),
                    r = Ur(e, t, i);
                let s = r;
                const o = r.hash();
                for (let e = 0; e < n.length; e++) {
                    const i = n[e];
                    a(0 === i.status, "tryToSendTransactionQueue_: items in queue should all be run."), (i.status = 1), i.retryCount++;
                    const r = $e(t, i.path);
                    s = s.updateChild(r, i.currentOutputSnapshotRaw);
                }
                const l = s.val(!0),
                    h = t;
                e.server_.put(
                    h.toString(),
                    l,
                    (i) => {
                        qr(e, "transaction put response", { path: h.toString(), status: i });
                        let r = [];
                        if ("ok" === i) {
                            const i = [];
                            for (let t = 0; t < n.length; t++)
                                (n[t].status = 2), (r = r.concat(Si(e.serverSyncTree_, n[t].currentWriteId))), n[t].onComplete && i.push(() => n[t].onComplete(null, !0, n[t].currentOutputSnapshotResolved)), n[t].unwatcher();
                            Yr(e, Xi(e.transactionQueueTree_, t)), Br(e, e.transactionQueueTree_), Tr(e.eventQueue_, t, r);
                            for (let e = 0; e < i.length; e++) me(i[e]);
                        } else {
                            if ("datastale" === i) for (let e = 0; e < n.length; e++) 3 === n[e].status ? (n[e].status = 4) : (n[e].status = 0);
                            else {
                                re("transaction at " + h.toString() + " failed: " + i);
                                for (let e = 0; e < n.length; e++) (n[e].status = 4), (n[e].abortReason = i);
                            }
                            jr(e, t);
                        }
                    },
                    o
                );
            })(e, rr(t), n);
    } else
        tr(t) &&
            nr(t, (t) => {
                Br(e, t);
            });
}
function jr(e, t) {
    const n = Hr(e, t),
        i = rr(n);
    return (
        (function (e, t, n) {
            if (0 === t.length) return;
            const i = [];
            let r = [];
            const s = t.filter((e) => 0 === e.status).map((e) => e.currentWriteId);
            for (let l = 0; l < t.length; l++) {
                const h = t[l],
                    c = $e(n, h.path);
                let u,
                    d = !1;
                if ((a(null !== c, "rerunTransactionsUnderNode_: relativePath should not be null."), 4 === h.status)) (d = !0), (u = h.abortReason), (r = r.concat(Si(e.serverSyncTree_, h.currentWriteId, !0)));
                else if (0 === h.status)
                    if (h.retryCount >= 25) (d = !0), (u = "maxretry"), (r = r.concat(Si(e.serverSyncTree_, h.currentWriteId, !0)));
                    else {
                        const n = Ur(e, h.path, s);
                        h.currentInputSnapshot = n;
                        const i = t[l].update(n.val());
                        if (void 0 !== i) {
                            dr("transaction failed: Data returned ", i, h.path);
                            let t = Rt(i);
                            ("object" == typeof i && null != i && I(i, ".priority")) || (t = t.updatePriority(n.getPriority()));
                            const o = h.currentWriteId,
                                a = Nr(e),
                                l = $i(t, n, a);
                            (h.currentOutputSnapshotRaw = t),
                                (h.currentOutputSnapshotResolved = l),
                                (h.currentWriteId = Ar(e)),
                                s.splice(s.indexOf(o), 1),
                                (r = r.concat(Ei(e.serverSyncTree_, h.path, l, h.currentWriteId, h.applyLocally))),
                                (r = r.concat(Si(e.serverSyncTree_, o, !0)));
                        } else (d = !0), (u = "nodata"), (r = r.concat(Si(e.serverSyncTree_, h.currentWriteId, !0)));
                    }
                Tr(e.eventQueue_, n, r),
                    (r = []),
                    d &&
                        ((t[l].status = 2),
                        (o = t[l].unwatcher),
                        setTimeout(o, Math.floor(0)),
                        t[l].onComplete && ("nodata" === u ? i.push(() => t[l].onComplete(null, !1, t[l].currentInputSnapshot)) : i.push(() => t[l].onComplete(new Error(u), !1, null))));
            }
            var o;
            Yr(e, e.transactionQueueTree_);
            for (let e = 0; e < i.length; e++) me(i[e]);
            Br(e, e.transactionQueueTree_);
        })(e, Vr(e, n), i),
        i
    );
}
function Hr(e, t) {
    let n,
        i = e.transactionQueueTree_;
    for (n = Be(t); null !== n && void 0 === Zi(i); ) (i = Xi(i, n)), (n = Be((t = He(t))));
    return i;
}
function Vr(e, t) {
    const n = [];
    return zr(e, t, n), n.sort((e, t) => e.order - t.order), n;
}
function zr(e, t, n) {
    const i = Zi(t);
    if (i) for (let e = 0; e < i.length; e++) n.push(i[e]);
    nr(t, (t) => {
        zr(e, t, n);
    });
}
function Yr(e, t) {
    const n = Zi(t);
    if (n) {
        let e = 0;
        for (let t = 0; t < n.length; t++) 2 !== n[t].status && ((n[e] = n[t]), e++);
        (n.length = e), er(t, n.length > 0 ? n : void 0);
    }
    nr(t, (t) => {
        Yr(e, t);
    });
}
function Kr(e, t) {
    const n = rr(Hr(e, t)),
        i = Xi(e.transactionQueueTree_, t);
    return (
        (function (e, t, n) {
            let i = n ? e : e.parent;
            for (; null !== i; ) {
                if (t(i)) return !0;
                i = i.parent;
            }
        })(i, (t) => {
            Qr(e, t);
        }),
        Qr(e, i),
        ir(i, (t) => {
            Qr(e, t);
        }),
        n
    );
}
function Qr(e, t) {
    const n = Zi(t);
    if (n) {
        const i = [];
        let r = [],
            s = -1;
        for (let t = 0; t < n.length; t++)
            3 === n[t].status ||
                (1 === n[t].status
                    ? (a(s === t - 1, "All SENT items should be at beginning of queue."), (s = t), (n[t].status = 3), (n[t].abortReason = "set"))
                    : (a(0 === n[t].status, "Unexpected transaction status in abort"),
                      n[t].unwatcher(),
                      (r = r.concat(Si(e.serverSyncTree_, n[t].currentWriteId, !0))),
                      n[t].onComplete && i.push(n[t].onComplete.bind(null, new Error("set"), !1, null))));
        -1 === s ? er(t, void 0) : (n.length = s + 1), Tr(e.eventQueue_, rr(t), r);
        for (let e = 0; e < i.length; e++) me(i[e]);
    }
}
const $r = function (e, t) {
        const n = Gr(e),
            i = n.namespace;
        "firebase.com" === n.domain && ie(n.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),
            (i && "undefined" !== i) || "localhost" === n.domain || ie("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),
            n.secure ||
                ("undefined" != typeof window &&
                    window.location &&
                    window.location.protocol &&
                    -1 !== window.location.protocol.indexOf("https:") &&
                    re("Insecure Firebase access from a secure page. Please use https in calls to new Firebase()."));
        const r = "ws" === n.scheme || "wss" === n.scheme;
        return { repoInfo: new be(n.host, n.secure, i, r, t, "", i !== n.subdomain), path: new We(n.pathString) };
    },
    Gr = function (e) {
        let t = "",
            n = "",
            i = "",
            r = "",
            s = "",
            o = !0,
            a = "https",
            l = 443;
        if ("string" == typeof e) {
            let h = e.indexOf("//");
            h >= 0 && ((a = e.substring(0, h - 1)), (e = e.substring(h + 2)));
            let c = e.indexOf("/");
            -1 === c && (c = e.length);
            let u = e.indexOf("?");
            -1 === u && (u = e.length),
                (t = e.substring(0, Math.min(c, u))),
                c < u &&
                    (r = (function (e) {
                        let t = "";
                        const n = e.split("/");
                        for (let e = 0; e < n.length; e++)
                            if (n[e].length > 0) {
                                let i = n[e];
                                try {
                                    i = decodeURIComponent(i.replace(/\+/g, " "));
                                } catch (e) {}
                                t += "/" + i;
                            }
                        return t;
                    })(e.substring(c, u)));
            const d = (function (e) {
                const t = {};
                "?" === e.charAt(0) && (e = e.substring(1));
                for (const n of e.split("&")) {
                    if (0 === n.length) continue;
                    const i = n.split("=");
                    2 === i.length ? (t[decodeURIComponent(i[0])] = decodeURIComponent(i[1])) : re(`Invalid query segment '${n}' in query '${e}'`);
                }
                return t;
            })(e.substring(Math.min(e.length, u)));
            (h = t.indexOf(":")), h >= 0 ? ((o = "https" === a || "wss" === a), (l = parseInt(t.substring(h + 1), 10))) : (h = t.length);
            const _ = t.slice(0, h);
            if ("localhost" === _.toLowerCase()) n = "localhost";
            else if (_.split(".").length <= 2) n = _;
            else {
                const e = t.indexOf(".");
                (i = t.substring(0, e).toLowerCase()), (n = t.substring(e + 1)), (s = i);
            }
            "ns" in d && (s = d.ns);
        }
        return { host: t, port: l, domain: n, subdomain: i, secure: o, scheme: a, pathString: r, namespace: s };
    };
class Jr {
    constructor(e, t, n, i) {
        (this.eventType = e), (this.eventRegistration = t), (this.snapshot = n), (this.prevName = i);
    }
    getPath() {
        const e = this.snapshot.ref;
        return "value" === this.eventType ? e._path : e.parent._path;
    }
    getEventType() {
        return this.eventType;
    }
    getEventRunner() {
        return this.eventRegistration.getEventRunner(this);
    }
    toString() {
        return this.getPath().toString() + ":" + this.eventType + ":" + b(this.snapshot.exportVal());
    }
}
class Xr {
    constructor(e, t, n) {
        (this.eventRegistration = e), (this.error = t), (this.path = n);
    }
    getPath() {
        return this.path;
    }
    getEventType() {
        return "cancel";
    }
    getEventRunner() {
        return this.eventRegistration.getEventRunner(this);
    }
    toString() {
        return this.path.toString() + ":cancel";
    }
}
class Zr {
    constructor(e, t) {
        (this.snapshotCallback = e), (this.cancelCallback = t);
    }
    onValue(e, t) {
        this.snapshotCallback.call(null, e, t);
    }
    onCancel(e) {
        return a(this.hasCancelCallback, "Raising a cancel event on a listener with no cancel callback"), this.cancelCallback.call(null, e);
    }
    get hasCancelCallback() {
        return !!this.cancelCallback;
    }
    matches(e) {
        return (
            this.snapshotCallback === e.snapshotCallback ||
            (void 0 !== this.snapshotCallback.userCallback && this.snapshotCallback.userCallback === e.snapshotCallback.userCallback && this.snapshotCallback.context === e.snapshotCallback.context)
        );
    }
}
class es {
    constructor(e, t) {
        (this._repo = e), (this._path = t);
    }
    cancel() {
        const e = new w();
        return (
            Or(
                this._repo,
                this._path,
                e.wrapCallback(() => {})
            ),
            e.promise
        );
    }
    remove() {
        mr("OnDisconnect.remove", this._path);
        const e = new w();
        return (
            Lr(
                this._repo,
                this._path,
                null,
                e.wrapCallback(() => {})
            ),
            e.promise
        );
    }
    set(e) {
        mr("OnDisconnect.set", this._path), ur("OnDisconnect.set", e, this._path, !1);
        const t = new w();
        return (
            Lr(
                this._repo,
                this._path,
                e,
                t.wrapCallback(() => {})
            ),
            t.promise
        );
    }
    setWithPriority(e, t) {
        mr("OnDisconnect.setWithPriority", this._path), ur("OnDisconnect.setWithPriority", e, this._path, !1), pr("OnDisconnect.setWithPriority", t, !1);
        const n = new w();
        return (
            (function (e, t, n, i, r) {
                const s = Rt(n, i);
                e.server_.onDisconnectPut(t.toString(), s.val(!0), (n, i) => {
                    "ok" === n && en(e.onDisconnect_, t, s), Wr(0, r, n, i);
                });
            })(
                this._repo,
                this._path,
                e,
                t,
                n.wrapCallback(() => {})
            ),
            n.promise
        );
    }
    update(e) {
        mr("OnDisconnect.update", this._path), _r("OnDisconnect.update", e, this._path, !1);
        const t = new w();
        return (
            (function (e, t, n, i) {
                if (k(n)) return ee("onDisconnect().update() called with empty data.  Don't do anything."), void Wr(0, i, "ok", void 0);
                e.server_.onDisconnectMerge(t.toString(), n, (r, s) => {
                    "ok" === r &&
                        _e(n, (n, i) => {
                            const r = Rt(i);
                            en(e.onDisconnect_, Ke(t, n), r);
                        }),
                        Wr(0, i, r, s);
                });
            })(
                this._repo,
                this._path,
                e,
                t.wrapCallback(() => {})
            ),
            t.promise
        );
    }
}
class ts {
    constructor(e, t, n, i) {
        (this._repo = e), (this._path = t), (this._queryParams = n), (this._orderByCalled = i);
    }
    get key() {
        return Qe(this._path) ? null : Ve(this._path);
    }
    get ref() {
        return new ss(this._repo, this._path);
    }
    get _queryIdentifier() {
        const e = Gt(this._queryParams),
            t = ue(e);
        return "{}" === t ? "default" : t;
    }
    get _queryObject() {
        return Gt(this._queryParams);
    }
    isEqual(e) {
        if (!((e = A(e)) instanceof ts)) return !1;
        const t = this._repo === e._repo,
            n = Je(this._path, e._path),
            i = this._queryIdentifier === e._queryIdentifier;
        return t && n && i;
    }
    toJSON() {
        return this.toString();
    }
    toString() {
        return (
            this._repo.toString() +
            (function (e) {
                let t = "";
                for (let n = e.pieceNum_; n < e.pieces_.length; n++) "" !== e.pieces_[n] && (t += "/" + encodeURIComponent(String(e.pieces_[n])));
                return t || "/";
            })(this._path)
        );
    }
}
function ns(e, t) {
    if (!0 === e._orderByCalled) throw new Error(t + ": You can't combine multiple orderBy calls.");
}
function is(e) {
    let t = null,
        n = null;
    if ((e.hasStart() && (t = e.getIndexStartValue()), e.hasEnd() && (n = e.getIndexEndValue()), e.getIndex() === lt)) {
        const i = "Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",
            r = "Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";
        if (e.hasStart()) {
            if (e.getIndexStartName() !== oe) throw new Error(i);
            if ("string" != typeof t) throw new Error(r);
        }
        if (e.hasEnd()) {
            if (e.getIndexEndName() !== ae) throw new Error(i);
            if ("string" != typeof n) throw new Error(r);
        }
    } else if (e.getIndex() === wt) {
        if ((null != t && !cr(t)) || (null != n && !cr(n)))
            throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).");
    } else if ((a(e.getIndex() instanceof At || e.getIndex() === Dt, "unknown index type."), (null != t && "object" == typeof t) || (null != n && "object" == typeof n)))
        throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.");
}
function rs(e) {
    if (e.hasStart() && e.hasEnd() && e.hasLimit() && !e.hasAnchoredLimit()) throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.");
}
class ss extends ts {
    constructor(e, t) {
        super(e, t, new zt(), !1);
    }
    get parent() {
        const e = Ye(this._path);
        return null === e ? null : new ss(this._repo, e);
    }
    get root() {
        let e = this;
        for (; null !== e.parent; ) e = e.parent;
        return e;
    }
}
class os {
    constructor(e, t, n) {
        (this._node = e), (this.ref = t), (this._index = n);
    }
    get priority() {
        return this._node.getPriority().val();
    }
    get key() {
        return this.ref.key;
    }
    get size() {
        return this._node.numChildren();
    }
    child(e) {
        const t = new We(e),
            n = hs(this.ref, e);
        return new os(this._node.getChild(t), n, wt);
    }
    exists() {
        return !this._node.isEmpty();
    }
    exportVal() {
        return this._node.val(!0);
    }
    forEach(e) {
        if (this._node.isLeafNode()) return !1;
        return !!this._node.forEachChild(this._index, (t, n) => e(new os(n, hs(this.ref, t), wt)));
    }
    hasChild(e) {
        const t = new We(e);
        return !this._node.getChild(t).isEmpty();
    }
    hasChildren() {
        return !this._node.isLeafNode() && !this._node.isEmpty();
    }
    toJSON() {
        return this.exportVal();
    }
    val() {
        return this._node.val();
    }
}
function as(e, t) {
    return (e = A(e))._checkNotDeleted("ref"), void 0 !== t ? hs(e._root, t) : e._root;
}
function ls(e, t) {
    (e = A(e))._checkNotDeleted("refFromURL");
    const n = $r(t, e._repo.repoInfo_.nodeAdmin);
    yr("refFromURL", n);
    const i = n.repoInfo;
    return (
        e._repo.repoInfo_.isCustomHost() || i.host === e._repo.repoInfo_.host || ie("refFromURL: Host name does not match the current database: (found " + i.host + " but expected " + e._repo.repoInfo_.host + ")"), as(e, n.path.toString())
    );
}
function hs(e, t) {
    var n, i, r, s;
    return null === Be((e = A(e))._path) ? ((n = "child"), (i = "path"), (s = !1), (r = t) && (r = r.replace(/^\/*\.info(\/|$)/, "/")), gr(n, i, r, s)) : gr("child", "path", t, !1), new ss(e._repo, Ke(e._path, t));
}
function cs(e) {
    return (e = A(e)), new es(e._repo, e._path);
}
function us(e, t) {
    (e = A(e)), mr("push", e._path), ur("push", t, e._path, !0);
    const n = kr(e._repo),
        i = Lt(n),
        r = hs(e, i),
        s = hs(e, i);
    let o;
    return (o = null != t ? _s(s, t).then(() => s) : Promise.resolve(s)), (r.then = o.then.bind(o)), (r.catch = o.then.bind(o, void 0)), r;
}
function ds(e) {
    return mr("remove", e._path), _s(e, null);
}
function _s(e, t) {
    (e = A(e)), mr("set", e._path), ur("set", t, e._path, !1);
    const n = new w();
    return (
        Dr(
            e._repo,
            e._path,
            t,
            null,
            n.wrapCallback(() => {})
        ),
        n.promise
    );
}
function ps(e, t) {
    (e = A(e)), mr("setPriority", e._path), pr("setPriority", t, !1);
    const n = new w();
    return (
        Dr(
            e._repo,
            Ke(e._path, ".priority"),
            t,
            null,
            n.wrapCallback(() => {})
        ),
        n.promise
    );
}
function fs(e, t, n) {
    if ((mr("setWithPriority", e._path), ur("setWithPriority", t, e._path, !1), pr("setWithPriority", n, !1), ".length" === e.key || ".keys" === e.key)) throw "setWithPriority failed: " + e.key + " is a read-only object.";
    const i = new w();
    return (
        Dr(
            e._repo,
            e._path,
            t,
            n,
            i.wrapCallback(() => {})
        ),
        i.promise
    );
}
function gs(e, t) {
    _r("update", t, e._path, !1);
    const n = new w();
    return (
        (function (e, t, n, i) {
            qr(e, "update", { path: t.toString(), value: n });
            let r = !0;
            const s = Nr(e),
                o = {};
            if (
                (_e(n, (n, i) => {
                    (r = !1), (o[n] = Qi(Ke(t, n), Rt(i), e.serverSyncTree_, s));
                }),
                r)
            )
                ee("update() called with empty data.  Don't do anything."), Wr(0, i, "ok", void 0);
            else {
                const r = Ar(e),
                    s = Ii(e.serverSyncTree_, t, o, r);
                Cr(e.eventQueue_, s),
                    e.server_.merge(t.toString(), n, (n, s) => {
                        const o = "ok" === n;
                        o || re("update at " + t + " failed: " + n);
                        const a = Si(e.serverSyncTree_, r, !o),
                            l = a.length > 0 ? jr(e, t) : t;
                        Tr(e.eventQueue_, l, a), Wr(0, i, n, s);
                    }),
                    _e(n, (n) => {
                        const i = Kr(e, Ke(t, n));
                        jr(e, i);
                    }),
                    Tr(e.eventQueue_, t, []);
            }
        })(
            e._repo,
            e._path,
            t,
            n.wrapCallback(() => {})
        ),
        n.promise
    );
}
function ms(e) {
    e = A(e);
    const t = new Zr(() => {}),
        n = new ys(t);
    return (function (e, t, n) {
        const i = Ai(e.serverSyncTree_, t);
        return null != i
            ? Promise.resolve(i)
            : e.server_.get(t).then(
                  (i) => {
                      const r = Rt(i).withIndex(t._queryParams.getIndex());
                      let s;
                      if ((xi(e.serverSyncTree_, t, n, !0), t._queryParams.loadsAllData())) s = ki(e.serverSyncTree_, t._path, r);
                      else {
                          const n = Mi(e.serverSyncTree_, t);
                          s = Pi(e.serverSyncTree_, t._path, r, n);
                      }
                      return Tr(e.eventQueue_, t._path, s), Ni(e.serverSyncTree_, t, n, null, !0), r;
                  },
                  (n) => (qr(e, "get for query " + b(t) + " failed: " + n), Promise.reject(new Error(n)))
              );
    })(e._repo, e, n).then((t) => new os(t, new ss(e._repo, e._path), e._queryParams.getIndex()));
}
class ys {
    constructor(e) {
        this.callbackContext = e;
    }
    respondsTo(e) {
        return "value" === e;
    }
    createEvent(e, t) {
        const n = t._queryParams.getIndex();
        return new Jr("value", this, new os(e.snapshotNode, new ss(t._repo, t._path), n));
    }
    getEventRunner(e) {
        return "cancel" === e.getEventType() ? () => this.callbackContext.onCancel(e.error) : () => this.callbackContext.onValue(e.snapshot, null);
    }
    createCancelEvent(e, t) {
        return this.callbackContext.hasCancelCallback ? new Xr(this, e, t) : null;
    }
    matches(e) {
        return e instanceof ys && (!e.callbackContext || !this.callbackContext || e.callbackContext.matches(this.callbackContext));
    }
    hasAnyCallback() {
        return null !== this.callbackContext;
    }
}
class vs {
    constructor(e, t) {
        (this.eventType = e), (this.callbackContext = t);
    }
    respondsTo(e) {
        let t = "children_added" === e ? "child_added" : e;
        return (t = "children_removed" === t ? "child_removed" : t), this.eventType === t;
    }
    createCancelEvent(e, t) {
        return this.callbackContext.hasCancelCallback ? new Xr(this, e, t) : null;
    }
    createEvent(e, t) {
        a(null != e.childName, "Child events should have a childName.");
        const n = hs(new ss(t._repo, t._path), e.childName),
            i = t._queryParams.getIndex();
        return new Jr(e.type, this, new os(e.snapshotNode, n, i), e.prevName);
    }
    getEventRunner(e) {
        return "cancel" === e.getEventType() ? () => this.callbackContext.onCancel(e.error) : () => this.callbackContext.onValue(e.snapshot, e.prevName);
    }
    matches(e) {
        return e instanceof vs && this.eventType === e.eventType && (!this.callbackContext || !e.callbackContext || this.callbackContext.matches(e.callbackContext));
    }
    hasAnyCallback() {
        return !!this.callbackContext;
    }
}
function Cs(e, t, n, i, r) {
    let s;
    if (("object" == typeof i && ((s = void 0), (r = i)), "function" == typeof i && (s = i), r && r.onlyOnce)) {
        const t = n,
            i = (n, i) => {
                Fr(e._repo, e, a), t(n, i);
            };
        (i.userCallback = n.userCallback), (i.context = n.context), (n = i);
    }
    const o = new Zr(n, s || void 0),
        a = "value" === t ? new ys(o) : new vs(t, o);
    return (
        (function (e, t, n) {
            let i;
            (i = ".info" === Be(t._path) ? xi(e.infoSyncTree_, t, n) : xi(e.serverSyncTree_, t, n)), wr(e.eventQueue_, t._path, i);
        })(e._repo, e, a),
        () => Fr(e._repo, e, a)
    );
}
function ws(e, t, n, i) {
    return Cs(e, "value", t, n, i);
}
function Ts(e, t, n, i) {
    return Cs(e, "child_added", t, n, i);
}
function bs(e, t, n, i) {
    return Cs(e, "child_changed", t, n, i);
}
function Es(e, t, n, i) {
    return Cs(e, "child_moved", t, n, i);
}
function Is(e, t, n, i) {
    return Cs(e, "child_removed", t, n, i);
}
function Ss(e, t, n) {
    let i = null;
    const r = n ? new Zr(n) : null;
    "value" === t ? (i = new ys(r)) : t && (i = new vs(t, r)), Fr(e._repo, e, i);
}
class ks {}
class Ns extends ks {
    constructor(e, t) {
        super(), (this._value = e), (this._key = t);
    }
    _apply(e) {
        ur("endAt", this._value, e._path, !0);
        const t = Kt(e._queryParams, this._value, this._key);
        if ((rs(t), is(t), e._queryParams.hasEnd())) throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");
        return new ts(e._repo, e._path, t, e._orderByCalled);
    }
}
function Ps(e, t) {
    return fr("endAt", "key", t, !0), new Ns(e, t);
}
class xs extends ks {
    constructor(e, t) {
        super(), (this._value = e), (this._key = t);
    }
    _apply(e) {
        ur("endBefore", this._value, e._path, !1);
        const t = (function (e, t, n) {
            let i, r;
            return e.index_ === lt ? ("string" == typeof t && (t = Mt(t)), (r = Kt(e, t, n))) : ((i = null == n ? oe : Mt(n)), (r = Kt(e, t, i))), (r.endBeforeSet_ = !0), r;
        })(e._queryParams, this._value, this._key);
        if ((rs(t), is(t), e._queryParams.hasEnd())) throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");
        return new ts(e._repo, e._path, t, e._orderByCalled);
    }
}
function Rs(e, t) {
    return fr("endBefore", "key", t, !0), new xs(e, t);
}
class As extends ks {
    constructor(e, t) {
        super(), (this._value = e), (this._key = t);
    }
    _apply(e) {
        ur("startAt", this._value, e._path, !0);
        const t = Yt(e._queryParams, this._value, this._key);
        if ((rs(t), is(t), e._queryParams.hasStart())) throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");
        return new ts(e._repo, e._path, t, e._orderByCalled);
    }
}
function Ds(e = null, t) {
    return fr("startAt", "key", t, !0), new As(e, t);
}
class Os extends ks {
    constructor(e, t) {
        super(), (this._value = e), (this._key = t);
    }
    _apply(e) {
        ur("startAfter", this._value, e._path, !1);
        const t = (function (e, t, n) {
            let i;
            if (e.index_ === lt) "string" == typeof t && (t = Ft(t)), (i = Yt(e, t, n));
            else {
                let r;
                (r = null == n ? ae : Ft(n)), (i = Yt(e, t, r));
            }
            return (i.startAfterSet_ = !0), i;
        })(e._queryParams, this._value, this._key);
        if ((rs(t), is(t), e._queryParams.hasStart())) throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");
        return new ts(e._repo, e._path, t, e._orderByCalled);
    }
}
function Ls(e, t) {
    return fr("startAfter", "key", t, !0), new Os(e, t);
}
class Fs extends ks {
    constructor(e) {
        super(), (this._limit = e);
    }
    _apply(e) {
        if (e._queryParams.hasLimit()) throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");
        return new ts(
            e._repo,
            e._path,
            (function (e, t) {
                const n = e.copy();
                return (n.limitSet_ = !0), (n.limit_ = t), (n.viewFrom_ = "l"), n;
            })(e._queryParams, this._limit),
            e._orderByCalled
        );
    }
}
function Ms(e) {
    if ("number" != typeof e || Math.floor(e) !== e || e <= 0) throw new Error("limitToFirst: First argument must be a positive integer.");
    return new Fs(e);
}
class qs extends ks {
    constructor(e) {
        super(), (this._limit = e);
    }
    _apply(e) {
        if (e._queryParams.hasLimit()) throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");
        return new ts(
            e._repo,
            e._path,
            (function (e, t) {
                const n = e.copy();
                return (n.limitSet_ = !0), (n.limit_ = t), (n.viewFrom_ = "r"), n;
            })(e._queryParams, this._limit),
            e._orderByCalled
        );
    }
}
function Ws(e) {
    if ("number" != typeof e || Math.floor(e) !== e || e <= 0) throw new Error("limitToLast: First argument must be a positive integer.");
    return new qs(e);
}
class Us extends ks {
    constructor(e) {
        super(), (this._path = e);
    }
    _apply(e) {
        ns(e, "orderByChild");
        const t = new We(this._path);
        if (Qe(t)) throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");
        const n = new At(t),
            i = Qt(e._queryParams, n);
        return is(i), new ts(e._repo, e._path, i, !0);
    }
}
function Bs(e) {
    if ("$key" === e) throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');
    if ("$priority" === e) throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');
    if ("$value" === e) throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');
    return gr("orderByChild", "path", e, !1), new Us(e);
}
class js extends ks {
    _apply(e) {
        ns(e, "orderByKey");
        const t = Qt(e._queryParams, lt);
        return is(t), new ts(e._repo, e._path, t, !0);
    }
}
function Hs() {
    return new js();
}
class Vs extends ks {
    _apply(e) {
        ns(e, "orderByPriority");
        const t = Qt(e._queryParams, wt);
        return is(t), new ts(e._repo, e._path, t, !0);
    }
}
function zs() {
    return new Vs();
}
class Ys extends ks {
    _apply(e) {
        ns(e, "orderByValue");
        const t = Qt(e._queryParams, Dt);
        return is(t), new ts(e._repo, e._path, t, !0);
    }
}
function Ks() {
    return new Ys();
}
class Qs extends ks {
    constructor(e, t) {
        super(), (this._value = e), (this._key = t);
    }
    _apply(e) {
        if ((ur("equalTo", this._value, e._path, !1), e._queryParams.hasStart())) throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");
        if (e._queryParams.hasEnd()) throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");
        return new Ns(this._value, this._key)._apply(new As(this._value, this._key)._apply(e));
    }
}
function $s(e, t) {
    return fr("equalTo", "key", t, !0), new Qs(e, t);
}
function Gs(e, ...t) {
    let n = A(e);
    for (const e of t) n = e._apply(n);
    return n;
}
!(function (e) {
    a(!hi, "__referenceConstructor has already been defined"), (hi = e);
})(ss),
    (function (e) {
        a(!ci, "__referenceConstructor has already been defined"), (ci = e);
    })(ss);
const Js = {};
let Xs = !1;
function Zs(e, t, n, i, r) {
    let s = i || e.options.databaseURL;
    void 0 === s &&
        (e.options.projectId || ie("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),
        ee("Using default host for project ", e.options.projectId),
        (s = `${e.options.projectId}-default-rtdb.firebaseio.com`));
    let o,
        a,
        l = $r(s, r),
        h = l.repoInfo;
    "undefined" != typeof process && process.env && (a = process.env.FIREBASE_DATABASE_EMULATOR_HOST), a ? ((o = !0), (s = `http://${a}?ns=${h.namespace}`), (l = $r(s, r)), (h = l.repoInfo)) : (o = !l.repoInfo.secure);
    const c = r && o ? new we(we.OWNER) : new Ce(e.name, e.options, t);
    yr("Invalid Firebase Database URL", l), Qe(l.path) || ie("Database URL must point to the root of a Firebase Database (not including a child path).");
    const u = (function (e, t, n, i) {
        let r = Js[t.name];
        r || ((r = {}), (Js[t.name] = r));
        let s = r[e.toURLString()];
        s && ie("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");
        return (s = new Ir(e, Xs, n, i)), (r[e.toURLString()] = s), s;
    })(h, e, c, new ve(e.name, n));
    return new eo(u, e);
}
class eo {
    constructor(e, t) {
        (this._repoInternal = e), (this.app = t), (this.type = "database"), (this._instanceStarted = !1);
    }
    get _repo() {
        return this._instanceStarted || (Sr(this._repoInternal, this.app.options.appId, this.app.options.databaseAuthVariableOverride), (this._instanceStarted = !0)), this._repoInternal;
    }
    get _root() {
        return this._rootInternal || (this._rootInternal = new ss(this._repo, Ue())), this._rootInternal;
    }
    _delete() {
        return (
            null !== this._rootInternal &&
                (!(function (e, t) {
                    const n = Js[t];
                    (n && n[e.key] === e) || ie(`Database ${t}(${e.repoInfo_}) has already been deleted.`), Mr(e), delete n[e.key];
                })(this._repo, this.app.name),
                (this._repoInternal = null),
                (this._rootInternal = null)),
            Promise.resolve()
        );
    }
    _checkNotDeleted(e) {
        null === this._rootInternal && ie("Cannot call " + e + " on a deleted database.");
    }
}
function to() {
    Oe.IS_TRANSPORT_INITIALIZED && re("Transport has already been initialized. Please call this function before calling ref or setting up a listener");
}
function no() {
    to(), xe.forceDisallow();
}
function io() {
    to(), De.forceDisallow(), xe.forceAllow();
}
function ro(n = t(), i) {
    const r = e(n, "database").getImmediate({ identifier: i }),
        s = C("database");
    return s && so(r, ...s), r;
}
function so(e, t, n, i = {}) {
    (e = A(e))._checkNotDeleted("useEmulator"), e._instanceStarted && ie("Cannot call useEmulator() after instance has already been initialized.");
    const r = e._repoInternal;
    let s;
    if (r.repoInfo_.nodeAdmin) i.mockUserToken && ie('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'), (s = new we(we.OWNER));
    else if (i.mockUserToken) {
        const t =
            "string" == typeof i.mockUserToken
                ? i.mockUserToken
                : (function (e, t) {
                      if (e.uid) throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
                      const n = t || "demo-project",
                          i = e.iat || 0,
                          r = e.sub || e.user_id;
                      if (!r) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
                      const s = Object.assign({ iss: `https://securetoken.google.com/${n}`, aud: n, iat: i, exp: i + 3600, auth_time: i, sub: r, user_id: r, firebase: { sign_in_provider: "custom", identities: {} } }, e);
                      return [d(JSON.stringify({ alg: "none", type: "JWT" })), d(JSON.stringify(s)), ""].join(".");
                  })(i.mockUserToken, e.app.options.projectId);
        s = new we(t);
    }
    !(function (e, t, n, i) {
        (e.repoInfo_ = new be(`${t}:${n}`, !1, e.repoInfo_.namespace, e.repoInfo_.webSocketOnly, e.repoInfo_.nodeAdmin, e.repoInfo_.persistenceKey, e.repoInfo_.includeNamespaceInQueryParams)), i && (e.authTokenProvider_ = i);
    })(r, t, n, s);
}
function oo(e) {
    (e = A(e))._checkNotDeleted("goOffline"), Mr(e._repo);
}
function ao(e) {
    var t;
    (e = A(e))._checkNotDeleted("goOnline"), (t = e._repo).persistentConnection_ && t.persistentConnection_.resume("repo_interrupt");
}
function lo(e, t) {
    Z(e, t);
}
const ho = { ".sv": "timestamp" };
function co() {
    return ho;
}
function uo(e) {
    return { ".sv": { increment: e } };
}
class _o {
    constructor(e, t) {
        (this.committed = e), (this.snapshot = t);
    }
    toJSON() {
        return { committed: this.committed, snapshot: this.snapshot.toJSON() };
    }
}
function po(e, t, n) {
    var i;
    if (((e = A(e)), mr("Reference.transaction", e._path), ".length" === e.key || ".keys" === e.key)) throw "Reference.transaction failed: " + e.key + " is a read-only object.";
    const r = null === (i = null == n ? void 0 : n.applyLocally) || void 0 === i || i,
        s = new w(),
        o = ws(e, () => {});
    return (
        (function (e, t, n, i, r, s) {
            qr(e, "transaction on " + t);
            const o = {
                    path: t,
                    update: n,
                    onComplete: i,
                    status: null,
                    order: Q(),
                    applyLocally: s,
                    retryCount: 0,
                    unwatcher: r,
                    abortReason: null,
                    currentWriteId: null,
                    currentInputSnapshot: null,
                    currentOutputSnapshotRaw: null,
                    currentOutputSnapshotResolved: null,
                },
                l = Ur(e, t, void 0);
            o.currentInputSnapshot = l;
            const h = o.update(l.val());
            if (void 0 === h) o.unwatcher(), (o.currentOutputSnapshotRaw = null), (o.currentOutputSnapshotResolved = null), o.onComplete && o.onComplete(null, !1, o.currentInputSnapshot);
            else {
                dr("transaction failed: Data returned ", h, o.path), (o.status = 0);
                const n = Xi(e.transactionQueueTree_, t),
                    i = Zi(n) || [];
                let r;
                i.push(o),
                    er(n, i),
                    "object" == typeof h && null !== h && I(h, ".priority")
                        ? ((r = S(h, ".priority")), a(cr(r), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null."))
                        : (r = (Ri(e.serverSyncTree_, t) || Pt.EMPTY_NODE).getPriority().val());
                const s = Nr(e),
                    c = Rt(h, r),
                    u = $i(c, l, s);
                (o.currentOutputSnapshotRaw = c), (o.currentOutputSnapshotResolved = u), (o.currentWriteId = Ar(e));
                const d = Ei(e.serverSyncTree_, t, u, o.currentWriteId, o.applyLocally);
                Tr(e.eventQueue_, t, d), Br(e, e.transactionQueueTree_);
            }
        })(
            e._repo,
            e._path,
            t,
            (t, n, i) => {
                let r = null;
                t ? s.reject(t) : ((r = new os(i, new ss(e._repo, e._path), wt)), s.resolve(new _o(n, r)));
            },
            o,
            r
        ),
        s.promise
    );
}
(it.prototype.simpleListen = function (e, t) {
    this.sendRequest("q", { p: e }, t);
}),
    (it.prototype.echo = function (e, t) {
        this.sendRequest("echo", { d: e }, t);
    });
const fo = function (e) {
        const t = it.prototype.put;
        return (
            (it.prototype.put = function (n, i, r, s) {
                void 0 !== s && (s = e()), t.call(this, n, i, r, s);
            }),
            function () {
                it.prototype.put = t;
            }
        );
    },
    go = function (e) {
        !(function (e) {
            Xs = e;
        })(e);
    };
var mo;
B(r),
    n(new D("database", (e, { instanceIdentifier: t }) => Zs(e.getProvider("app").getImmediate(), e.getProvider("auth-internal"), e.getProvider("app-check-internal"), t), "PUBLIC").setMultipleInstances(!0)),
    i(W, "0.13.10", mo),
    i(W, "0.13.10", "esm2017");
export {
    os as DataSnapshot,
    eo as Database,
    es as OnDisconnect,
    ks as QueryConstraint,
    _o as TransactionResult,
    ts as _QueryImpl,
    zt as _QueryParams,
    ss as _ReferenceImpl,
    go as _TEST_ACCESS_forceRestClient,
    fo as _TEST_ACCESS_hijackHash,
    Zs as _repoManagerDatabaseFromApp,
    B as _setSDKVersion,
    gr as _validatePathString,
    mr as _validateWritablePath,
    hs as child,
    so as connectDatabaseEmulator,
    lo as enableLogging,
    Ps as endAt,
    Rs as endBefore,
    $s as equalTo,
    io as forceLongPolling,
    no as forceWebSockets,
    ms as get,
    ro as getDatabase,
    oo as goOffline,
    ao as goOnline,
    uo as increment,
    Ms as limitToFirst,
    Ws as limitToLast,
    Ss as off,
    Ts as onChildAdded,
    bs as onChildChanged,
    Es as onChildMoved,
    Is as onChildRemoved,
    cs as onDisconnect,
    ws as onValue,
    Bs as orderByChild,
    Hs as orderByKey,
    zs as orderByPriority,
    Ks as orderByValue,
    us as push,
    Gs as query,
    as as ref,
    ls as refFromURL,
    ds as remove,
    po as runTransaction,
    co as serverTimestamp,
    _s as set,
    ps as setPriority,
    fs as setWithPriority,
    Ls as startAfter,
    Ds as startAt,
    gs as update,
};