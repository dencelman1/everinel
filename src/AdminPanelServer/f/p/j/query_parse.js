import fill_str from './fill_str.js';
import trim_str from './trim_str.js';


export default (
    (NUMBER_TYPES, int_rg, float_rg) => (v,ct,a,bto) => {
        var
            Q = [],

            qv = [],

            av = a.v,
            keys = a.n.k,

            rules = av.r,
            types = av.t,
            
            cond = av.cond,
            logic = av.lg,
            
            stage = 0,
            sepa = " ",
            valid = false
        ;
        v+=sepa;
        a:for (
            var
                i = 0,
                l = v.length,

                pass = 0,

                c = "",
                token = "",

                length = 0,
                token_length = 0,

                type = 0,
                I = 0,
                cond_oper = 0,

                bf = null,

                isstr = false,
                istrue = false,
                isfloat = false
            ;
            i < l;
            i++
        ) {
            if ((c = v[i]) !== " ") {
                token = "";
                b: while (i < l) {
                    if (pass) {
                        pass--;
                        i++;
                        continue b;
                    };

                    if ((c = v[i]) !== sepa) {
                        token += c;
                        i++;
                    }
                    else {
                        if ((stage === 0) && (valid = (keys).includes(token))) {
                            Q.push(I = keys.indexOf(token));
                            type = types[I];
                            stage++;
                            length = rules[I];

                        }
                        else if ((stage === 1) && (valid = Object.hasOwn(cond, token))) {
                            Q.push(cond_oper = cond[token]);
                            sepa = (
                                (isstr = (type === 1) || (type === 13))
                                ? (
                                    (pass = 1),
                                    '"'
                                )
                                : ' '
                            );
                            stage++;
                        }
                        else if ((stage === 2)) {
                            if ( isstr )  {
                                if (v[i-1] === "\\") {
                                    token = token.substring(0, token.length - 1) + '"';
                                    i++;
                                    continue b;
                                }
                                else {
                                    Q.push(qv.length);
                                    
                                    qv.push(
                                        Array
                                        .from(
                                            new TextEncoder()
                                            .encode(
                                                (cond_oper === 5)
                                                ? token
                                                :
                                                (token_length = token.length) < (length)
                                                ? fill_str(token, length, (type === 1 ? 1: 2))
                                                :
                                                token_length > length
                                                ? trim_str(token, length)
                                                : token
                                            )
                                        )
                                    );
                                    sepa = " ";
                                }
                            }
                            else if (type === 2) {
                                (valid = ((istrue = (token === "true")) || (token === "false")))
                                &&
                                (
                                    Q.push(qv.length),
                                    qv.push([istrue ? 1: 0]),
                                    (sepa = " ")
                                );
                            }
                            else if (
                                NUMBER_TYPES.includes(type)
                            ) {
                                if (valid = (
                                    (
                                        (isfloat = (type === 11) || (type === 12))
                                        ? float_rg
                                        : int_rg
                                    )
                                    .test(token)
                                )) {
                                    
                                    bto[type](
                                        (bf = new DataView(new ArrayBuffer(rules[types.indexOf(type)]))),
                                        0,
                                        (
                                            isfloat
                                            ? parseFloat
                                            :
                                            (((type) === 9) || (type === 5))
                                            ? BigInt
                                            :
                                            parseInt
                                        )(token),
                                        true,
                                        0
                                    );
                                    Q.push(qv.length),
                                    qv.push(Array.from(new Uint8Array(bf.buffer, bf.byteOffset, bf.byteLength)))
                                }
                            };
                            
                            stage++;
                        }
                        else if ((stage === 3) && (valid = Object.hasOwn(logic, token))) {
                            Q.push(logic[token]);
                            stage = 0;
                        };

                        if (!valid) {
                            break a;
                        };

                        break b;
                    };
                }
            }
        };

        ct.qp = Q.join("/");
        ct.qv = qv;
        
        ct.ql = Q.length;

        return (
            ct.qr = (
                (v.length === 1)
                ||
                (
                    valid
                    &&
                    (stage === 3)
                )
            )
        );
    }
)(
    [0,3,4,5,6,7,8,9,10,11],
    /^-?\d+$/,
    /^-?\d+(\.\d+)?$/
)