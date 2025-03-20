import { dirname, extname, join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';






    

    

export default (
    (t, tc) => {
        var
            h = {
                ".html": () => "text/html",
                ".css":  () => "text/css",
                ".js":   () => "text/javascript",
                ".json": () => "application/json"
            },
            pb = join( dirname( fileURLToPath( import.meta.url ) ), "p" ),
            body = (
                (cb) => {
                    var b = '';
                    return (
                        req
                        .on('data', a => (b += a))
                        .on('end', () => cb(b))
                    )
                }
            ),
            read = (
                (u,s,b) => {
                    var

                        i = 0,

                        tb = t[
                            u.substring(0, (i = u.indexOf("/")))
                        ],
                        rules = tb.t,

                        O = th.arrayFromO,

                        EL = tb.EL,

                        o = Number(u.substring(++i, (i = (u.indexOf("/", i))))),
                        l = Number(u.substring(++i, (i = (u.indexOf("/", i))))),
                        QL = Number(u.substring(++i, (i = (u.indexOf("/", i))))),

                        from = 0,

                        l4 = (4 * l),
                        B = tb.entry(l, l4),
                        // al = l + l4,

                        I = new Uint32Array(l),
                        QVL = (O.length = Math.ceil(QL/4)),

                        QV = Array.from(((O.length = QVL), O), tb.NULL),
                        QVT = Array.from(((QV), () => 0)),
                        qvi = 0,

                        f = 0,

                        Q = new Uint8Array(QL),
                        ai = 0,
                        qai = 0,
                        ai2 = 0
                    ;
                    // /t/read/[table_id]/[offset]/[length]/[QL]/
                    // /[field]/[operation_id]/[value]/[logic_operation_id]/....
                    
                    for (
                        ;
                        ai < QL;
                        ai++
                    ) {
                        qai = Number(u.substring(++i, (i = (u.indexOf("/", i)))));

                        ((ai2 = ai - 2) % 4)
                        ||
                        ( QVT[qai] = rules[ai2] );

                        Q[ai] = qai;
                    };

                    ai = 0;
                    
                    for (;ai<QVL;ai++) {
                        QV[ai] = Buffer.from(b.substring(qvi, (qvi+=QVT[ai])))
                    };

                    s.setHeader(
                        "x-a",
                        (
                            f = (
                                tb.read(
                                    B, I,
            
                                    o,l,
            
                                    Q, QL, QV,
                                )
                            )
                        )
                        .toString()
                    );
                    
                    for (
                            (i = 0),
                            (from = EL * l)
                        ;
                        i < f;
                        (from += 4), i++
                    ) {
                        B.writeUInt8(I[i], from)
                    };
                    return B;
                }
            )
        ;

        

        return (
            (q,s) => {
                var
                    p = "",
                    u = q.url
                ;
                return (
                    u.startsWith("/t/")
                    ? (
                        (u = u.substring(3))
                        .startsWith('read/')
                        ? (
                            body((b) => (
                                s
                                .setHeader("Content-Type", "application/octet-stream")
                                .writeHead( 200, null )
                                .end( read(u.substring(5),s,b) )
                            ))
                        )
                        :
                        u.endsWith('c')
                        ? (
                            s
                            .setHeader("Content-Type", "application/json")
                            .writeHead( 200, null )
                            .end( JSON.stringify(t) )
                        )
                        : s.writeHead(404, null).end()
                        
                    )
                    :
                    existsSync(
                        p = join(pb, u)
                    )
                    ? (
                        s
                        .setHeader("Content-Type", h[extname(u)]())
                        .writeHead(200, null)
                        .end( readFileSync( p, "utf8" ) )
                    )
                    : s.writeHead(404, null).end()
                )
            }
        )
    }
)