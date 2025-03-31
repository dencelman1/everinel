

export var
    tables_from = (
        (fields_from,width) => (v) => {
            var
                V = v.v,
                EL = V.EL,
                d = (
                    new DataView(
                        new ArrayBuffer(
                            EL
                        )
                    )
                ),
                l = 1,

                max_so = (V.fs - 1)
            ;
            return (
                {
                    d,
                    k: Array.from(v.n.k, fields_from(V.r,16,width,V.t)),
                    
                    e: null,
                    el: 0,

                    max_so,

                    from_i: 0,
                    ea: V.bs,
                    
                    i: -1,

                    q: "",
                    qr: true,

                    qp: "",
                    ql: 0,
                    qv: [],

                    qlimit:l,

                    le: Math.floor(1048576 / EL),
                    l,
                    o: 0,

                    cudmsg: false,

                    entry_buffer: new DataView(new ArrayBuffer(EL)),
                    add_buffer: new DataView(new ArrayBuffer(EL)),
                }
            );
        }
    )
;