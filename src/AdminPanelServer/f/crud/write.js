

export default (
    (
        s,
        tb,
        from_i,
        B,
        EL,
        bs,
        b,
    ) => (
        s
        .setHeader("x-a", tb.paste(from_i, B, 0, b, bs, EL).toString())
        .writeHead(200, null)
        .end()
    )
);
