

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
                l = 1
            ;
            return (
                d.setInt8(0, 1),
                ({
                    d,
                    k: Array.from(v.n.k, fields_from(V.r,16,width,V.t)),
                    
                    e: null,
                    el: 0,

                    q: "",
                    qr: true,

                    qp: "",
                    ql: 0,
                    qv: [],
                    qlimit:l,

                    le:Math.floor(1048576 / EL),
                    l,
                    o: 0,

                    i: -1,
                    cudmsg: false,
                })
            );
        }
    )
;