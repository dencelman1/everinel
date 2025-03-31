
export default (
    (a,tables,getT,color,bfrom,bto,entry_click,load_entries) => {

        var
            copy = (s,t, tf, sf,st) => {
                for (; sf < st; ((sf++), (tf++))) {
                    t.setInt8(tf, s.getInt8(sf));
                };
                return t;
            },
            bs = (
                (bfrom,rule,a,EL,el,ido,field_o,entry_buffer,add_buffer,copy,f) => {
                    var
                        swapped = false,

                        i = 0,
                        id_i = ido,

                        id_j = 0,
                        iel = 0,
                        i_id = 0
                    ;
                    do {
                        swapped = false;
                        for (
                                i = 0,
                                id_i = ido
                            ;
                            i < el;
                            (i += EL), (id_i += 4)
                        ) {
                            
                            f((bfrom(a,i+field_o,true,rule)), (bfrom(a,(iel = i+EL)+field_o,true,rule)))
                            &&
                            (
                                
                                copy(a, entry_buffer, 0, i,   iel),
                                copy(a, add_buffer,   0, iel, iel + EL),

                                copy(entry_buffer, a, iel, 0,EL),
                                copy(add_buffer,   a, i,   0,EL),

                                (i_id = a.getUint32(id_i,true)),

                                a.setUint32(id_i, a.getUint32((id_j=id_i+4),true), true),
                                a.setUint32(id_j, i_id, true),

                                (swapped = true)
                            );
                        }
                    }
                    while (swapped);

                    return a;
                }
            ),


            to_more = (a,b) => (a > b),
            to_less = (a,b) => (b > a)
        ;

        return (
            function(event) {
                var
                    field = 0,

                    T = 0,

                    av = null,
                    ct = null,

                    qlimit = 0,
                    EL = 0,
                    el = 0,
                    
                    datab = false,

                    type = 0
                ;
                return (
                    
                    this.setAttribute("data-b", (!(datab = this.getAttribute("data-b") === "true")).toString()),

                    load_entries(
                        bs(
                            bfrom[type = (av = a[T = getT()].v).t[field = Number(this.getAttribute("data-a"))]],
                            
                            av.r[field],
                            (ct = tables[T]).e,
                            (EL = av.EL),
                            Math.max(0,(el = ct.el)-1)*EL,
                            (qlimit = ct.qlimit) * EL,
                            av.m[field],
                            ct.entry_buffer,
                            ct.add_buffer,
                            copy,

                            ( datab ? to_more : to_less )
                        ),
                        el,

                        av,
                        ct.k,

                        color,
                        bfrom,
                        entry_click,
                        qlimit
                    )

                );
            }
        )
    }
)
