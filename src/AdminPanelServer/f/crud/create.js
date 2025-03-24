
// /t/create/[table_id]

export default (
    (tb, s,b,B) => (
        s.setHeader("x-a", "1"),
        B.writeUInt32LE(tb.v.create(b)),
        B
    )
)