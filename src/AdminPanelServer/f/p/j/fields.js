

export var
    fields_contextmenu = (e) => {
        var t = e.currentTarget;
        return (
            e.preventDefault(),
            t.classList.add("order"),
            t.querySelector("input").focus()
        );
    },
    fields_from = (
        (rules,letter_size,width,types)=>(a,i) => (
            {
                w: Math.max((a.length * letter_size), (width[types[i]] || rules[i]) * letter_size),
                a, // key name
                b:true, // including for view
                i,
            }
        )
    ),
    _fo_rd = (
        (fieldsUl,color,FIELD,onfieldclick) => (a,v,i) => {
            var
                f = FIELD.cloneNode(true),
                fb = f.querySelector("button"),
                fbs = fb.querySelector("span"),

                t = a.v.t[i],
                va = v.a
            ;
            return (
                (fbs.textContent = va),
                (fb.style.width = v.w.toString() + "px"),
                (fbs.style.color = color[t]),

                fb.setAttribute("data-a", v.i.toString()),
                fb.setAttribute("data-b", "true"),
                fb.addEventListener("click", onfieldclick),

                fieldsUl.appendChild(f),
                a
            );
        }
    )
;