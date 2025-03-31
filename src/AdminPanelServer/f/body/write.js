

export default (
    (q,s,tb,from_i,cb) => {
        var
            _ = 0,
            EL = (tb.EL),
            bs = tb.bs,
            B = Buffer.alloc( EL, "\x00", "utf-8" )
        ;
        console.dir([
            from_i,
        ]);

        return (
            q
            .on("data", (c) => (
                c.copy(B, _),
                (_ += c.length)
            ))
            .on("end", () => {
                return cb(
                    s,
                    tb,
                    from_i,
                    B,
                    EL,
                    bs,
                    Buffer.alloc(bs, "\x00", "utf-8"),
                )
            })
        );
    }
)