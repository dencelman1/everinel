

export default (
    (t, u,s,b) => {
        var
            tb = t[
                u.substring(0, u.indexOf("/"))
            ],
            B = Buffer.allocUnsafe(8)
        ;

        // /t/create/[table_id]

        s.setHeader(
            "x-a",
            "1"
        );
        B.writeBigUInt64LE(BigInt(tb.create(b)))
        
        return B;
    }
)