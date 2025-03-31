

// qv_size/o/l/ql/from_i/ea/qp/


export default (
    (q,s,tb,u,bufferfrom,cb) => {
        var
            _ = 0,
            qv = Buffer.alloc( Number( u.substring( 0, ( _ = u.indexOf("/") ) ) ), "\x00", "utf-8" ),

            o = Number( u.substring( _+1, ( _ = u.indexOf("/",_+1) ) ) ),
            l = Number( u.substring( _+1, ( _ = u.indexOf("/",_+1) ) ) ),
            ql = Number( u.substring( _+1, ( _ = u.indexOf("/",_+1) ) ) ),

            i = Number( u.substring( _+1, ( _ = u.indexOf("/",_+1) ) ) ),
            ea = Number( u.substring( _+1, ( _ = u.indexOf("/",_+1) ) ? _ : undefined ) ),
            
            t = tb.v,

            bs = t.bs,

            block = Buffer.alloc(bs, "\x00", "utf-8"),
            sb = t.subarray(block,bs),

            w = t.entry,
            wl = w.length,
            
            qpi = _ + 1
        ;
        return (
            (_ = 0),

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
                    Array.from(JSON.parse(qv), bufferfrom),

                    w,wl,block,sb,bs,i,ea
                )
            })
        );
    }
)