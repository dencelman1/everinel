

export default (
    (
        FORM_I,
        form_fields,
        onintblur,
        
        checkbox,
        text,
        integer,
        float,
        big_integer,

        A,
        bfrom,
        a,
        tables,

        load_input,
        to_input
    ) => {
        return (
            (T,v,i) => {
                var
                    t = T[i],
                    r = FORM_I.cloneNode(true),
                    I = r.querySelector("input"),

                    TABLE_I = A(),
                    at = a[TABLE_I],
                    atv = at.v,
                    l = atv.r[i]
                    
                ;
                
                return (
                    (
                        r.querySelector("span").textContent = v
                    ),
                    
                    I.setAttribute("data-a", i.toString()),


                    t === 2
                    ? (
                        I.setAttribute("type","checkbox"),
                        I.addEventListener("change", checkbox)
                    )
                    : (
                        
                        (t === 12 || t === 1)
                        ? (
                            I.setAttribute("type","text"),
                            I.addEventListener("input", text),
                            I.setAttribute("maxlength", l.toString())
                        )
                        : (
                            I.setAttribute("type","number"),
                            I.addEventListener("blur", onintblur),

                            ((t === 10) || (t === 11))
                            ? I.addEventListener("input", float)
                            : I.addEventListener("input", (

                                ((t === 5) || (t === 9))
                                ? big_integer
                                : integer

                            ))
                        )
                    ),

                    load_input(
                        I,
    
                        t,
    
                        bfrom[t](
                            tables[TABLE_I].d,
                            atv.m[i],
                            true,
                            l
                        ),
                        
                        l,
    
                        to_input
                    ),

                    form_fields.appendChild(r),
                    T
                );
            }
        )
    }
)