

export default (
    (d,l, atv,keys,color,bfrom) => {
        var
            ENTRY = document.querySelector("#tmpl>.entry"),
            KEY = document.querySelector("#tmpl>.key"),
            ul = document.querySelector("#entries>ul"),
            rules = atv.r,
            kl = rules.length,
            
            types = atv.t,
            
            m = atv.m,
            EL = atv.EL
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
                rule = 0
            ;
            i < l;
            i++, (j=0), (O += EL)
        ) {
            enul = (
                (en = ENTRY.cloneNode(true))
                .querySelector("ul")
            );
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