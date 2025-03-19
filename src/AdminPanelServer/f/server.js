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
            get = (
                (u) => {
                    var
                        i = 0,
                        
                        tb = t[
                            u.substring(0, (i = u.indexOf("/")))
                        ],
                        l = Number(u.substring(i, (i = (u.indexOf("/"))))),
                        B = tb.entry(l, 4),
                        I = new Uint32Array(l),
                        EL = tb.EL,
                        o = EL
                    ;
                    // /t/get/0/5/
                    tb.read(
                        B,
                        I,
                        l,

                        Q,
                        QL,
                        QV,
                    );
                    i = 0;

                    for (;i<l;i++, o+=EL) {
                        B.writeUInt8(I[i], o)
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
                        .startsWith('get/')
                        ? (
                            s
                            .setHeader("Content-Type", "application/octet-stream")
                            .writeHead( 200, null )
                            .end( get )
                        )
                        :
                        u.endsWith('/c')
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