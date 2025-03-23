

export default (
    (q,s,tb,cb) => {
        var
            b = Buffer.allocUnsafe(tb.v.EL),
            o = 0
        ;
        return (
            q
            .on("data", (c) => (
                c.copy(b, o),
                (o += c.length)
            ))
            .on("end", () => cb(b,tb,s))
        );
    }
)