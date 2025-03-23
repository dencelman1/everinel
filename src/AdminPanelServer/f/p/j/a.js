import load_tables from './load_tables.js';
import _formFieldsRd from "./formFieldsRd.js";
import _load_table from './load_table.js';

import color from './color.js';
import width from './width.js';

import load_entries from './load_entries.js';

import fill_str from './fill_str.js';

import bto from './purekeep/bto.js';
import bfrom from './purekeep/bfrom.js';

import trim_str from './trim_str.js';
import limits from './limits.js';
import {fi_keydown, fi_blur} from './fields_i/i.js';
import {createO,readO} from "./O.js";

import {fields_contextmenu, fields_from, _fo_rd} from './fields.js';
import {_open_click} from './open.js';

import {tables_from} from './tables.js';
import {onintblur} from './int.js';
import {formclose} from './form.js';

import query_parse from './query_parse.js';
import load_to_form from './load_to_form.js';


fetch("/t/c")
.then(r => r.json())
.then((a) => {
    var
        view = document.getElementById("view").classList,

        formUl = document.querySelector("#form>form>ul"),

        fields =  document.getElementById("fields"),
        
        fieldsUl = fields.querySelector("ul"),

        fields_i = fields.querySelector("input"),
        
        entriesUl = document.querySelector("#entries>ul"),

        FIELD = document.querySelector("#tmpl>.field"),

        OPEN = document.getElementById("open"),
        uq = new URLSearchParams(window.location.search),
        k = "",

        T = 0,

        limit = document.getElementById("l"),
        offset = document.getElementById("o"),
        query = document.getElementById("q"),

        cudmsg = document.getElementById("cudmsg"),

        tables = Array.from(a, tables_from(fields_from, width)),

        number_input = (
            (f) => (e) => {
                var
                    t = e.currentTarget,
                    i = Number( t.getAttribute("data-a") ),
                    v = a[T].v,

                    type = v.t[i],
                    limit = limits[type],
                    tv = t.value,
                    value = f((tv && tv !== ".") ? tv : "0"),
                    l0 = limit[0]
                ;
                return (
                    ((l0 > value) || ((l0 = limit[1]) < value))
                    && (t.value = (value = l0).toString()),

                    bto[type](
                        tables[T].d,
                        v.m[i][0],
                        value,
                        true,
                        0
                    )
                );
            }
        ),

        formFieldsRd = _formFieldsRd(
            document.querySelector("#tmpl>.form-input"),
            document.querySelector("#form>form>ul"),
            onintblur,
            
            (e) => {
                var
                    t = e.currentTarget,
                    i = Number( t.getAttribute("data-a") )
                ;
                return (
                    tables[T].d.setInt8(a[T].v.m[i][0], (t.checked ? 1 : 0))
                )
            },
            (e) => {
                var
                    t = e.currentTarget,
                    i = Number( t.getAttribute("data-a") ),
                    v = a[T].v
                ;
                return (
                    bto[v.t[i]](
                        tables[T].d,
                        v.m[i][0],
                        fill_str(t.value),
                        true,
                        v.r[i]
                    )
                );
            },
            number_input( parseInt ),
            number_input( parseFloat ),
            number_input( BigInt ),
            
            (() => T),
            bfrom,
            a,
            tables,
            trim_str
        ),

        load_table = _load_table(offset,limit,query,cudmsg,_fo_rd(fieldsUl,color,FIELD),formFieldsRd,load_entries,color,bfrom),

        onintinput = (e) => {
            var t = e.currentTarget;
            return (
                (tables[T])[t.getAttribute('id')] = parseInt(t.value)
            )
        },

        arrayBufferPOST = (r) => (
            (cudmsg.className = (tables[T].cudmsg = r.ok).toString()),
            r.arrayBuffer()
        ),
        
        createThen = (
            (b) => (
                cudmsg.textContent = (
                    (
                        tables[T].i = (
                            Number(
                                new DataView(b)
                                .getBigUint64(0,true)
                            )
                        )
                    )
                    .toString()
                )
            )
        )
    ;
    return (

        query.addEventListener("input", (
            (e) => {
                var
                    t = e.currentTarget,
                    cv = tables[T],
                    r = query_parse((cv.q = t.value), cv, a[T], bto)
                ;
                return (
                    
                    (t.className = r.toString()),
                    console.log(JSON.stringify([
                        r,
                        cv.qv,
                        cv.qp,
                    ], null, 4))
                );
            }
        )),

        fields.addEventListener("contextmenu", fields_contextmenu),


        document
        .getElementById("reload")
        .addEventListener("click", (
            (e) => {
                var ct = tables[T];
                return (
                    fetch(
                        (
                            `/t/read/${T}/${
                                (
                                    readO
                                    .body = JSON.stringify(ct.qv)
                                )
                                .length
                            }/${ct.o}/${ct.l}/${ct.ql}/${ct.qp}`
                        ),
                        readO
                    )
                    .then(
                        (r) => (
                            r
                            .arrayBuffer()
                            .then(b => load_entries(
                                (ct.e = new DataView(b)),
                                (ct.el = Number(r.headers.get("x-a"))),
                                a[T].v,ct.k,color,bfrom
                            ))
                        )
                    )
                    
                );
            }
        )),

        document
        .getElementById("create")
        .addEventListener("click", (e) => (
            confirm("Create?")
            &&
            (
                (createO.body = tables[T].d),

                fetch(("/t/create/" + T.toString()), createO)
                .then( arrayBufferPOST )
                .then( createThen )
            )
        )),

        fields_i.addEventListener("keydown", fi_keydown),
        fields_i.addEventListener("blur", fi_blur),
        
        offset.addEventListener("input", onintinput),
        limit.addEventListener("input", (
            (e) => {
                var
                    t = e.currentTarget,
                    ctable = tables[T],
                    v = parseInt(t.value),
                    l0 = 0
                ;
                return (
                    (ctable.l === v)
                    ||
                    (
                        ((0 > v) || (v > (l0 = ctable.le)))
                        && (t.value = (v = l0).toString()),
                        
                        (ctable.l = v)
                    )
                )
            }
        )),

        offset.addEventListener("blur",onintblur),
        limit.addEventListener("blur",onintblur),

        OPEN.addEventListener("click",_open_click(view,formclose)),

        load_tables(
            a,
            (e) => {
                var t = e.currentTarget;
                return (
                    (
                        fieldsUl.innerHTML =
                        entriesUl.innerHTML =
                        formUl.innerHTML = ""
                    ),

                    load_table(t, a[T = Number(t.getAttribute("data-a"))], tables[T])
                )
            },
        ),

        load_table(
            document.querySelector(
                `li.table>button[data-a="${
                    (k = uq.get("t"))
                    ? (
                        T = (
                            a.reduce((r,v,i) => (
                                (r === -1)
                                ? (v.n === k ? i : r)
                                : r
                            ), -1)
                        )
                    )
                    : T
                }"]`
            ),
            a[T],
            tables[T]
        )

        // , OPEN.dispatchEvent(new Event("click"))
    );
});