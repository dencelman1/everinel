

export default (
    (FORM_I, form_fields, onintblur) => (
        (
            (T,v,i) => {
                var
                    t = T[i],
                    r = FORM_I.cloneNode(true),
                    I = r.querySelector("input")
                ;
                return (
                    (
                        r.querySelector("span").textContent = v
                    ),
                    
                    I.setAttribute("data-a", i.toString()),


                    t === 2
                    ? (
                        I.setAttribute("type","checkbox")
                    )
                    :
                    (t === 12 || t === 1)
                    ? (
                        I.setAttribute("type","text")
                    )
                    : (
                        I.setAttribute("type","number"),
                        I.addEventListener("blur", onintblur),

                        (I.value = (
                            (t === 10 || t === 11)
                            ? "0.0"
                            : "0"
                        ))
                    ),

                    form_fields.appendChild(r),
                    T
                );
            }
        )
    )
)