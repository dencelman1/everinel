import load_tables from './load_tables.js';
import _formFieldsRd from "./formFieldsRd.js";
import color from './color.js';
import width from './width.js';



fetch("/t/c")
.then(r => r.json())
.then((a) => {
    var
        A = {
            offset:0,
            limit:0
        },
        view = document.getElementById("view").classList,

        formUl = document.querySelector("#form>form>ul"),

        fields =  document.getElementById("fields"),
        fieldsUl = fields.querySelector("ul"),

        fields_i = fields.querySelector("input"),
        
        entriesUl = document.querySelector("#entries>ul"),

        FIELD = document.querySelector("#tmpl>.field"),

        onintblur = (e) => {
            return (
                e.currentTarget.value ||= "0"
            )
        },

        formFieldsRd = _formFieldsRd(
            document.querySelector("#tmpl>.form-input"),
            document.querySelector("#form>form>ul"),
            onintblur
        ),

        CREATE = document.getElementById("create"),
        uq = new URLSearchParams(window.location.search),
        k = "",

        T = 0,

        fields_from = (a) => ({a, b:true}),
        field_orders = Array.from(a, (v) => Array.from(v.k, fields_from)),

        formclose = (
            (t) => (
                t.setAttribute("title", "Create"),
                "+"
            )
        ),

        fo_rd = (
            (a,v,i) => {
                var
                    f = FIELD.cloneNode(true),
                    fb = f.querySelector("button"),
                    fbs = fb.querySelector("span"),
                    t = a.t[i],
                    va = v.a
                ;
                return (
                    (fb.style.width = Math.max(width[t](), (fbs.textContent = va).length * 20) + "px"),
                    (fbs.style.color = color[t]),

                    fieldsUl.appendChild(f),
                    a
                );
            }
        ),

        load_table = (
            (b,a,fo) => {
                var t = a.t;
                return (
                    document.querySelector('li.table>button.selected')?.classList.remove('selected'),

                    fo
                    .reduce(fo_rd, a),

                    a
                    .k
                    .reduce(formFieldsRd, t),

                    b.classList.add("selected")
                );
            }
        ),

        onintinput = (e) => {
            var t = e.currentTarget;
            return (
                A[t.getAttribute('id')] = parseInt(t.value)
            )
        },

        

        limit = document.getElementById("limit"),
        offset = document.getElementById("offset")
    ;
    return (

        fields.addEventListener("contextmenu", (e) => {
            var t = e.currentTarget;
            return (
                e.preventDefault(),
                t.classList.add("order"),
                t.querySelector("input").focus()
            );
        }),

        fields_i
        .addEventListener("keydown", (e) => (
            (e.keyCode === 13)
            &&
            e.currentTarget.parentElement.classList.remove("order")
        )),

        fields_i
        .addEventListener("blur", (e) => (
            e.currentTarget.parentElement.classList.remove("order")
        )),
        
        (offset.value = A.offset),
        (limit.value = A.limit),

        

        offset.addEventListener("input", onintinput),
        limit.addEventListener("input", onintinput),
        offset.addEventListener("blur",onintblur),
        limit.addEventListener("blur",onintblur),

        CREATE.addEventListener(
            "click",
            (e) => {
                var t = e.currentTarget, at = null;
                return (
                    t.textContent = (
                        (view.toggle("form"))
                        ? (
                            t.setAttribute("title", "Close"),
                            "x"
                        )
                        : formclose(t)
                    )
                )
            }
        ),

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

                    load_table(t, a[T = Number(t.getAttribute("data-a"))], field_orders[T])
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
            field_orders[T]
        ),

        CREATE.dispatchEvent(new Event("click"))
    );
});