

export default (
    (d,l, atv,keys,color,bfrom, entry_click,limit) => {
        var
            ENTRY = document.querySelector("#tmpl>.entry"),
            KEY = document.querySelector("#tmpl>.key"),
            ul = document.querySelector("#entries>ul"),
            rules = atv.r,
            kl = rules.length,
            
            types = atv.t,
            
            m = atv.m,
            EL = atv.EL,

            back = (EL * limit)
        ;
        ul.innerHTML = "";
        for (
            var
                i = 0,
                j = 0,
                en = null,
                enul = null,
                k = null,
                type = 0,
                O = 0,
                rule = 0,
                button = null
            ;
            i < l;
            i++, (j=0), (O += EL), (back += 4)
        ) {
            enul = (
                (en = ENTRY.cloneNode(true))
                .querySelector("ul")
            );
            (
                button = en.querySelector("button")
            )
            .addEventListener("click", entry_click);

            button.setAttribute("data-a", i.toString());
            button.setAttribute("data-b", (d.getUint32(back, true)).toString());
            
            for ( ; j < kl; j++ ) {
                type = types[j];
                k = KEY.cloneNode(true);

                k.style.width = (
                    (keys[j].w).toString() + "px"
                );
                k.style.color = (
                    color[type]
                );
                rule = rules[j];
                
                k.querySelector("span")
                .textContent = (
                    bfrom[type](d,O + m[j][0],true,rule)
                    .toString()
                );
                
                enul.appendChild(k);
            };
            ul.appendChild(en)
            
        };
        return undefined;
    }
)