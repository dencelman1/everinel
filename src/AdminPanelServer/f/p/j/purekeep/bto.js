import te_str8 from "./te_str8.js";

export default (
    [
        (v,o,n,_,l) => v.setInt8(o,n),
        (v,o,n,_,l) => (
            (new Uint8Array(v.buffer, o, l))
            .set(te_str8.encode(n))
        ),
        (v,o,n,_,l) => v.setInt8(o,(n ? 1 : 0)),

        (v,o,n,e,l) => v.setInt16(o,n,e),
        (v,o,n,e,l) => v.setInt32(o,n,e),
        (v,o,n,e,l) => v.setBigInt64(o,n,e),

        (v,o,n,_,l) => v.setUint8(o,n),
        (v,o,n,e,l) => v.setUint16(o,n,e),
        (v,o,n,e,l) => v.setUint32(o,n,e),
        (v,o,n,e,l) => v.setBigUint64(o,n,e),

        (v,o,n,e,l) => v.setFloat32(o,n,e),
        (v,o,n,e,l) => v.setFloat64(o,n,e),

        (v,o,n,e,l) => {
            for (
                var
                    i = 0,
                    j = 0
                ;
                i < l;
                ((i += 2), (o += 2), (j++))
            ) {
                v.setUint16(o, n.charCodeAt(j), e);
            };
        }
    ]
)