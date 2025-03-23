

export default (
    (s,t,o,l,QL,Q,QV) => {
        var
            EL = t.EL,
            back = l*EL,
            B = t.entry(l, ((l) * 4)),
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
                        B, I,

                        o,l,

                        Q, QL, QV,
                    )
                )
            )
            .toString()
        );
        for(var i = 0; i<f;((i++), (back += 4))) {
            B.writeUint32LE(I[i], back);
        };
        s.writeHead(200, null);
        return s.end(B);
    }
)