/*!
 * GSAP 3.0.4
 * https://greensock.com
 *
 * @license Copyright 2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function (e) {
    "use strict";

    function _inheritsLoose(t, e) {
        t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
    }

    function _assertThisInitialized(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function n(t) {
        return "string" == typeof t
    }

    function o(t) {
        return "function" == typeof t
    }

    function p(t) {
        return "number" == typeof t
    }

    function q(t) {
        return void 0 === t
    }

    function r(t) {
        return "object" == typeof t
    }

    function s(t) {
        return !1 !== t
    }

    function t() {
        return "undefined" != typeof window
    }

    function u(t) {
        return o(t) || n(t)
    }

    function J(t) {
        return (l = dt(t, at)) && ne
    }

    function K(t, e) {
        return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
    }

    function L(t, e) {
        return !e && console.warn(t)
    }

    function M(t, e) {
        return t && (at[t] = e) && l && (l[t] = e) || at
    }

    function N() {
        return 0
    }

    function W(t) {
        var e, n, i = t[0];
        if (r(i) || o(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
            for (n = pt.length; n-- && !pt[n].targetTest(i););
            e = pt[n]
        }
        for (n = t.length; n--;) t[n] && (t[n]._gsap || (t[n]._gsap = new Et(t[n], e))) || t.splice(n, 1);
        return t
    }

    function X(t) {
        return t._gsap || W(yt(t))[0]._gsap
    }

    function Y(t, e) {
        var r = t[e];
        return o(r) ? t[e]() : q(r) && t.getAttribute(e) || r
    }

    function Z(t, e) {
        return (t = t.split(",")).forEach(e) || t
    }

    function $(t) {
        return Math.round(1e4 * t) / 1e4
    }

    function _(t, e) {
        for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r;);
        return n < r
    }

    function aa(t, e, r) {
        var n, i = p(t[1]),
            a = (i ? 2 : 1) + (e < 2 ? 0 : 1),
            o = t[a];
        return i && (o.duration = t[1]), 1 === e ? (o.runBackwards = 1, o.immediateRender = s(o.immediateRender)) : 2 === e && (n = t[a - 1], o.startAt = n, o.immediateRender = s(o.immediateRender)), o.parent = r, o
    }

    function ba() {
        var t, e, r = ot.length,
            n = ot.slice(0);
        for (ut = {}, t = ot.length = 0; t < r; t++)(e = n[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
    }

    function ca(t, e, r, n) {
        ot.length && ba(), t.render(e, r, n), ot.length && ba()
    }

    function da(t) {
        var e = parseFloat(t);
        return e || 0 === e ? e : t
    }

    function ea(t) {
        return t
    }

    function fa(t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t
    }

    function ga(t, e) {
        for (var r in e) r in t || "duration" === r || "ease" === r || (t[r] = e[r])
    }

    function ia(t, e) {
        for (var n in e) t[n] = r(e[n]) ? ia(t[n] || (t[n] = {}), e[n]) : e[n];
        return t
    }

    function ja(t, e) {
        var r, n = {};
        for (r in t) r in e || (n[r] = t[r]);
        return n
    }

    function na(t, e, r, n) {
        void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
        var i = e._prev,
            a = e._next;
        i ? i._next = a : t[r] === e && (t[r] = a), a ? a._prev = i : t[n] === e && (t[n] = i), e._dp = t, e._next = e._prev = e.parent = null
    }

    function oa(t, e) {
        !t.parent || e && !t.parent.autoRemoveChildren || t.parent.remove(t), t._act = 0
    }

    function pa(t) {
        for (var e = t; e;) e._dirty = 1, e = e.parent;
        return t
    }

    function sa(t) {
        return t._repeat ? _t(t._tTime, t = t.duration() + t._rDelay) * t : 0
    }

    function ua(t, e) {
        return 0 < e._ts ? (t - e._start) * e._ts : (e._dirty ? e.totalDuration() : e._tDur) + (t - e._start) * e._ts
    }

    function va(t, e, r) {
        if (e.parent && oa(e), e._start = r + e._delay, e._end = e._start + (e.totalDuration() / e._ts || 0), function _addLinkedListItem(t, e, r, n, i) {
                void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
                var a, s = t[n];
                if (i)
                    for (a = e[i]; s && s[i] > a;) s = s._prev;
                s ? (e._next = s._next, s._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = s, e.parent = t
            }(t, e, "_first", "_last", t._sort ? "_start" : 0), (t._recent = e)._time || !e._dur && e._initted) {
            var n = (t.rawTime() - e._start) * e._ts;
            (!e._dur || gt(0, e.totalDuration(), n) - e._tTime > R) && e.render(n, !0)
        }
        if (pa(t), t._dp && t._time >= t._dur && t._ts && t._dur < t.duration())
            for (var i = t; i._dp;) i.totalTime(i._tTime, !0), i = i._dp;
        return t
    }

    function wa(t, e, r, n) {
        return It(t, e), t._initted ? !r && t._pt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) ? (ot.push(t), t._lazy = [e, n], 1) : void 0 : 1
    }

    function za(t) {
        if (t instanceof Rt) return pa(t);
        var e = t._repeat;
        return t._tDur = e ? e < 0 ? 1e20 : $(t._dur * (e + 1) + t._rDelay * e) : t._dur, pa(t.parent), t
    }

    function Ba(t, e) {
        var r, i, a = t.labels,
            s = t._recent || mt,
            o = t.duration() >= D ? s.endTime(!1) : t._dur;
        return n(e) && (isNaN(e) || e in a) ? "<" === (r = e.charAt(0)) || ">" === r ? ("<" === r ? s._start : s.endTime(0 <= s._repeat)) + (parseFloat(e.substr(1)) || 0) : (r = e.indexOf("=")) < 0 ? (e in a || (a[e] = o), a[e]) : (i = +(e.charAt(r - 1) + e.substr(r + 1)), 1 < r ? Ba(t, e.substr(0, r - 1)) + i : o + i) : null == e ? o : +e
    }

    function Ca(t, e) {
        return t || 0 === t ? e(t) : e
    }

    function Ea(t) {
        return (t + "").substr((parseFloat(t) + "").length)
    }

    function Ha(t) {
        return t && r(t) && "length" in t && t.length - 1 in t && r(t[0]) && !t.nodeType && t !== i
    }

    function Ka(t) {
        if (o(t)) return t;
        var d = r(t) ? t : {
                each: t
            },
            _ = zt(d.ease),
            m = d.from || 0,
            g = parseFloat(d.base) || 0,
            v = {},
            e = 0 < m && m < 1,
            y = isNaN(m) || e,
            b = d.axis,
            w = m,
            T = m;
        return n(m) ? w = T = {
                center: .5,
                edges: .5,
                end: 1
            } [m] || 0 : !e && y && (w = m[0], T = m[1]),
            function (t, e, r) {
                var n, i, a, s, o, u, h, l, f, p = (r || d).length,
                    c = v[p];
                if (!c) {
                    if (!(f = "auto" === d.grid ? 0 : (d.grid || [1, D])[1])) {
                        for (h = -D; h < (h = r[f++].getBoundingClientRect().left) && f < p;);
                        f--
                    }
                    for (c = v[p] = [], n = y ? Math.min(f, p) * w - .5 : m % f, i = y ? p * T / f - .5 : m / f | 0, l = D, u = h = 0; u < p; u++) a = u % f - n, s = i - (u / f | 0), c[u] = o = b ? Math.abs("y" === b ? s : a) : V(a * a + s * s), h < o && (h = o), o < l && (l = o);
                    c.max = h - l, c.min = l, c.v = p = (parseFloat(d.amount) || parseFloat(d.each) * (p < f ? p - 1 : b ? "y" === b ? p / f : f : Math.max(f, p / f)) || 0) * ("edges" === m ? -1 : 1), c.b = p < 0 ? g - p : g, c.u = Ea(d.amount || d.each) || 0, _ = _ && p < 0 ? Dt(_) : _
                }
                return p = (c[t] - c.min) / c.max || 0, $(c.b + (_ ? _(p) : p) * c.v) + c.u
            }
    }

    function La(e) {
        var r = e < 1 ? Math.pow(10, (e + "").length - 2) : 1;
        return function (t) {
            return ~~(Math.round(parseFloat(t) / e) * e * r) / r + (p(t) ? 0 : Ea(t))
        }
    }

    function Ma(u, t) {
        var h, l, e = G(u);
        return !e && r(u) && (h = e = u.radius || D, u = yt(u.values), (l = !p(u[0])) && (h *= h)), Ca(t, e ? function (t) {
            for (var e, r, n = parseFloat(l ? t.x : t), i = parseFloat(l ? t.y : 0), a = D, s = 0, o = u.length; o--;)(e = l ? (e = u[o].x - n) * e + (r = u[o].y - i) * r : Math.abs(u[o] - n)) < a && (a = e, s = o);
            return s = !h || a <= h ? u[s] : t, l || s === t || p(t) ? s : s + Ea(t)
        } : La(u))
    }

    function Na(t, e, r, n) {
        return Ca(G(t) ? !e : !0 === r ? !!(r = 0) : !n, function () {
            return G(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && ~~(Math.round((t + Math.random() * (e - t)) / r) * r * n) / n
        })
    }

    function Ra(e, r, t) {
        return Ca(t, function (t) {
            return e[~~r(t)]
        })
    }

    function Ua(t) {
        for (var e, r, n, i, a = 0, s = ""; ~(e = t.indexOf("random(", a));) n = t.indexOf(")", e), i = "[" === t.charAt(e + 7), r = t.substr(e + 7, n - e - 7).match(i ? it : H), s += t.substr(a, e - a) + Na(i ? r : +r[0], +r[1], +r[2] || 1e-5), a = n + 1;
        return s + t.substr(a, t.length - a)
    }

    function Xa(t, e, r) {
        var n, i, a, s = t.labels,
            o = D;
        for (n in s)(i = s[n] - e) < 0 == !!r && i && o > (i = Math.abs(i)) && (a = n, o = i);
        return a
    }

    function Za(t) {
        return oa(t), t.progress() < 1 && wt(t, "onInterrupt"), t
    }

    function cb(t, e, r) {
        return (6 * (t = t < 0 ? t + 1 : 1 < t ? t - 1 : t) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * Tt + .5 | 0
    }

    function db(t, e) {
        var r, n, i, a, s, o, u, h, l, f, c = t ? p(t) ? [t >> 16, t >> 8 & Tt, t & Tt] : 0 : xt.black;
        if (!c) {
            if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), xt[t]) c = xt[t];
            else if ("#" === t.charAt(0)) 4 === t.length && (t = "#" + (r = t.charAt(1)) + r + (n = t.charAt(2)) + n + (i = t.charAt(3)) + i), c = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & Tt, t & Tt];
            else if ("hsl" === t.substr(0, 3))
                if (c = f = t.match(H), e) {
                    if (~t.indexOf("=")) return t.match(tt)
                } else a = +c[0] % 360 / 360, s = c[1] / 100, r = 2 * (o = c[2] / 100) - (n = o <= .5 ? o * (s + 1) : o + s - o * s), 3 < c.length && (c[3] *= 1), c[0] = cb(a + 1 / 3, r, n), c[1] = cb(a, r, n), c[2] = cb(a - 1 / 3, r, n);
            else c = t.match(H) || xt.transparent;
            c = c.map(Number)
        }
        return e && !f && (r = c[0] / Tt, n = c[1] / Tt, i = c[2] / Tt, o = ((u = Math.max(r, n, i)) + (h = Math.min(r, n, i))) / 2, u === h ? a = s = 0 : (l = u - h, s = .5 < o ? l / (2 - u - h) : l / (u + h), a = u === r ? (n - i) / l + (n < i ? 6 : 0) : u === n ? (i - r) / l + 2 : (r - n) / l + 4, a *= 60), c[0] = a + .5 | 0, c[1] = 100 * s + .5 | 0, c[2] = 100 * o + .5 | 0), c
    }

    function eb(t, e) {
        var r, n, i, a = (t + "").match(kt),
            s = 0,
            o = "";
        if (!a) return t;
        for (r = 0; r < a.length; r++) n = a[r], s += (i = t.substr(s, t.indexOf(n, s) - s)).length + n.length, 3 === (n = db(n, e)).length && n.push(1), o += i + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
        return o + t.substr(s)
    }

    function hb(t) {
        var e, r = t.join(" ");
        kt.lastIndex = 0, kt.test(r) && (e = Ot.test(r), t[0] = eb(t[0], e), t[1] = eb(t[1], e))
    }

    function pb(t) {
        var e = (t + "").split("("),
            r = Pt[e[0]];
        return r && 1 < e.length && r.config ? r.config.apply(null, ~t.indexOf("{") ? [function _parseObjectInString(t) {
            for (var e, r, n, i = {}, a = t.substr(1, t.length - 3).split(":"), s = a[0], o = 1, u = a.length; o < u; o++) r = a[o], e = o !== u - 1 ? r.lastIndexOf(",") : r.length, n = r.substr(0, e), i[s] = isNaN(n) ? n.replace(At, "").trim() : +n, s = r.substr(e + 1).trim();
            return i
        }(e[1])] : rt.exec(t)[1].split(",").map(da)) : Pt._CE && St.test(t) ? Pt._CE("", t) : r
    }

    function sb(t, e, r, n) {
        void 0 === r && (r = function easeOut(t) {
            return 1 - e(1 - t)
        }), void 0 === n && (n = function easeInOut(t) {
            return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
        });
        var i, a = {
            easeIn: e,
            easeOut: r,
            easeInOut: n
        };
        return Z(t, function (t) {
            for (var e in Pt[t] = at[t] = a, Pt[i = t.toLowerCase()] = r, a) Pt[i + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = Pt[t + "." + e] = a[e]
        }), a
    }

    function tb(e) {
        return function (t) {
            return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2
        }
    }

    function ub(r, t, e) {
        function xk(t) {
            return 1 === t ? 1 : n * Math.pow(2, -10 * t) * Q((t - a) * i) + 1
        }
        var n = 1 <= t ? t : 1,
            i = (e || (r ? .3 : .45)) / (t < 1 ? t : 1),
            a = i / z * (Math.asin(1 / n) || 0),
            s = "out" === r ? xk : "in" === r ? function (t) {
                return 1 - xk(1 - t)
            } : tb(xk);
        return i = z / i, s.config = function (t, e) {
            return ub(r, t, e)
        }, s
    }

    function vb(e, r) {
        function Fk(t) {
            return --t * t * ((r + 1) * t + r) + 1
        }
        void 0 === r && (r = 1.70158);
        var t = "out" === e ? Fk : "in" === e ? function (t) {
            return 1 - Fk(1 - t)
        } : tb(Fk);
        return t.config = function (t) {
            return vb(e, t)
        }, t
    }
    var E, i, a, h, l, f, c, d, m, g, v, y, b, w, T, x, k, O, C, P, S, A, I = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: {
                lineHeight: ""
            }
        },
        F = {
            duration: .5,
            overwrite: !1,
            delay: 0
        },
        D = 1e8,
        R = 1 / D,
        z = 2 * Math.PI,
        B = z / 4,
        U = 0,
        V = Math.sqrt,
        j = Math.cos,
        Q = Math.sin,
        G = Array.isArray,
        H = /(?:-?\.?\d|\.)+/gi,
        tt = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
        et = /[-+=\.]*\d+(?:\.|e-|e)*\d*/gi,
        rt = /\(([^()]+)\)/i,
        nt = /[\+-]=-?[\.\d]+/,
        it = /[#\-+\.]*\b[a-z\d-=+%.]+/gi,
        at = {},
        st = {},
        ot = [],
        ut = {},
        ht = {},
        lt = {},
        ft = 30,
        pt = [],
        ct = "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
        dt = function _merge(t, e) {
            for (var r in e) t[r] = e[r];
            return t
        },
        _t = function _animationCycle(t, e) {
            return (t /= e) && ~~t === t ? ~~t - 1 : ~~t
        },
        mt = {
            _start: 0,
            endTime: N
        },
        gt = function _clamp(t, e, r) {
            return r < t ? t : e < r ? e : r
        },
        vt = [].slice,
        yt = function toArray(t, e) {
            return !n(t) || e || !a && Ct() ? G(t) ? function _flatten(t, r, i) {
                return void 0 === i && (i = []), t.forEach(function (t) {
                    var e;
                    return n(t) && !r || Ha(t) ? (e = i).push.apply(e, yt(t)) : i.push(t)
                }) || i
            }(t, e) : Ha(t) ? vt.call(t, 0) : t ? [t] : [] : vt.call(h.querySelectorAll(t), 0)
        },
        bt = function mapRange(e, t, r, n, i) {
            var a = t - e,
                s = n - r;
            return Ca(i, function (t) {
                return r + (t - e) / a * s
            })
        },
        wt = function _callback(t, e, r) {
            var n, i, a = t.vars,
                s = a[e];
            if (s) return n = a[e + "Params"], i = a.callbackScope || t, r && ot.length && ba(), n ? s.apply(i, n) : s.call(i)
        },
        Tt = 255,
        xt = {
            aqua: [0, Tt, Tt],
            lime: [0, Tt, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, Tt],
            navy: [0, 0, 128],
            white: [Tt, Tt, Tt],
            olive: [128, 128, 0],
            yellow: [Tt, Tt, 0],
            orange: [Tt, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [Tt, 0, 0],
            pink: [Tt, 192, 203],
            cyan: [0, Tt, Tt],
            transparent: [Tt, Tt, Tt, 0]
        },
        kt = function () {
            var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (t in xt) e += "|" + t + "\\b";
            return new RegExp(e + ")", "gi")
        }(),
        Ot = /hsl[a]?\(/,
        Mt = (b = Date.now, w = 500, T = 33, x = b(), k = x, C = O = 1 / 60, y = {
            time: 0,
            frame: 0,
            tick: function tick() {
                Dj(!0)
            },
            wake: function wake() {
                f && (!a && t() && (i = a = window, h = i.document || {}, at.gsap = ne, (i.gsapVersions || (i.gsapVersions = [])).push(ne.version), J(l || i.GreenSockGlobals || !i.gsap && i || {}), v = i.requestAnimationFrame), m && y.sleep(), g = v || function (t) {
                    return setTimeout(t, 1e3 * (C - y.time) + 1 | 0)
                }, d = 1, Dj(2))
            },
            sleep: function sleep() {
                (v ? i.cancelAnimationFrame : clearTimeout)(m), d = 0, g = N
            },
            lagSmoothing: function lagSmoothing(t, e) {
                w = t || 1e8, T = Math.min(e, w, 0)
            },
            fps: function fps(t) {
                O = 1 / (t || 60), C = y.time + O
            },
            add: function add(t) {
                P.indexOf(t) < 0 && P.push(t), Ct()
            },
            remove: function remove(t) {
                var e;
                ~(e = P.indexOf(t)) && P.splice(e, 1)
            },
            _listeners: P = []
        }),
        Ct = function _wake() {
            return !d && Mt.wake()
        },
        Pt = {},
        St = /^[\d.\-M][\d.\-,\s]/,
        At = /["']/g,
        Dt = function _invertEase(e) {
            return function (t) {
                return 1 - e(1 - t)
            }
        },
        zt = function _parseEase(t, e) {
            return t && (o(t) ? t : Pt[t] || pb(t)) || e
        };

    function Dj(e) {
        var t, r, n = b() - k,
            i = !0 === e;
        w < n && (x += n - T), k += n, y.time = (k - x) / 1e3, (0 < (t = y.time - C) || i) && (y.frame++, C += t + (O <= t ? .004 : O - t), r = 1), i || (m = g(Dj)), r && P.forEach(function (t) {
            return t(y.time, n, y.frame, e)
        })
    }

    function Wk(t) {
        return t < A ? S * t * t : t < .7272727272727273 ? S * Math.pow(t - 1.5 / 2.75, 2) + .75 : t < .9090909090909092 ? S * (t -= 2.25 / 2.75) * t + .9375 : S * Math.pow(t - 2.625 / 2.75, 2) + .984375
    }
    Z("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
        var r = e < 5 ? e + 1 : e;
        sb(t + ",Power" + (r - 1), e ? function (t) {
            return Math.pow(t, r)
        } : function (t) {
            return t
        }, function (t) {
            return 1 - Math.pow(1 - t, r)
        }, function (t) {
            return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2
        })
    }), Pt.Linear.easeNone = Pt.none = Pt.Linear.easeIn, sb("Elastic", ub("in"), ub("out"), ub()), S = 7.5625, A = 1 / 2.75, sb("Bounce", function (t) {
        return 1 - Wk(1 - t)
    }, Wk), sb("Expo", function (t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0
    }), sb("Circ", function (t) {
        return -(V(1 - t * t) - 1)
    }), sb("Sine", function (t) {
        return 1 - j(t * B)
    }), sb("Back", vb("in"), vb("out"), vb()), Pt.SteppedEase = Pt.steps = at.SteppedEase = {
        config: function config(t, e) {
            void 0 === t && (t = 1);
            var r = 1 / t,
                n = t + (e ? 0 : 1),
                i = e ? 1 : 0;
            return function (t) {
                return ((n * gt(0, .99999999, t) | 0) + i) * r
            }
        }
    }, F.ease = Pt["quad.out"];
    var Bt, Et = function GSCache(t, e) {
            this.id = U++, (t._gsap = this).target = t, this.harness = e, this.get = e ? e.get : Y, this.set = e ? e.getSetter : jt
        },
        Ft = ((Bt = Animation.prototype).delay = function delay(t) {
            return t || 0 === t ? (this._delay = t, this) : this._delay
        }, Bt.duration = function duration(t) {
            var e = arguments.length,
                r = this._repeat,
                n = 0 < r ? r * ((e ? t : this._dur) + this._rDelay) : 0;
            return e ? this.totalDuration(r < 0 ? t : t + n) : this.totalDuration() && this._dur
        }, Bt.totalDuration = function totalDuration(t) {
            if (!arguments.length) return this._tDur;
            var e = this._repeat,
                r = (t || this._rDelay) && e < 0;
            return this._tDur = r ? 1e20 : t, this._dur = r ? t : (t - e * this._rDelay) / (e + 1), this._dirty = 0, pa(this.parent), this
        }, Bt.totalTime = function totalTime(t, e) {
            if (Ct(), !arguments.length) return this._tTime;
            var r, n = this.parent || this._dp;
            if (n && n.smoothChildTiming && this._ts) {
                for (r = this._start, this._start = n._time - (0 < this._ts ? t / this._ts : ((this._dirty ? this.totalDuration() : this._tDur) - t) / -this._ts), this._end += this._start - r, n._dirty || pa(n); n.parent;) n.parent._time !== n._start + (0 < n._ts ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
                this.parent || va(this._dp, this, this._start - this._delay)
            }
            return this._tTime === t && this._dur || (this._ts || (this._pTime = t), ca(this, t, e)), this
        }, Bt.time = function time(t, e) {
            return arguments.length ? this.totalTime((t + sa(this)) % this.duration() || (t ? this._dur : 0), e) : this._time
        }, Bt.totalProgress = function totalProgress(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._tTime / this.totalDuration()
        }, Bt.progress = function progress(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + sa(this), e) : this.duration() ? this._time / this._dur : this.ratio
        }, Bt.iteration = function iteration(t, e) {
            var r = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? _t(this._tTime, r) + 1 : 1
        }, Bt.timeScale = function timeScale(t) {
            return arguments.length ? null !== this._pauseTS ? (this._pauseTS = t, this) : (this._ts = t, function _recacheAncestors(t) {
                for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;
                return t
            }(this).totalTime(this._tTime, !0)) : this._ts || this._pauseTS || 0
        }, Bt.paused = function paused(t) {
            var e = !this._ts;
            return arguments.length ? (e !== t && (t ? (this._pauseTS = this._ts, this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (this._ts = this._pauseTS || 1, this._pauseTS = null, t = this._tTime || this._pTime, 1 === this.progress() && (this._tTime -= R), this.totalTime(t, !0))), this) : e
        }, Bt.startTime = function startTime(t) {
            return arguments.length ? (this.parent && this.parent._sort && va(this.parent, this, t - this._delay), this) : this._start
        }, Bt.endTime = function endTime(t) {
            return this._start + (s(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts)
        }, Bt.rawTime = function rawTime(t) {
            var e = this.parent || this._dp;
            return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ua(e.rawTime(t), this) : this._tTime : this._tTime
        }, Bt.repeat = function repeat(t) {
            return arguments.length ? (this._repeat = t, za(this)) : this._repeat
        }, Bt.repeatDelay = function repeatDelay(t) {
            return arguments.length ? (this._rDelay = t, za(this)) : this._rDelay
        }, Bt.yoyo = function yoyo(t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, Bt.seek = function seek(t, e) {
            return this.totalTime(Ba(this, t), s(e))
        }, Bt.restart = function restart(t, e) {
            return this.play().totalTime(t ? -this._delay : 0, s(e))
        }, Bt.play = function play(t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, Bt.reverse = function reverse(t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, Bt.pause = function pause(t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, Bt.resume = function resume() {
            return this.paused(!1)
        }, Bt.reversed = function reversed(t) {
            var e = this._ts || this._pauseTS || 0;
            return arguments.length ? (t !== this.reversed() && (this[null === this._pauseTS ? "_ts" : "_pauseTS"] = Math.abs(e) * (t ? -1 : 1), this.totalTime(this._tTime, !0)), this) : e < 0
        }, Bt.invalidate = function invalidate() {
            return this._initted = 0, this
        }, Bt.isActive = function isActive(t) {
            var e, r = this.parent || this._dp,
                n = this._start;
            return !r || this._ts && (this._initted || !t) && r.isActive(t) && (e = r.rawTime(!0)) >= n && e < this.endTime(!0) - R
        }, Bt.eventCallback = function eventCallback(t, e, r) {
            var n = this.vars;
            return 1 < arguments.length ? (e ? (n[t] = e, r && (n[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete n[t], this) : n[t]
        }, Bt.then = function then(t) {
            var n = this;
            return new Promise(function (e) {
                function om() {
                    var t = n.then;
                    n.then = null, (r = r(n)) && (r.then || r === n) && (n._prom = r, n.then = t), e(r), n.then = t
                }
                var r = t || ea;
                n._initted && 1 === n.totalProgress() && 0 <= n._ts || !n._tTime && n._ts < 0 ? om() : n._prom = om
            })
        }, Bt.kill = function kill() {
            Za(this)
        }, Animation);

    function Animation(t, e) {
        var r = t.parent || E;
        this.vars = t, this._dur = this._tDur = +t.duration || 0, this._delay = +t.delay || 0, (this._repeat = t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase, za(this)), this._ts = 1, this.data = t.data, d || Mt.wake(), r && va(r, this, e || 0 === e ? e : r._time), t.reversed && this.reversed(!0), t.paused && this.paused(!0)
    }
    fa(Ft.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: 0,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -R,
        _prom: 0,
        _pauseTS: null
    });
    var Rt = function (i) {
        function Timeline(t, e) {
            var r;
            return void 0 === t && (t = {}), (r = i.call(this, t, e) || this).labels = {}, r.smoothChildTiming = s(t.smoothChildTiming), r.autoRemoveChildren = !!t.autoRemoveChildren, r._sort = s(t.sortChildren), r
        }
        _inheritsLoose(Timeline, i);
        var t = Timeline.prototype;
        return t.to = function to(t, e, r, n) {
            return new Yt(t, aa(arguments, 0, this), Ba(this, p(e) ? n : r)), this
        }, t.from = function from(t, e, r, n) {
            return new Yt(t, aa(arguments, 1, this), Ba(this, p(e) ? n : r)), this
        }, t.fromTo = function fromTo(t, e, r, n, i) {
            return new Yt(t, aa(arguments, 2, this), Ba(this, p(e) ? i : n)), this
        }, t.set = function set(t, e, r) {
            return e.duration = 0, e.parent = this, e.repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new Yt(t, e, Ba(this, r)), this
        }, t.call = function call(t, e, r) {
            return va(this, Yt.delayedCall(0, t, e), Ba(this, r))
        }, t.staggerTo = function staggerTo(t, e, r, n, i, a, s) {
            return r.duration = e, r.stagger = r.stagger || n, r.onComplete = a, r.onCompleteParams = s, r.parent = this, new Yt(t, r, Ba(this, i)), this
        }, t.staggerFrom = function staggerFrom(t, e, r, n, i, a, o) {
            return r.runBackwards = 1, r.immediateRender = s(r.immediateRender), this.staggerTo(t, e, r, n, i, a, o)
        }, t.staggerFromTo = function staggerFromTo(t, e, r, n, i, a, o, u) {
            return n.startAt = r, n.immediateRender = s(n.immediateRender), this.staggerTo(t, e, n, i, a, o, u)
        }, t.render = function render(t, e, r) {
            var n, i, a, s, o, u, h, l, f, p, c, d = this._time,
                _ = this._dirty ? this.totalDuration() : this._tDur,
                m = this._dur,
                g = _ - R < t && 0 <= t && this !== E ? _ : t < R ? 0 : t,
                v = this._zTime < 0 != t < 0 && (this._initted || !m);
            if (g !== this._tTime || r || v) {
                if (v && (m || (d = this._zTime), !t && e || (this._zTime = t)), n = g, f = this._start, u = 0 === (l = this._ts), d !== this._time && m && (n += this._time - d), this._repeat && (c = this._yoyo, o = m + this._rDelay, (m < (n = $(g % o)) || _ === g) && (n = m), (s = ~~(g / o)) && s === g / o && (n = m, s--), c && 1 & s && (n = m - n), s !== (p = _t(this._tTime, o)) && !this._lock)) {
                    var y = c && 1 & p,
                        b = y === (c && 1 & s);
                    if (s < p && (y = !y), d = y ? 0 : m, this._lock = 1, this.render(d, e, !m)._lock = 0, !e && this.parent && wt(this, "onRepeat"), d !== this._time || u != !this._ts) return this;
                    if (b && (this._lock = 2, d = y ? m + 1e-4 : -1e-4, this.render(d, !0)), this._lock = 0, !this._ts && !u) return this
                }
                if (this._hasPause && !this._forcing && this._lock < 2 && (h = function _findNextPauseTween(t, e, r) {
                        var n;
                        if (e < r)
                            for (n = t._first; n && n._start <= r;) {
                                if (!n._dur && "isPause" === n.data && n._start > e) return n;
                                n = n._next
                            } else
                                for (n = t._last; n && n._start >= r;) {
                                    if (!n._dur && "isPause" === n.data && n._start < e) return n;
                                    n = n._prev
                                }
                    }(this, $(d), $(n))) && (g -= n - (n = h._start)), this._tTime = g, this._time = n, this._act = !l, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1), d || !n || e || wt(this, "onStart"), d <= n && 0 <= t)
                    for (i = this._first; i;) {
                        if (a = i._next, (i._act || n >= i._start) && i._ts && h !== i) {
                            if (i.parent !== this) return this.render(t, e, r);
                            if (i.render(0 < i._ts ? (n - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (n - i._start) * i._ts, e, r), n !== this._time || !this._ts && !u) {
                                h = 0;
                                break
                            }
                        }
                        i = a
                    } else {
                        i = this._last;
                        for (var w = t < 0 ? t : n; i;) {
                            if (a = i._prev, (i._act || w <= i._end) && i._ts && h !== i) {
                                if (i.parent !== this) return this.render(t, e, r);
                                if (i.render(0 < i._ts ? (w - i._start) * i._ts : (i._dirty ? i.totalDuration() : i._tDur) + (w - i._start) * i._ts, e, r), n !== this._time || !this._ts && !u) {
                                    h = 0;
                                    break
                                }
                            }
                            i = a
                        }
                    }
                if (h && !e && (this.pause(), h.render(d <= n ? 0 : -R)._zTime = d <= n ? 1 : -1, this._ts)) return this._start = f, this.render(t, e, r);
                this._onUpdate && !e && wt(this, "onUpdate", !0), (g === _ || !g && this._ts < 0) && (f !== this._start && Math.abs(l) === Math.abs(this._ts) || (!n || _ >= this.totalDuration()) && (!t && m || oa(this, 1), e || t < 0 && !d || (wt(this, g === _ ? "onComplete" : "onReverseComplete", !0), this._prom && this._prom())))
            }
            return this
        }, t.add = function add(t, e) {
            var r = this;
            if (p(e) || (e = Ba(this, e)), !(t instanceof Ft)) {
                if (G(t)) return t.forEach(function (t) {
                    return r.add(t, e)
                }), pa(this);
                if (n(t)) return this.addLabel(t, e);
                if (!o(t)) return this;
                t = Yt.delayedCall(0, t)
            }
            return this !== t ? va(this, t, e) : this
        }, t.getChildren = function getChildren(t, e, r, n) {
            void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === n && (n = -D);
            for (var i = [], a = this._first; a;) a._start >= n && (a instanceof Yt ? e && i.push(a) : (r && i.push(a), t && i.push.apply(i, a.getChildren(!0, e, r)))), a = a._next;
            return i
        }, t.getById = function getById(t) {
            for (var e = this.getChildren(1, 1, 1), r = e.length; r--;)
                if (e[r].vars.id === t) return e[r]
        }, t.remove = function remove(t) {
            return n(t) ? this.removeLabel(t) : o(t) ? this.killTweensOf(t) : (na(this, t), t === this._recent && (this._recent = this._last), pa(this))
        }, t.totalTime = function totalTime(t, e) {
            return arguments.length ? (this._forcing = 1, this.parent || this._dp || !this._ts || (this._start = Mt.time - (0 < this._ts ? t / this._ts : (this.totalDuration() - t) / -this._ts)), i.prototype.totalTime.call(this, t, e), this._forcing = 0, this) : this._tTime
        }, t.addLabel = function addLabel(t, e) {
            return this.labels[t] = Ba(this, e), this
        }, t.removeLabel = function removeLabel(t) {
            return delete this.labels[t], this
        }, t.addPause = function addPause(t, e, r) {
            var n = Yt.delayedCall(0, e || N, r);
            return n.data = "isPause", this._hasPause = 1, va(this, n, Ba(this, t))
        }, t.removePause = function removePause(t) {
            var e = this._first;
            for (t = Ba(this, t); e;) e._start === t && "isPause" === e.data && oa(e), e = e._next
        }, t.killTweensOf = function killTweensOf(t, e, r) {
            for (var n = this.getTweensOf(t, r), i = n.length; i--;) Lt !== n[i] && n[i].kill(t, e);
            return this
        }, t.getTweensOf = function getTweensOf(t, e) {
            for (var r, n = [], i = yt(t), a = this._first; a;) a instanceof Yt ? !_(a._targets, i) || e && !a.isActive("started" === e) || n.push(a) : (r = a.getTweensOf(i, e)).length && n.push.apply(n, r), a = a._next;
            return n
        }, t.tweenTo = function tweenTo(t, e) {
            var r = this,
                n = Ba(r, t),
                i = e && e.startAt,
                a = Yt.to(r, fa({
                    ease: "none",
                    lazy: !1,
                    time: n,
                    duration: Math.abs(n - (i && "time" in i ? i.time : r._time)) / r.timeScale() || R,
                    onStart: function onStart() {
                        r.pause();
                        var t = Math.abs(n - r._time) / r.timeScale();
                        a._dur !== t && (a._dur = t, a.render(a._time, !0, !0)), e && e.onStart && e.onStart.apply(a, e.onStartParams || [])
                    }
                }, e));
            return a
        }, t.tweenFromTo = function tweenFromTo(t, e, r) {
            return this.tweenTo(e, fa({
                startAt: {
                    time: Ba(this, t)
                }
            }, r))
        }, t.recent = function recent() {
            return this._recent
        }, t.nextLabel = function nextLabel(t) {
            return void 0 === t && (t = this._time), Xa(this, Ba(this, t))
        }, t.previousLabel = function previousLabel(t) {
            return void 0 === t && (t = this._time), Xa(this, Ba(this, t), 1)
        }, t.currentLabel = function currentLabel(t) {
            return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + R)
        }, t.shiftChildren = function shiftChildren(t, e, r) {
            void 0 === r && (r = 0);
            for (var n, i = this._first, a = this.labels; i;) i._start >= r && (i._start += t), i = i._next;
            if (e)
                for (n in a) a[n] >= r && (a[n] += t);
            return pa(this)
        }, t.invalidate = function invalidate() {
            var t = this._first;
            for (this._lock = 0; t;) t.invalidate(), t = t._next;
            return i.prototype.invalidate.call(this)
        }, t.clear = function clear(t) {
            void 0 === t && (t = !0);
            for (var e, r = this._first; r;) e = r._next, this.remove(r), r = e;
            return this._time = this._tTime = 0, t && (this.labels = {}), pa(this)
        }, t.totalDuration = function totalDuration(t) {
            var e, r, n = 0,
                i = this,
                a = i._last,
                s = D,
                o = i._repeat,
                u = o * i._rDelay || 0,
                h = o < 0;
            if (arguments.length) return h ? i : i.timeScale(i.totalDuration() / t);
            if (i._dirty) {
                for (; a;) e = a._prev, a._dirty && a.totalDuration(), a._start > s && i._sort && a._ts && !i._lock ? (i._lock = 1, va(i, a, a._start - a._delay), i._lock = 0) : s = a._start, a._start < 0 && a._ts && (n -= a._start, (!i.parent && !i._dp || i.parent && i.parent.smoothChildTiming) && (i._start += a._start / i._ts, i._time -= a._start, i._tTime -= a._start), i.shiftChildren(-a._start, !1, -D), s = 0), n < (r = a._end = a._start + a._tDur / Math.abs(a._ts || a._pauseTS || R)) && a._ts && (n = $(r)), a = e;
                i._dur = i === E && i._time > n ? i._time : Math.min(D, n), i._tDur = h && (i._dur || u) ? 1e20 : Math.min(D, n * (o + 1) + u), i._end = i._start + (i._tDur / Math.abs(i._ts || i._pauseTS || R) || 0), i._dirty = 0
            }
            return i._tDur
        }, Timeline.updateRoot = function updateRoot(t) {
            if (E._ts && ca(E, ua(t, E)), Mt.frame >= ft) {
                ft += I.autoSleep || 120;
                var e = E._first;
                if ((!e || !e._ts) && I.autoSleep && Mt._listeners.length < 2) {
                    for (; e && !e._ts;) e = e._next;
                    e || Mt.sleep()
                }
            }
        }, Timeline
    }(Ft);
    fa(Rt.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });

    function Cb(t, e, i, a, s, u) {
        var h, l, f, p;
        if (ht[t] && !1 !== (h = new ht[t]).init(s, h.rawVars ? e[t] : function _processVars(t, e, i, a, s) {
                if (o(t) && (t = $t(t, s, e, i, a)), !r(t) || t.style && t.nodeType || G(t)) return n(t) ? $t(t, s, e, i, a) : t;
                var u, h = {};
                for (u in t) h[u] = $t(t[u], s, e, i, a);
                return h
            }(e[t], a, s, u, i), i, a, u) && (i._pt = l = new ee(i._pt, s, t, 0, 1, h.render, h, 0, h.priority), i !== c))
            for (f = i._ptLookup[i._targets.indexOf(s)], p = h._props.length; p--;) f[h._props[p]] = l;
        return h
    }
    var Lt, Nt = function _addPropTween(t, e, r, i, a, s, u, h, l) {
            o(i) && (i = i(a || 0, t, s));
            var f, p = t[e],
                c = "get" !== r ? r : o(p) ? l ? t[e.indexOf("set") || !o(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : p,
                d = o(p) ? l ? qt : Vt : Zt;
            if (n(i) && (~i.indexOf("random(") && (i = Ua(i)), "=" === i.charAt(1) && (i = parseFloat(c) + parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) + (Ea(c) || 0))), c !== i) return isNaN(c + i) ? (p || e in t || K(e, i), function _addComplexStringPropTween(t, e, r, n, i, a, s) {
                var o, u, h, l, f, p, c, d, _ = new ee(this._pt, t, e, 0, 1, Gt, null, i),
                    m = 0,
                    g = 0;
                for (_.b = r, _.e = n, r += "", (c = ~(n += "").indexOf("random(")) && (n = Ua(n)), a && (a(d = [r, n], t, e), r = d[0], n = d[1]), u = r.match(et) || []; o = et.exec(n);) l = o[0], f = n.substring(m, o.index), h ? h = (h + 1) % 5 : "rgba(" === f.substr(-5) && (h = 1), l !== u[g++] && (p = parseFloat(u[g - 1]) || 0, _._pt = {
                    _next: _._pt,
                    p: f || 1 === g ? f : ",",
                    s: p,
                    c: "=" === l.charAt(1) ? parseFloat(l.substr(2)) * ("-" === l.charAt(0) ? -1 : 1) : parseFloat(l) - p,
                    m: h && h < 4 ? Math.round : 0
                }, m = et.lastIndex);
                return _.c = m < n.length ? n.substring(m, n.length) : "", _.fp = s, (nt.test(n) || c) && (_.e = 0), this._pt = _
            }.call(this, t, e, c, i, d, h || I.stringFilter, l)) : (f = new ee(this._pt, t, e, +c || 0, i - (c || 0), "boolean" == typeof p ? Qt : Wt, 0, d), l && (f.fp = l), u && f.modifier(u, this, t), this._pt = f)
        },
        It = function _initTween(t, e) {
            var r, n, i, a, o, u, h, l, f, p, c, d, _ = t.vars,
                m = _.ease,
                g = _.startAt,
                v = _.immediateRender,
                y = _.lazy,
                b = _.onUpdate,
                w = _.onUpdateParams,
                T = _.callbackScope,
                x = _.runBackwards,
                k = _.yoyoEase,
                O = _.keyframes,
                M = _.autoRevert,
                C = t._dur,
                P = t._startAt,
                S = t._targets,
                A = t.parent,
                D = A && "nested" === A.data ? A.parent._targets : S,
                z = "auto" === t._overwrite,
                B = t.timeline;
            if (!B || O && m || (m = "none"), t._ease = zt(m, F.ease), t._yEase = k ? Dt(zt(!0 === k ? m : k, F.ease)) : 0, k && t._yoyo && !t._repeat && (k = t._yEase, t._yEase = t._ease, t._ease = k), !B) {
                if (P && P.render(-1, !0).kill(), g) {
                    if (oa(t._startAt = Yt.set(S, fa({
                            data: "isStart",
                            overwrite: !1,
                            parent: A,
                            immediateRender: !0,
                            lazy: s(y),
                            startAt: null,
                            delay: 0,
                            onUpdate: b,
                            onUpdateParams: w,
                            callbackScope: T,
                            stagger: 0
                        }, g))), v)
                        if (0 < e) M || (t._startAt = 0);
                        else if (C) return
                } else if (x && C)
                    if (P) M || (t._startAt = 0);
                    else if (e && (v = !1), oa(t._startAt = Yt.set(S, dt(ja(_, st), {
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: v && s(y),
                        immediateRender: v,
                        stagger: 0,
                        parent: A
                    }))), v) {
                    if (!e) return
                } else _initTween(t._startAt, R);
                for (r = ja(_, st), d = (l = S[t._pt = 0] ? X(S[0]).harness : 0) && _[l.prop], y = C && s(y) || y && !C, n = 0; n < S.length; n++) {
                    if (h = (o = S[n])._gsap || W(S)[n]._gsap, t._ptLookup[n] = p = {}, ut[h.id] && ba(), c = D === S ? n : D.indexOf(o), l && !1 !== (f = new l).init(o, d || r, t, c, D) && (t._pt = a = new ee(t._pt, o, f.name, 0, 1, f.render, f, 0, f.priority), f._props.forEach(function (t) {
                            p[t] = a
                        }), f.priority && (u = 1)), !l || d)
                        for (i in r) ht[i] && (f = Cb(i, r, t, c, o, D)) ? f.priority && (u = 1) : p[i] = a = Nt.call(t, o, i, "get", r[i], c, D, 0, _.stringFilter);
                    t._op && t._op[n] && t.kill(o, t._op[n]), z && t._pt && (Lt = t, E.killTweensOf(o, p, "started"), Lt = 0), t._pt && y && (ut[h.id] = 1)
                }
                u && te(t), t._onInit && t._onInit(t)
            }
            t._from = !B && !!_.runBackwards, t._onUpdate = b, t._initted = 1
        },
        $t = function _parseFuncOrString(t, e, r, i, a) {
            return o(t) ? t.call(e, r, i, a) : n(t) && ~t.indexOf("random(") ? Ua(t) : t
        },
        Xt = ct + ",repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
        Ut = (Xt + ",id,stagger,delay,duration,paused").split(","),
        Yt = function (O) {
            function Tween(t, e, n) {
                var i;
                "number" == typeof e && (n.duration = e, e = n, n = null);
                var a, o, h, l, f, c, d, _, m = (i = O.call(this, function _inheritDefaults(t) {
                        var e = t.parent || E,
                            r = t.keyframes ? ga : fa;
                        if (s(t.inherit))
                            for (; e;) r(t, e.vars.defaults), e = e.parent;
                        return t
                    }(e), n) || this).vars,
                    g = m.duration,
                    v = m.delay,
                    y = m.immediateRender,
                    b = m.stagger,
                    w = m.overwrite,
                    T = m.keyframes,
                    x = m.defaults,
                    k = G(t) && p(t[0]) ? [t] : yt(t);
                if (i._targets = k.length ? W(k) : L("GSAP target " + t + " not found. https://greensock.com", !I.nullTargetWarn) || [], i._ptLookup = [], i._overwrite = w, T || b || u(g) || u(v)) {
                    if (e = i.vars, (a = i.timeline = new Rt({
                            data: "nested",
                            defaults: x || {}
                        })).kill(), a.parent = _assertThisInitialized(i), T) fa(a.vars.defaults, {
                        ease: "none"
                    }), T.forEach(function (t) {
                        return a.to(k, t, ">")
                    });
                    else {
                        if (l = k.length, d = b ? Ka(b) : N, r(b))
                            for (f in b) ~Xt.indexOf(f) && ((_ = _ || {})[f] = b[f]);
                        for (o = 0; o < l; o++) {
                            for (f in h = {}, e) Ut.indexOf(f) < 0 && (h[f] = e[f]);
                            h.stagger = 0, _ && dt(h, _), e.yoyoEase && !e.repeat && (h.yoyoEase = e.yoyoEase), c = k[o], h.duration = +$t(g, _assertThisInitialized(i), o, c, k), h.delay = (+$t(v, _assertThisInitialized(i), o, c, k) || 0) - i._delay, !b && 1 === l && h.delay && (i._delay = v = h.delay, i._start += v, h.delay = 0), a.to(c, h, d(o, c, k))
                        }
                        g = v = 0
                    }
                    g || i.duration(g = a.duration())
                } else i.timeline = 0;
                return !0 === w && (Lt = _assertThisInitialized(i), E.killTweensOf(k), Lt = 0), (y || !g && !T && i._start === i.parent._time && s(y) && function _hasNoPausedAncestors(t) {
                    return !t || t._ts && _hasNoPausedAncestors(t.parent)
                }(_assertThisInitialized(i)) && "nested" !== i.parent.data) && (i._tTime = -R, i.render(Math.max(0, -v))), i
            }
            _inheritsLoose(Tween, O);
            var t = Tween.prototype;
            return t.render = function render(t, e, r) {
                var n, i, a, s, o, u, h, l, f, p = this._time,
                    c = this._tDur,
                    d = this._dur,
                    _ = c - R < t && 0 <= t ? c : t < R ? 0 : t;
                if (d) {
                    if (_ !== this._tTime || !t || r || this._startAt && this._zTime < 0 != t < 0) {
                        if (n = _, l = this.timeline, this._repeat) {
                            if (s = d + this._rDelay, d < (n = $(_ % s)) && (n = d), (a = ~~(_ / s)) && a === _ / s && (n = d, a--), (u = this._yoyo && 1 & a) && (f = this._yEase, n = d - n), o = _t(this._tTime, s), n === p && !r && this._initted) return this;
                            a !== o && this.vars.repeatRefresh && !this._lock && (this._lock = r = 1, this.render(s * a, !0).invalidate()._lock = 0)
                        }
                        if (!this._initted && wa(this, n, r, e)) return this;
                        for (this._tTime = _, this._time = n, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = h = (f || this._ease)(n / d), this._from && (this.ratio = h = 1 - h), p || !n || e || wt(this, "onStart"), i = this._pt; i;) i.r(h, i.d), i = i._next;
                        l && l.render(t < 0 ? t : !n && u ? -R : l._dur * h, e, r) || this._startAt && (this._zTime = t), this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, r), wt(this, "onUpdate")), this._repeat && a !== o && this.vars.onRepeat && !e && this.parent && wt(this, "onRepeat"), _ !== c && _ || this._tTime !== _ || (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, r), !t && d || !(_ || this._ts < 0) || oa(this, 1), e || t < 0 && !p || (wt(this, _ === c ? "onComplete" : "onReverseComplete", !0), this._prom && this._prom()))
                    }
                } else ! function _renderZeroDurationTween(t, e, r, n) {
                    var i, a = t._zTime < 0 ? 0 : 1,
                        s = e < 0 ? 0 : 1,
                        o = t._rDelay,
                        u = 0;
                    if (o && t._repeat && (u = gt(0, t._tDur, e), _t(u, o) !== _t(t._tTime, o) && (a = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), (t._initted || !wa(t, e, n, r)) && (s !== a || n || t._zTime === R || !e && t._zTime)) {
                        for (t._zTime = e || (r ? R : 0), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = u, r || wt(t, "onStart"), i = t._pt; i;) i.r(s, i.d), i = i._next;
                        !s && t._startAt && !t._onUpdate && t._start && t._startAt.render(e, !0, n), t._onUpdate && !r && wt(t, "onUpdate"), u && t._repeat && !r && t.parent && wt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (t.ratio && oa(t, 1), r || (wt(t, t.ratio ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
                    }
                }(this, t, e, r);
                return this
            }, t.targets = function targets() {
                return this._targets
            }, t.invalidate = function invalidate() {
                return this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), O.prototype.invalidate.call(this)
            }, t.kill = function kill(t, e) {
                if (void 0 === e && (e = "all"), !(t || e && "all" !== e) && (this._lazy = 0, this.parent)) return Za(this);
                if (this.timeline) return this.timeline.killTweensOf(t, e, Lt && !0 !== Lt.vars.overwrite), this;
                var r, i, a, s, o, u, h, l = this._targets,
                    f = t ? yt(t) : l,
                    p = this._ptLookup,
                    c = this._pt;
                if ((!e || "all" === e) && function _arraysMatch(t, e) {
                        for (var r = t.length, n = r === e.length; n && r-- && t[r] === e[r];);
                        return r < 0
                    }(l, f)) return Za(this);
                for (r = this._op = this._op || [], "all" !== e && (n(e) && (o = {}, Z(e, function (t) {
                        return o[t] = 1
                    }), e = o), e = function _addAliasesToVars(t, e) {
                        var r, n, i, a, s = t[0] ? X(t[0]).harness : 0,
                            o = s && s.aliases;
                        if (!o) return e;
                        for (n in r = dt({}, e), o)
                            if (n in r)
                                for (i = (a = o[n].split(",")).length; i--;) r[a[i]] = r[n];
                        return r
                    }(l, e)), h = l.length; h--;)
                    if (~f.indexOf(l[h]))
                        for (o in i = p[h], "all" === e ? (r[h] = e, s = i, a = {}) : (a = r[h] = r[h] || {}, s = e), s)(u = i && i[o]) && ("kill" in u.d && !0 !== u.d.kill(o) || na(this, u, "_pt"), delete i[o]), "all" !== a && (a[o] = 1);
                return this._initted && !this._pt && c && Za(this), this
            }, Tween.to = function to(t, e, r) {
                return new Tween(t, e, r)
            }, Tween.from = function from(t, e) {
                return new Tween(t, aa(arguments, 1))
            }, Tween.delayedCall = function delayedCall(t, e, r, n) {
                return new Tween(e, 0, {
                    immediateRender: !1,
                    lazy: !1,
                    overwrite: !1,
                    delay: t,
                    onComplete: e,
                    onReverseComplete: e,
                    onCompleteParams: r,
                    onReverseCompleteParams: r,
                    callbackScope: n
                })
            }, Tween.fromTo = function fromTo(t, e, r) {
                return new Tween(t, aa(arguments, 2))
            }, Tween.set = function set(t, e) {
                return e.duration = 0, e.repeatDelay || (e.repeat = 0), new Tween(t, e)
            }, Tween.killTweensOf = function killTweensOf(t, e, r) {
                return E.killTweensOf(t, e, r)
            }, Tween
        }(Ft);
    fa(Yt.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }), Z("staggerTo,staggerFrom,staggerFromTo", function (r) {
        Yt[r] = function () {
            var t = new Rt,
                e = yt(arguments);
            return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e)
        }
    });

    function Nb(t, e, r) {
        return t.setAttribute(e, r)
    }

    function Vb(t, e, r, n) {
        n.mSet(t, e, n.m.call(n.tween, r, n.mt), n)
    }
    var Zt = function _setterPlain(t, e, r) {
            return t[e] = r
        },
        Vt = function _setterFunc(t, e, r) {
            return t[e](r)
        },
        qt = function _setterFuncWithParam(t, e, r, n) {
            return t[e](n.fp, r)
        },
        jt = function _getSetter(t, e) {
            return o(t[e]) ? Vt : q(t[e]) && t.setAttribute ? Nb : Zt
        },
        Wt = function _renderPlain(t, e) {
            return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4, e)
        },
        Qt = function _renderBoolean(t, e) {
            return e.set(e.t, e.p, !!(e.s + e.c * t), e)
        },
        Gt = function _renderComplexString(t, e) {
            var r = e._pt,
                n = "";
            if (!t && e.b) n = e.b;
            else if (1 === t && e.e) n = e.e;
            else {
                for (; r;) n = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + n, r = r._next;
                n += e.c
            }
            e.set(e.t, e.p, n, e)
        },
        Ht = function _renderPropTweens(t, e) {
            for (var r = e._pt; r;) r.r(t, r.d), r = r._next
        },
        Kt = function _addPluginModifier(t, e, r, n) {
            for (var i, a = this._pt; a;) i = a._next, a.p === n && a.modifier(t, e, r), a = i
        },
        Jt = function _killPropTweensOf(t) {
            for (var e, r, n = this._pt; n;) r = n._next, n.p === t && !n.op || n.op === t ? na(this, n, "_pt") : n.dep || (e = 1), n = r;
            return !e
        },
        te = function _sortPropTweensByPriority(t) {
            for (var e, r, n, i, a = t._pt; a;) {
                for (e = a._next, r = n; r && r.pr > a.pr;) r = r._next;
                (a._prev = r ? r._prev : i) ? a._prev._next = a: n = a, (a._next = r) ? r._prev = a : i = a, a = e
            }
            t._pt = n
        },
        ee = (PropTween.prototype.modifier = function modifier(t, e, r) {
            this.mSet = this.mSet || this.set, this.set = Vb, this.m = t, this.mt = r, this.tween = e
        }, PropTween);

    function PropTween(t, e, r, n, i, a, s, o, u) {
        this.t = e, this.s = n, this.c = i, this.p = r, this.r = a || Wt, this.d = s || this, this.set = o || Zt, this.pr = u || 0, (this._next = t) && (t._prev = this)
    }
    Z(ct + ",parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert", function (t) {
        st[t] = 1, "on" === t.substr(0, 2) && (st[t + "Params"] = 1)
    }), at.TweenMax = at.TweenLite = Yt, at.TimelineLite = at.TimelineMax = Rt, E = new Rt({
        sortChildren: !1,
        defaults: F,
        autoRemoveChildren: !0,
        id: "root"
    }), I.stringFilter = hb;
    var re = {
        registerPlugin: function registerPlugin() {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
            e.forEach(function (t) {
                return function _createPlugin(t) {
                    var e = (t = !t.name && t.default || t).name,
                        r = o(t),
                        n = e && !r && t.init ? function () {
                            this._props = []
                        } : t,
                        i = {
                            init: N,
                            render: Ht,
                            add: Nt,
                            kill: Jt,
                            modifier: Kt,
                            rawVars: 0
                        },
                        a = {
                            targetTest: 0,
                            get: 0,
                            getSetter: jt,
                            aliases: {},
                            register: 0
                        };
                    if (Ct(), t !== n) {
                        if (ht[e]) return;
                        fa(n, fa(ja(t, i), a)), dt(n.prototype, dt(i, ja(t, a))), ht[n.prop = e] = n, t.targetTest && (pt.push(n), st[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
                    }
                    M(e, n), t.register && t.register(ne, n, ee)
                }(t)
            })
        },
        timeline: function timeline(t) {
            return new Rt(t)
        },
        getTweensOf: function getTweensOf(t, e) {
            return E.getTweensOf(t, e)
        },
        getProperty: function getProperty(i, t, e, r) {
            n(i) && (i = yt(i)[0]);
            var a = X(i || {}).get,
                s = e ? ea : da;
            return "native" === e && (e = ""), i ? t ? s((ht[t] && ht[t].get || a)(i, t, e, r)) : function (t, e, r) {
                return s((ht[t] && ht[t].get || a)(i, t, e, r))
            } : i
        },
        quickSetter: function quickSetter(r, e, n) {
            if (1 < (r = yt(r)).length) {
                var i = r.map(function (t) {
                        return ne.quickSetter(t, e, n)
                    }),
                    a = i.length;
                return function (t) {
                    for (var e = a; e--;) i[e](t)
                }
            }
            r = r[0] || {};
            var s = ht[e],
                o = X(r),
                u = s ? function (t) {
                    var e = new s;
                    c._pt = 0, e.init(r, n ? t + n : t, c, 0, [r]), e.render(1, e), c._pt && Ht(1, c)
                } : o.set(r, e);
            return s ? u : function (t) {
                return u(r, e, n ? t + n : t, o, 1)
            }
        },
        isTweening: function isTweening(t) {
            return 0 < E.getTweensOf(t, !0).length
        },
        defaults: function defaults(t) {
            return t && t.ease && (t.ease = zt(t.ease, F.ease)), ia(F, t || {})
        },
        config: function config(t) {
            return ia(I, t || {})
        },
        registerEffect: function registerEffect(t) {
            var i = t.name,
                n = t.effect,
                e = t.plugins,
                a = t.defaults,
                s = t.extendTimeline;
            (e || "").split(",").forEach(function (t) {
                return t && !ht[t] && !at[t] && L(i + " effect requires " + t + " plugin.")
            }), lt[i] = function (t, e) {
                return n(yt(t), fa(e || {}, a))
            }, s && (Rt.prototype[i] = function (t, e, n) {
                return this.add(lt[i](t, r(e) ? e : (n = e) && {}), n)
            })
        },
        registerEase: function registerEase(t, e) {
            Pt[t] = zt(e)
        },
        parseEase: function parseEase(t, e) {
            return arguments.length ? zt(t, e) : Pt
        },
        getById: function getById(t) {
            return E.getById(t)
        },
        exportRoot: function exportRoot(t, e) {
            void 0 === t && (t = {});
            var r, n, i = new Rt(t);
            for (i.smoothChildTiming = s(t.smoothChildTiming), E.remove(i), i._dp = 0, i._time = i._tTime = E._time, r = E._first; r;) n = r._next, !e && !r._dur && r instanceof Yt && r.vars.onComplete === r._targets[0] || va(i, r, r._start - r._delay), r = n;
            return va(E, i, 0), i
        },
        utils: {
            wrap: function wrap(e, t, r) {
                var n = t - e;
                return G(e) ? Ra(e, wrap(0, e.length), t) : Ca(r, function (t) {
                    return (n + (t - e) % n) % n + e
                })
            },
            wrapYoyo: function wrapYoyo(e, t, r) {
                var n = t - e,
                    i = 2 * n;
                return G(e) ? Ra(e, wrapYoyo(0, e.length - 1), t) : Ca(r, function (t) {
                    return e + (n < (t = (i + (t - e) % i) % i) ? i - t : t)
                })
            },
            distribute: Ka,
            random: Na,
            snap: Ma,
            normalize: function normalize(t, e, r) {
                return bt(t, e, 0, 1, r)
            },
            getUnit: Ea,
            clamp: function clamp(e, r, t) {
                return Ca(t, function (t) {
                    return gt(e, r, t)
                })
            },
            splitColor: db,
            toArray: yt,
            mapRange: bt,
            pipe: function pipe() {
                for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                return function (t) {
                    return e.reduce(function (t, e) {
                        return e(t)
                    }, t)
                }
            },
            unitize: function unitize(e, r) {
                return function (t) {
                    return e(parseFloat(t)) + (r || Ea(t))
                }
            },
            interpolate: function interpolate(e, r, t, i) {
                var a = isNaN(e + r) ? 0 : function (t) {
                    return (1 - t) * e + t * r
                };
                if (!a) {
                    var s, o, u, h, l, f = n(e),
                        p = {};
                    if (!0 === t && (i = 1) && (t = null), f) e = {
                        p: e
                    }, r = {
                        p: r
                    };
                    else if (G(e) && !G(r)) {
                        for (u = [], h = e.length, l = h - 2, o = 1; o < h; o++) u.push(interpolate(e[o - 1], e[o]));
                        h--, a = function func(t) {
                            t *= h;
                            var e = Math.min(l, ~~t);
                            return u[e](t - e)
                        }, t = r
                    } else i || (e = dt(G(e) ? [] : {}, e));
                    if (!u) {
                        for (s in r) Nt.call(p, e, s, "get", r[s]);
                        a = function func(t) {
                            return Ht(t, p) || (f ? e.p : e)
                        }
                    }
                }
                return Ca(t, a)
            }
        },
        install: J,
        effects: lt,
        ticker: Mt,
        updateRoot: Rt.updateRoot,
        plugins: ht,
        globalTimeline: E,
        core: {
            PropTween: ee,
            globals: M,
            Tween: Yt,
            Timeline: Rt,
            Animation: Ft,
            getCache: X
        }
    };
    Z("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
        return re[t] = Yt[t]
    }), Mt.add(Rt.updateRoot), c = re.to({}, {
        duration: 0
    });

    function Zb(t, e) {
        for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;) r = r._next;
        return r
    }

    function _b(t, a) {
        return {
            name: t,
            rawVars: 1,
            init: function init(t, i, e) {
                e._onInit = function (t) {
                    var e, r;
                    if (n(i) && (e = {}, Z(i, function (t) {
                            return e[t] = 1
                        }), i = e), a) {
                        for (r in e = {}, i) e[r] = a(i[r]);
                        i = e
                    }! function _addModifiers(t, e) {
                        var r, n, i, a = t._targets;
                        for (r in e)
                            for (n = a.length; n--;)(i = (i = t._ptLookup[n][r]) && i.d) && (i._pt && (i = Zb(i, r)), i && i.modifier && i.modifier(e[r], t, a[n], r))
                    }(t, i)
                }
            }
        }
    }
    var ne = re.registerPlugin({
        name: "attr",
        init: function init(t, e, r, n, i) {
            for (var a in e) this.add(t, "setAttribute", (t.getAttribute(a) || 0) + "", e[a], n, i, 0, 0, a), this._props.push(a)
        }
    }, {
        name: "endArray",
        init: function init(t, e) {
            for (var r = e.length; r--;) this.add(t, r, t[r] || 0, e[r])
        }
    }, _b("roundProps", La), _b("modifiers"), _b("snap", Ma)) || re;
    Yt.version = Rt.version = ne.version = "3.0.4", f = 1, t() && Ct();

    function Lc(t, e) {
        return e.set(e.t, e.p, ~~(1e3 * (e.s + e.c * t)) / 1e3 + e.u, e)
    }

    function Mc(t, e) {
        return e.set(e.t, e.p, 1 === t ? e.e : ~~(1e3 * (e.s + e.c * t)) / 1e3 + e.u, e)
    }

    function Nc(t, e) {
        return e.set(e.t, e.p, t ? ~~(1e3 * (e.s + e.c * t)) / 1e3 + e.u : e.b, e)
    }

    function Oc(t, e) {
        var r = e.s + e.c * t;
        e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e)
    }

    function Pc(t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e)
    }

    function Qc(t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
    }

    function Rc(t, e, r) {
        return t.style[e] = r
    }

    function Sc(t, e, r) {
        return t.style.setProperty(e, r)
    }

    function Tc(t, e, r) {
        return t._gsap[e] = r
    }

    function Uc(t, e, r) {
        return t._gsap.scaleX = t._gsap.scaleY = r
    }

    function Vc(t, e, r, n, i) {
        var a = t._gsap;
        a.scaleX = a.scaleY = r, a.renderTransform(i, a)
    }

    function Wc(t, e, r, n, i) {
        var a = t._gsap;
        a[e] = r, a.renderTransform(i, a)
    }

    function $c(t, e) {
        var r = ae.createElementNS ? ae.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : ae.createElement(t);
        return r.style ? r : ae.createElement(t)
    }

    function _c(t, e, r) {
        var n = getComputedStyle(t);
        return n[e] || n.getPropertyValue(e.replace(Le, "-$1").toLowerCase()) || n.getPropertyValue(e) || !r && _c(t, Ve(e) || e, 1) || ""
    }

    function cd() {
        ! function _windowExists() {
            return "undefined" != typeof window
        }() || (ie = window, ae = ie.document, se = ae.documentElement, ue = $c("div") || {
            style: {}
        }, he = $c("div"), Ue = Ve(Ue), Ye = Ve(Ye), ue.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", fe = !!Ve("perspective"), oe = 1)
    }

    function ed(t, e) {
        for (var r = e.length; r--;)
            if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
    }

    function fd(e) {
        var r;
        try {
            r = e.getBBox()
        } catch (t) {
            r = function _getBBoxHack(t) {
                var e, r = $c("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                    n = this.parentNode,
                    i = this.nextSibling,
                    a = this.style.cssText;
                if (se.appendChild(r), r.appendChild(this), this.style.display = "block", t) try {
                    e = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = _getBBoxHack
                } catch (t) {} else this._gsapBBox && (e = this._gsapBBox());
                return i ? n.insertBefore(this, i) : n.appendChild(this), se.removeChild(r), this.style.cssText = a, e
            }.call(e, !0)
        }
        return !r || r.width || r.x || r.y ? r : {
            x: +ed(e, ["x", "cx", "x1"]) || 0,
            y: +ed(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
        }
    }

    function gd(t) {
        return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !fd(t))
    }

    function hd(t, e) {
        if (e) {
            var r = t.style;
            e in Be && (e = Ue), r.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), r.removeProperty(e.replace(Le, "-$1").toLowerCase())) : r.removeAttribute(e)
        }
    }

    function id(t, e, r, n, i, a) {
        var s = new ee(t._pt, e, r, 0, 1, a ? Qc : Pc);
        return (t._pt = s).b = n, s.e = i, t._props.push(r), s
    }

    function kd(t, e, r, n) {
        var i, a, s, o, u = parseFloat(r),
            h = (r + "").substr((u + "").length) || "px",
            l = ue.style,
            f = Ie.test(e),
            p = "svg" === t.tagName.toLowerCase(),
            c = (p ? "client" : "offset") + (f ? "Width" : "Height"),
            d = "px" === n;
        return n === h || qe[n] || qe[h] ? u : (o = t.getCTM && gd(t), "%" === n && Be[e] ? $(u / (o ? t.getBBox()[f ? "width" : "height"] : t[c]) * 100) : (l[f ? "width" : "height"] = 100 + (d ? h : n), a = "em" === n && t.appendChild && !p ? t : t.parentNode, o && (a = (t.ownerSVGElement || {}).parentNode), a && a !== ae && a.appendChild || (a = ae.body), (s = a._gsap) && "%" === n && s.width && f && s.time === Mt.time ? $(u / s.width * 100) : (a.appendChild(ue), i = ue[c], a.removeChild(ue), f && "%" === n && ((s = X(a)).time = Mt.time, s.width = a[c]), $(d ? i * u / 100 : 100 / i * u))))
    }

    function ld(t, e, r, n) {
        var i;
        return oe || cd(), e in Xe && "transform" !== e && ~(e = Xe[e]).indexOf(",") && (e = e.split(",")[0]), Be[e] && "transform" !== e ? (i = He(t, n), i = "transformOrigin" !== e ? i[e] : Ke(_c(t, Ye)) + i.zOrigin + "px") : (i = t.style[e]) && "auto" !== i && !n && !~i.indexOf("calc(") || (i = _c(t, e) || Y(t, e) || ("opacity" === e ? 1 : 0)), r ? kd(t, e, i, r) + r : i
    }

    function md(t, e, r, n) {
        var i, a, s, o, u, h, l, f, p, c, d, _, m = new ee(this._pt, t.style, e, 0, 1, Gt),
            g = 0,
            v = 0;
        if (m.b = r, m.e = n, r += "", "auto" === (n += "") && (t.style[e] = n, n = _c(t, e) || n, t.style[e] = r), hb(i = [r, n]), n = i[1], !!(h = (r = i[0]).indexOf("rgba(")) != !!(l = n.indexOf("rgba(")) && (h ? r = r.substr(h) + " " + r.substr(0, h - 1) : n = n.substr(l) + " " + n.substr(0, l - 1)), s = r.match(Ne) || [], (n.match(Ne) || []).length) {
            for (; a = Ne.exec(n);) l = a[0], p = n.substring(g, a.index), u ? u = (u + 1) % 5 : "rgba(" === p.substr(-5) && (u = 1), l !== (h = s[v++] || "") && (o = parseFloat(h) || 0, d = h.substr((o + "").length), (_ = "=" === l.charAt(1) ? +(l.charAt(0) + "1") : 0) && (l = l.substr(2)), f = parseFloat(l), c = l.substr((f + "").length), g = Ne.lastIndex - c.length, c || (c = c || I.units[e] || d, g === n.length && (n += c, m.e += c)), d !== c && (o = kd(t, e, h, c) || 0), m._pt = {
                _next: m._pt,
                p: p || 1 === v ? p : ",",
                s: o,
                c: _ ? _ * f : f - o,
                m: u && u < 4 ? Math.round : 0
            });
            m.c = g < n.length ? n.substring(g, n.length) : ""
        } else m.r = "display" === e && "none" === n ? Qc : Pc;
        return nt.test(n) && (m.e = 0), this._pt = m
    }

    function od(t) {
        var e = t.split(" "),
            r = e[0],
            n = e[1] || "50%";
        return "top" !== r && "bottom" !== r && "left" !== n && "right" !== n || (t = r, r = n, n = t), e[0] = je[r] || r, e[1] = je[n] || n, e.join(" ")
    }

    function pd(t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
            var r, n, i, a = e.t,
                s = a.style,
                o = e.u;
            if ("all" === o || !0 === o) s.cssText = "", n = 1;
            else
                for (i = (o = o.split(",")).length; - 1 < --i;) r = o[i], Be[r] && (n = 1, r = "transformOrigin" === r ? Ye : Ue), hd(a, r);
            n && (hd(a, Ue), (n = a._gsap) && (n.svg && a.removeAttribute("transform"), He(a, 1)))
        }
    }

    function td(t) {
        return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
    }

    function ud(t) {
        var e = _c(t, Ue);
        return td(e) ? Qe : e.substr(7).match(tt).map($)
    }

    function vd(t, e) {
        var r, n, i, a, s = t._gsap,
            o = t.style,
            u = ud(t);
        return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (u = [(i = t.transform.baseVal.consolidate().matrix).a, i.b, i.c, i.d, i.e, i.f]).join(",") ? Qe : u : (u !== Qe || t.offsetParent || t === se || s.svg || (i = o.display, o.display = "block", (r = t.parentNode) && t.offsetParent || (a = 1, n = t.nextSibling, se.appendChild(t)), u = ud(t), i ? o.display = i : hd(t, "display"), a && (n ? r.insertBefore(t, n) : r ? r.appendChild(t) : se.removeChild(t))), e && 6 < u.length ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u)
    }

    function wd(t, e, r, n, i, a) {
        var s, o, u, h = t._gsap,
            l = i || vd(t, !0),
            f = h.xOrigin || 0,
            p = h.yOrigin || 0,
            c = h.xOffset || 0,
            d = h.yOffset || 0,
            _ = l[0],
            m = l[1],
            g = l[2],
            v = l[3],
            y = l[4],
            b = l[5],
            w = e.split(" "),
            T = parseFloat(w[0]) || 0,
            x = parseFloat(w[1]) || 0;
        r ? l !== Qe && (o = _ * v - m * g) && (u = T * (-m / o) + x * (_ / o) - (_ * b - m * y) / o, T = T * (v / o) + x * (-g / o) + (g * b - v * y) / o, x = u) : (T = (s = fd(t)).x + (~w[0].indexOf("%") ? T / 100 * s.width : T), x = s.y + (~(w[1] || w[0]).indexOf("%") ? x / 100 * s.height : x)), n || !1 !== n && h.smooth ? (y = T - f, b = x - p, h.xOffset = c + (y * _ + b * g) - y, h.yOffset = d + (y * m + b * v) - b) : h.xOffset = h.yOffset = 0, h.xOrigin = T, h.yOrigin = x, h.smooth = !!n, h.origin = e, h.originIsAbsolute = !!r, t.style[Ye] = "0px 0px", a && (id(a, h, "xOrigin", f, T), id(a, h, "yOrigin", p, x), id(a, h, "xOffset", c, h.xOffset), id(a, h, "yOffset", d, h.yOffset))
    }

    function zd(t, e, r) {
        var n = Ea(e);
        return $(parseFloat(e) + parseFloat(kd(t, "x", r + "px", n))) + n
    }

    function Gd(t, e, r, i, a, s) {
        var o, u, h = 360,
            l = n(a),
            f = parseFloat(a) * (l && ~a.indexOf("rad") ? Ee : 1),
            p = s ? f * s : f - i,
            c = i + p + "deg";
        return l && ("short" === (o = a.split("_")[1]) && (p %= h) !== p % 180 && (p += p < 0 ? h : -h), "cw" === o && p < 0 ? p = (p + 36e9) % h - ~~(p / h) * h : "ccw" === o && 0 < p && (p = (p - 36e9) % h - ~~(p / h) * h)), t._pt = u = new ee(t._pt, e, r, i, p, Mc), u.e = c, u.u = "deg", t._props.push(r), u
    }

    function Hd(t, e, r) {
        var n, i, a, s, o, u, h, l = he.style,
            f = r._gsap;
        for (i in l.cssText = getComputedStyle(r).cssText + ";position:absolute;display:block;", l[Ue] = e, ae.body.appendChild(he), n = He(he, 1), Be)(a = f[i]) !== (s = n[i]) && "perspective" !== i && (o = Ea(a) !== (h = Ea(s)) ? kd(r, i, a, h) : parseFloat(a), u = parseFloat(s), t._pt = new ee(t._pt, f, i, o, u - o, Lc), t._pt.u = h, t._props.push(i));
        ae.body.removeChild(he)
    }
    var ie, ae, se, oe, ue, he, le, fe, pe, ce, de, _e = Pt.Power0,
        me = Pt.Power1,
        ge = Pt.Power2,
        ve = Pt.Power3,
        ye = Pt.Power4,
        be = Pt.Linear,
        we = Pt.Quad,
        Te = Pt.Cubic,
        xe = Pt.Quart,
        ke = Pt.Quint,
        Oe = Pt.Strong,
        Me = Pt.Elastic,
        Ce = Pt.Back,
        Pe = Pt.SteppedEase,
        Se = Pt.Bounce,
        Ae = Pt.Sine,
        De = Pt.Expo,
        ze = Pt.Circ,
        Be = {},
        Ee = 180 / Math.PI,
        Fe = Math.PI / 180,
        Re = Math.atan2,
        Le = /([A-Z])/g,
        Ne = /[-+=\.]*\d+[\.e-]*\d*[a-z%]*/g,
        Ie = /(?:left|right|width|margin|padding|x)/i,
        $e = /[\s,\(]\S/,
        Xe = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        },
        Ue = "transform",
        Ye = Ue + "Origin",
        Ze = "O,Moz,ms,Ms,Webkit".split(","),
        Ve = function _checkPropPrefix(t, e) {
            var r = (e || ue).style,
                n = 5;
            if (t in r) return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1); n-- && !(Ze[n] + t in r););
            return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? Ze[n] : "") + t
        },
        qe = {
            deg: 1,
            rad: 1,
            turn: 1
        },
        je = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        },
        We = {
            clearProps: function clearProps(t, e, r, n, i) {
                if ("isFromStart" !== i.data) {
                    var a = t._pt = new ee(t._pt, e, r, 0, 0, pd);
                    return a.u = n, a.pr = -10, a.tween = i, t._props.push(r), 1
                }
            }
        },
        Qe = [1, 0, 0, 1, 0, 0],
        Ge = {},
        He = function _parseTransform(t, e) {
            var r = t._gsap || new Et(t);
            if ("x" in r && !e && !r.uncache) return r;
            var n, i, a, s, o, u, h, l, f, p, c, d, _, m, g, v, y, b, w, T, x, k, O, M, C, P, S, A, D, z, B = t.style,
                E = r.scaleX < 0,
                F = r.xOrigin || 0,
                R = r.yOrigin || 0,
                L = "deg",
                N = _c(t, Ye) || "0";
            return n = i = a = u = h = l = f = p = c = 0, s = o = 1, r.svg = !(!t.getCTM || !gd(t)), d = vd(t, r.svg), r.svg && wd(t, N, r.originIsAbsolute, !1 !== r.smooth, d), d !== Qe && (v = d[0], y = d[1], b = d[2], w = d[3], n = T = d[4], i = x = d[5], 6 === d.length ? (s = Math.sqrt(v * v + y * y), o = Math.sqrt(w * w + b * b), u = v || y ? Re(y, v) * Ee : 0, f = b || w ? Re(b, w) * Ee + u : 0, r.svg && (n -= F - (F * v + R * b), i -= R - (F * y + R * w))) : (z = d[6], A = d[7], C = d[8], P = d[9], S = d[10], D = d[11], n = d[12], i = d[13], a = d[14], h = (_ = Re(z, S)) * Ee, _ && (k = T * (m = Math.cos(-_)) + C * (g = Math.sin(-_)), O = x * m + P * g, M = z * m + S * g, C = T * -g + C * m, P = x * -g + P * m, S = z * -g + S * m, D = A * -g + D * m, T = k, x = O, z = M), l = (_ = Re(-b, S)) * Ee, _ && (m = Math.cos(-_), D = w * (g = Math.sin(-_)) + D * m, v = k = v * m - C * g, y = O = y * m - P * g, b = M = b * m - S * g), u = (_ = Re(y, v)) * Ee, _ && (k = v * (m = Math.cos(_)) + y * (g = Math.sin(_)), O = T * m + x * g, y = y * m - v * g, x = x * m - T * g, v = k, T = O), h && 359.9 < Math.abs(h) + Math.abs(u) && (h = u = 0, l = 180 - l), s = $(Math.sqrt(v * v + y * y + b * b)), o = $(Math.sqrt(x * x + z * z)), _ = Re(T, x), f = 2e-4 < Math.abs(_) ? _ * Ee : 0, c = D ? 1 / (D < 0 ? -D : D) : 0), r.svg && (d = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !td(_c(t, Ue)), d && t.setAttribute("transform", d))), 90 < Math.abs(f) && Math.abs(f) < 270 && (E ? (s *= -1, f += u <= 0 ? 180 : -180, u += u <= 0 ? 180 : -180) : (o *= -1, f += f <= 0 ? 180 : -180)), r.x = ((r.xPercent = n && Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0) ? 0 : n) + "px", r.y = ((r.yPercent = i && Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0) ? 0 : i) + "px", r.z = a + "px", r.scaleX = $(s), r.scaleY = $(o), r.rotation = $(u) + L, r.rotationX = $(h) + L, r.rotationY = $(l) + L, r.skewX = f + L, r.skewY = p + L, r.transformPerspective = c + "px", (r.zOrigin = parseFloat(N.split(" ")[2]) || 0) && (B[Ye] = Ke(N)), r.xOffset = r.yOffset = 0, r.force3D = I.force3D, r.renderTransform = r.svg ? ir : fe ? nr : Je, r.uncache = 0, r
        },
        Ke = function _firstTwoOnly(t) {
            return (t = t.split(" "))[0] + " " + t[1]
        },
        Je = function _renderNon3DTransforms(t, e) {
            e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, nr(t, e)
        },
        tr = "0deg",
        er = "0px",
        rr = ") ",
        nr = function _renderCSSTransforms(t, e) {
            var r = e || this,
                n = r.xPercent,
                i = r.yPercent,
                a = r.x,
                s = r.y,
                o = r.z,
                u = r.rotation,
                h = r.rotationY,
                l = r.rotationX,
                f = r.skewX,
                p = r.skewY,
                c = r.scaleX,
                d = r.scaleY,
                _ = r.transformPerspective,
                m = r.force3D,
                g = r.target,
                v = r.zOrigin,
                y = "",
                b = "auto" === m && t && 1 !== t || !0 === m;
            if (v && (l !== tr || h !== tr)) {
                var w, T = parseFloat(h) * Fe,
                    x = Math.sin(T),
                    k = Math.cos(T);
                T = parseFloat(l) * Fe, w = Math.cos(T), a = zd(g, a, x * w * -v), s = zd(g, s, -Math.sin(T) * -v), o = zd(g, o, k * w * -v + v)
            }(n || i) && (y = "translate(" + n + "%, " + i + "%) "), !b && a === er && s === er && o === er || (y += o !== er || b ? "translate3d(" + a + ", " + s + ", " + o + ") " : "translate(" + a + ", " + s + rr), _ !== er && (y += "perspective(" + _ + rr), u !== tr && (y += "rotate(" + u + rr), h !== tr && (y += "rotateY(" + h + rr), l !== tr && (y += "rotateX(" + l + rr), f === tr && p === tr || (y += "skew(" + f + ", " + p + rr), 1 === c && 1 === d || (y += "scale(" + c + ", " + d + rr), g.style[Ue] = y || "translate(0, 0)"
        },
        ir = function _renderSVGTransforms(t, e) {
            var r, n, i, a, s, o = e || this,
                u = o.xPercent,
                h = o.yPercent,
                l = o.x,
                f = o.y,
                p = o.rotation,
                c = o.skewX,
                d = o.skewY,
                _ = o.scaleX,
                m = o.scaleY,
                g = o.target,
                v = o.xOrigin,
                y = o.yOrigin,
                b = o.xOffset,
                w = o.yOffset,
                T = o.forceCSS,
                x = parseFloat(l),
                k = parseFloat(f);
            p = parseFloat(p), c = parseFloat(c), (d = parseFloat(d)) && (c += d = parseFloat(d), p += d), p || c ? (p *= Fe, c *= Fe, r = Math.cos(p) * _, n = Math.sin(p) * _, i = Math.sin(p - c) * -m, a = Math.cos(p - c) * m, c && (d *= Fe, s = Math.tan(c - d), i *= s = Math.sqrt(1 + s * s), a *= s, d && (s = Math.tan(d), r *= s = Math.sqrt(1 + s * s), n *= s)), r = $(r), n = $(n), i = $(i), a = $(a)) : (r = _, a = m, n = i = 0), (x && !~(l + "").indexOf("px") || k && !~(f + "").indexOf("px")) && (x = kd(g, "x", l, "px"), k = kd(g, "y", f, "px")), (v || y || b || w) && (x = $(x + v - (v * r + y * i) + b), k = $(k + y - (v * n + y * a) + w)), (u || h) && (s = g.getBBox(), x = $(x + u / 100 * s.width), k = $(k + h / 100 * s.height)), s = "matrix(" + r + "," + n + "," + i + "," + a + "," + x + "," + k + ")", g.setAttribute("transform", s), T && (g.style[Ue] = s)
        },
        ar = {
            name: "css",
            register: cd,
            targetTest: function targetTest(t) {
                return t.style && t.nodeType
            },
            init: function init(t, e, r, n, i) {
                var a, s, o, u, h, l, f, p, c, d, _, m, g, v, y, b = this._props,
                    w = t.style;
                for (f in oe || cd(), e)
                    if ("autoRound" !== f && (s = e[f], !ht[f] || !Cb(f, e, r, n, t, i)))
                        if (l = We[f], "function" === (h = typeof s) && (h = typeof (s = s.call(r, n, t, i))), "string" === h && ~s.indexOf("random(") && (s = Ua(s)), l) l(this, t, f, s, r) && (y = 1);
                        else if ("--" === f.substr(0, 2)) this.add(w, "setProperty", getComputedStyle(t).getPropertyValue(f) + "", s + "", n, i, 0, 0, f);
                else {
                    if (a = ld(t, f), u = parseFloat(a), (d = "string" === h && "=" === s.charAt(1) ? +(s.charAt(0) + "1") : 0) && (s = s.substr(2)), o = parseFloat(s), f in Xe && ("autoAlpha" === f && (1 === u && "hidden" === ld(t, "visibility") && o && (u = 0), id(this, w, "visibility", u ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)), "scale" !== f && "transform" !== f && ~(f = Xe[f]).indexOf(",") && (f = f.split(",")[0])), _ = f in Be)
                        if (m || (g = t._gsap, v = !1 !== e.smoothOrigin && g.smooth, (m = this._pt = new ee(this._pt, w, Ue, 0, 1, g.renderTransform, g, 0, -1)).dep = 1), "scale" === f) this._pt = new ee(this._pt, g, "scaleY", g.scaleY, d ? d * o : o - g.scaleY), b.push("scaleY", f), f += "X";
                        else {
                            if ("transformOrigin" === f) {
                                s = od(s), g.svg ? wd(t, s, 0, v, 0, this) : ((c = parseFloat(s.split(" ")[2])) !== g.zOrigin && id(this, g, "zOrigin", g.zOrigin, c), id(this, w, f, Ke(a), Ke(s)));
                                continue
                            }
                            if ("svgOrigin" === f) {
                                wd(t, s, 1, v, 0, this);
                                continue
                            }
                            if (f in Ge) {
                                Gd(this, g, f, u, s, d);
                                continue
                            }
                            if ("smoothOrigin" === f) {
                                id(this, g, "smooth", g.smooth, s);
                                continue
                            }
                            if ("force3D" === f) {
                                g[f] = s;
                                continue
                            }
                            if ("transform" === f) {
                                Hd(this, s, t);
                                continue
                            }
                        }
                    else f in w || (f = Ve(f) || f);
                    if (_ || (o || 0 === o) && (u || 0 === u) && !$e.test(s) && f in w)(p = (a + "").substr((u + "").length)) !== (c = (s + "").substr((o + "").length) || (f in I.units ? I.units[f] : p)) && (u = kd(t, f, a, c)), this._pt = new ee(this._pt, _ ? g : w, f, u, d ? d * o : o - u, "px" !== c || !1 === e.autoRound || _ ? Lc : Oc), this._pt.u = c || 0, p !== c && (this._pt.b = a, this._pt.r = Nc);
                    else if (f in w) md.call(this, t, f, a, s);
                    else {
                        if (!(f in t)) {
                            K(f, s);
                            continue
                        }
                        this.add(t, f, t[f], s, n, i)
                    }
                    b.push(f)
                }
                y && te(this)
            },
            get: ld,
            aliases: Xe,
            getSetter: function getSetter(t, e, r) {
                return e in Be && e !== Ye && (t._gsap.x || ld(t, "x")) ? r && le === r ? "scale" === e ? Uc : Tc : (le = r || {}) && ("scale" === e ? Vc : Wc) : t.style && !q(t.style[e]) ? Rc : ~e.indexOf("-") ? Sc : jt(t, e)
            }
        };
    ne.utils.checkPrefix = Ve, de = Z((pe = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (ce = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function (t) {
        Be[t] = 1
    }), Z(ce, function (t) {
        I.units[t] = "deg", Ge[t] = 1
    }), Xe[de[13]] = pe + "," + ce, Z("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,9:rotateX,10:rotateY", function (t) {
        var e = t.split(":");
        Xe[e[1]] = de[e[0]]
    }), Z("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (t) {
        I.units[t] = "px"
    }), ne.registerPlugin(ar);
    var sr = ne.registerPlugin(ar) || ne;
    e.Back = Ce, e.Bounce = Se, e.CSSPlugin = ar, e.Circ = ze, e.Cubic = Te, e.Elastic = Me, e.Expo = De, e.Linear = be, e.Power0 = _e, e.Power1 = me, e.Power2 = ge, e.Power3 = ve, e.Power4 = ye, e.Quad = we, e.Quart = xe, e.Quint = ke, e.Sine = Ae, e.SteppedEase = Pe, e.Strong = Oe, e.TimelineLite = Rt, e.TimelineMax = Rt, e.TweenLite = Yt, e.TweenMax = Yt, e.default = sr, e.gsap = sr, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=gsap.min.js.map