


export default (
    (v,ct,a,bto) => {
        var
            Q = [],

            qv = [],

            int_rg = /^-?\d+$/,
            float_rg = /^-?\d+(\.\d+)?$/,

            av = a.v,
            keys = a.n.k,

            rules = av.r,
            types = av.t,
            
            cond = av.CompareType,
            logic = av.LogicType,
            
            stage = 0
        ;
        a:for (
            var
                i = 0,
                sepa = " ",
                l = (v+=sepa).length,

                pass = 0,

                c = "",
                token = "",

                valid = false,

                type = 0,
                I = 0,

                bf = null,

                isstr = false,
                istrue = false
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
                        }
                        else if ((stage === 1) && (valid = Object.hasOwn(cond, token))) {
                            Q.push(cond[token]);
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
                                    qv.push(Array.from(new TextEncoder().encode(token)));
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
                            else if ((type === 11) && (type === 12)) {

                                if (valid === float_rg.test(token)) {
                                    bf = new DataView(new ArrayBuffer(rules[types.indexOf(type)]));
                                    bto[type](bf,0,parseFloat(token),true,0);

                                    Q.push(qv.length);

                                    qv.push(Array.from(new Uint8Array(bf.buffer, bf.byteOffset, bf.byteLength)))
                                }
                            }
                            else if (((type) === 9) || (type === 5)) {
                                if (valid === int_rg.test(token)) {
                                    bf = new DataView(new ArrayBuffer(rules[types.indexOf(type)]));
                                    bto[type](bf,0,BigInt(token),true,0);

                                    Q.push(qv.length);
                                    qv.push(Array.from(new Uint8Array(bf.buffer, bf.byteOffset, bf.byteLength)))
                                }
                            }
                            else {
                                if (valid === int_rg.test(token)) {
                                    bf = new DataView(new ArrayBuffer(rules[types.indexOf(type)]));
                                    bto[type](bf,0,parseInt(token),true,0);

                                    Q.push(qv.length);
                                    qv.push(Array.from(new Uint8Array(bf.buffer, bf.byteOffset, bf.byteLength)))
                                }
                            }
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
                (stage === 3)
            )
        );
    }
)