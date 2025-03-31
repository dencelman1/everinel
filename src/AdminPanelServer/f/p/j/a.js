import load_tables from './load_tables.js';
import _formFieldsRd from "./formFieldsRd.js";
import _load_table from './load_table.js';

import to_input from './to_input.js';
import load_input from './load_input.js';

import color from './color.js';
import width from './width.js';

import load_entries from './load_entries.js';

import fill_str from './fill_str.js';

import bto from './purekeep/bto.js';
import bfrom from './purekeep/bfrom.js';

import limits from './limits.js';
import { readO, writeO } from "./O.js";

import { fields_from, _fo_rd} from './fields.js';
import {_open_click} from './open.js';

import {tables_from} from './tables.js';
import {onintblur} from './int.js';
import {formclose} from './form.js';
import {_entry_click} from "./entries.js";

import _sort_by_field from './_sort_by_field.js';

import query_parse from './query_parse.js';


fetch("/t/c")
.then(r => r.json())
.then((a) => {
    var
        view = document.getElementById("view").classList,

        formUl = document.querySelector("#form>form>ul"),

        fields =  document.getElementById("fields"),
        
        fieldsUl = fields.querySelector("ul"),

        entriesUl = document.querySelector("#entries>ul"),

        FIELD = document.querySelector("#tmpl>.field"),

        from_i = document.getElementById("from_i"),
        ea = document.getElementById("ea"),

        OPEN = document.getElementById("open"),
        uq = new URLSearchParams(window.location.search),
        k = "",

        T = 0,
        getT = () => T,

        limit = document.getElementById("l"),
        offset = document.getElementById("o"),
        query = document.getElementById("q"),

        cudmsg = document.getElementById("cudmsg"),

        tables = Array.from(a, tables_from(fields_from, width)),

        formopen = (
            () => {
                view.add("form"),
                OPEN.setAttribute("title", "Close"),
                (OPEN.textContent = "x")
            }
        ),

        entry_click = _entry_click(getT,a,tables,formopen,cudmsg,to_input,load_input,bfrom,bto),

        

        number_input = (
            (f) => (e) => {
                var
                    t = e.currentTarget,
                    i = Number( t.getAttribute("data-a") ),
                    v = a[T].v,

                    type = v.t[i],
                    limit = limits[type],

                    tv = t.value,
                    value = f(tv),
                    l0 = limit[0]
                ;
                return (
                    ((l0 > value) || ((l0 = limit[1]) < value))
                    && (t.value = (value = l0).toString()),

                    bto[type](
                        tables[T].d,
                        v.m[i],
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
                    tables[T].d.setInt8(a[T].v.m[i], (t.checked ? 1 : 0))
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
                        v.m[i],
                        fill_str(t.value),
                        true,
                        v.r[i]
                    )
                );
            },
            number_input( parseInt ),
            number_input( parseFloat ),
            number_input( (v) => (v.inludes(".") && (v = "0"), BigInt(v) )),
            
            getT,
            bfrom,
            a,
            tables,

            load_input,
            to_input
        ),
        
        load_table = _load_table(
            entry_click,
            offset,
            limit,
            query,
            cudmsg,
            _fo_rd(
                fieldsUl,
                color,
                FIELD,
                _sort_by_field(
                    a,
                    tables,
                    getT,
                    color,
                    bfrom,
                    bto,
                    entry_click,
                    load_entries
                )
            ),
            formFieldsRd,
            load_entries,
            color,
            bfrom,
            from_i,
            ea
        ),

        cudmsgButton = cudmsg.parentElement,

        cudmsgcopy_to = () => (
            cudmsg
            .className = (
                tables[T]
                .cudmsg
                .toString()
            )
        ),

        cudmsg_then = () => (
            (cudmsg.className = "copy"),
            setTimeout(
                cudmsgcopy_to,
                200
            )
        ),

        on_so_input = (
            (e) => {
                var
                    ct = tables[T],
                    t = e.currentTarget
                ;
                return (
                    
                    ct[
                        t.getAttribute("id")
                    ] = (
                        Math.min(
                            Math.max(
                                (parseInt(eval(t.value)) || 0),
                                0
                            ),
                            ct.max_so
                        )
                    )
                );
            }
        )
    ;
    return (

        document
        .getElementById("e")
        .addEventListener(
            "wheel",
            function(e) {
                return (
                    (e.ctrlKey)
                    &&
                    (
                        e.preventDefault(),
                        (this.scrollLeft += e.deltaY)
                    )
                );
            }
        ),

        document
        .getElementById("write")
        .addEventListener(
            "click",
            () => {
                var
                    ct = tables[T],
                    i = ct.i
                ;
                return (
                    (writeO.body = ct.d.buffer),

                    fetch(`/t/write/${T}/${i.toString()}`, writeO)
                    .then(
                        (r) => (
                            r.ok
                            ? console.log(`wrote ${i.toString()} ${Date.now().toString()}`)
                            : console.error(`error ${r.status.toString()} ${Date.now().toString()}`)
                        )
                    )
                )
            }
        ),


        cudmsgButton
        .addEventListener(
            "click",
            () => (
                navigator
                .clipboard
                .writeText( tables[T].i.toString() )
                .then( cudmsg_then )
                .catch(console.error)
            )
        ),

        query.addEventListener("input", (
            (e) => {
                var
                    t = e.currentTarget,
                    cv = tables[T]
                ;
                return (
                    t.className = (
                        (
                            query_parse((cv.q = t.value), cv, a[T], bto)
                        )
                        .toString()
                    )
                );
            }
        )),

        document
        .getElementById("read")
        .addEventListener("click", (
            (e) => {
                var
                    ct = tables[T],
                    qlimit = ( ct.l )
                ;
                return (ct.qr) && (
                    fetch(
                        (
                            `/t/read/${T}/${
                                (
                                    readO
                                    .body = JSON.stringify(ct.qv)
                                )
                                .length
                            }/${ct.o}/${qlimit}/${ct.ql}/${ct.from_i}/${ct.ea}/${ct.qp}`
                        ),
                        readO
                    )
                    .then(
                        (r) => (
                            (r.ok)
                            &&
                            r
                            .arrayBuffer()
                            .then(b => load_entries(
                                (ct.e = new DataView(b)),
                                (ct.el = Number(r.headers.get("x-a"))),
                                a[T].v,ct.k,color,bfrom,
                                entry_click,
                                (ct.qlimit = qlimit)
                            ))
                        )
                    )
                    
                );
            }
        )),

        offset.addEventListener("input", (
            (e) => {
                var
                    t = e.currentTarget,
                    ctable = tables[T],
                    v = parseInt(t.value || "0"),
                    l0 = 0
                ;
                return (
                    (ctable.o === v)
                    ||
                    (
                        ((0 > v) || (v > (l0 = 4294967295)))
                        && (t.value = (v = l0).toString()),
                        
                        (ctable.o = v)
                    )
                )
            }
        )),
        limit.addEventListener("input", (
            (e) => {
                var
                    t = e.currentTarget,
                    ctable = tables[T],
                    v = parseInt(t.value || "0"),
                    l0 = 1
                ;
                return (
                    (ctable.l === v)
                    ||
                    (
                        ((1 > v) || (v > (l0 = ctable.le)))
                        && (t.value = (v = l0).toString()),
                        
                        (ctable.l = v)
                    )
                )
            }
        )),

        from_i.addEventListener("blur", on_so_input),
        ea.addEventListener("blur", on_so_input),

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