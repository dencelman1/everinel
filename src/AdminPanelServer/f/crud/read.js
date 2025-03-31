

export default (
    (s,t,o,l,QL,Q,QV,w,wl,block,sb,bs,i,ea) => {
        var
            EL = t.EL,
            back = l*EL,
            B = t.struct(w, l, ((l) * 4)),
            I = new Uint32Array(l),
            f = 0
        ;

        s
        .setHeader("Content-Type", "application/octet-stream")
        .setHeader(
            "x-a",
            (
                f = (
                    t.read(
                        B,I, 0,

                        i, ea,
                        
                        o, l,

                        Q, QL, QV,

                        w, wl,

                        block, sb, bs,
                    )
                )
            )
            .toString()
        );
        for(var i = 0; i<f;((i++), (back += 4))) {
            B.writeUint32LE(I[i], back);
        };
        
        return (
            s.writeHead(200, null),
            s.end(B)
        );
    }
)