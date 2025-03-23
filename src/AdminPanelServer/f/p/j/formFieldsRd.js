

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

        trim_str
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
                    l = 0
                ;
                return (
                    (
                        r.querySelector("span").textContent = v
                    ),
                    
                    I.setAttribute("data-a", i.toString()),


                    t === 2
                    ? (
                        (
                            I.checked =
                                bfrom[t](
                                    tables[TABLE_I].d,
                                    atv.m[i][0],
                                    true,
                                    0
                                )
                        ),
                        I.setAttribute("type","checkbox"),
                        I.addEventListener("change", checkbox)
                    )
                    : (
                        
                        (t === 12 || t === 1)
                        ? (
                            I.setAttribute("type","text"),
                            I.addEventListener("input", text),
                            (
                                I.value =
                                    trim_str(
                                        bfrom[t](
                                            tables[TABLE_I].d,
                                            atv.m[i][0],
                                            true,
                                            (l = atv.r[i])
                                        ),
                                        l
                                    )
                            ),
                            I.setAttribute("maxlength", l.toString())
                        )
                        : (
                            (
                                I.value =
                                    (
                                        bfrom[t](
                                            tables[TABLE_I].d,
                                            atv.m[i][0],
                                            true,
                                            (atv.r[i])
                                        )
                                    )
                                    .toString()
                            ),
                            
                            I.setAttribute("type","number"),
                            I.addEventListener("blur", onintblur),

                            (
                                (t === 10 || t === 11)
                                ? I.addEventListener("input", float)
                                : (
                                    I.addEventListener("input", (
                                        ((t === 5) || (t === 9))
                                        ? big_integer
                                        : integer
                                    ))
                                )
                            )
                        )
                    ),

                    form_fields.appendChild(r),
                    T
                );
            }
        )
    }
)