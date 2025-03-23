import td_str8 from './td_str8.js';
import td_str16le from './td_str16le.js';
import td_str16be from './td_str16be.js'

export default (
    [
        (v,o,e,_) => v.getInt8(o),
        (v,o,e,l) => (
            td_str8.decode(new Uint8Array(v.buffer, o, l))
        ),
        (v,o,e,_) => (v.getInt8(o) === 1),

        (v,o,e,_) => v.getInt16(o, e),
        (v,o,e,_) => v.getInt32(o, e),
        (v,o,e,_) => v.getBigInt64(o, e),

        (v,o,e,_) => v.getUint8(o),
        (v,o,e,_) => v.getUint16(o, e),
        (v,o,e,_) => v.getUint32(o, e),
        (v,o,e,_) => v.getBigUint64(o, e),

        (v,o,e,_) => v.getFloat32(o, e),
        (v,o,e,_) => v.getFloat64(o, e),

        (v,o,e,l) => (
            (
                e
                ? td_str16le
                : td_str16be
            )
            .decode(
                new Uint8Array(v.buffer, o, l)
            )
        ),
    ]
);
