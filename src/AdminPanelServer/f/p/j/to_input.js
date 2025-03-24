import trim_str from './trim_str.js';


export default (
    (parseInt, str, BigInt,parseFloat) => [
        parseInt,
        str,
        ((v) => (v)),

        parseInt,
        parseInt,
        BigInt,

        parseInt,
        parseInt,
        parseInt,
        BigInt,

        parseFloat,
        parseFloat,
        
        str,
    ]
)(
    (v,_) => v.toString(),
    trim_str,
    (v,_) => v.toString(),
    (v,_) => v.toString()
);
