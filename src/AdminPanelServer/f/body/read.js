

// `${gv_size}/${ct.o}/${ct.l}/${ct.ql}/${ct.qp}`;


export default (
    (q,s,tb,u,bufferfrom,cb) => {
        var
            _ = 0,
            qv = Buffer.allocUnsafe( Number( u.substring( 0, ( _ = u.indexOf("/") ) ) ) ),

            o = Number( u.substring( _+1, ( _ = u.indexOf("/",_+1) ) ) ),
            l = Number( u.substring( _+1, ( _ = u.indexOf("/",_+1) ) ) ),
            ql = Number( u.substring( _+1, ( _ = u.indexOf("/",_+1) ) ) ),
            
            t = tb.v,
            
            qpi = _ + 1
        ;

        _ = 0;
        return (
            q
            .on("data", (c) => (
                c.copy(qv, _),
                (_ += c.length)
            ))
            .on("end", () => {
                return cb(
                    s,t,
                    o,l,
                    ql,
                    ql ? Array.from(u.substring(qpi).split('/'),Number): [],
                    Array.from(JSON.parse(qv), bufferfrom)
                )
            })
        );
    }
)