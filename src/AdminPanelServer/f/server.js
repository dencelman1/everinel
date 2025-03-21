import { dirname, extname, join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';


export default (
    (t, tc,funcs) => {
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
            ZERO = () => 0,
            crud_a = (s) => (
                s
                .setHeader("Content-Type", "application/octet-stream")
                .writeHead( 200, null )
            ),
            
            read = funcs.read,
            create = funcs.read
        ;
        
        return (
            (q,s) => {
                var
                    p = "",
                    u = q.url,
                    q = "",
                    i = 0
                ;
                
                return (
                    u.startsWith("/t/")
                    ? (
                        (u = u.substring(3))
                        .startsWith('read/')
                        ? (
                            body((b) => (
                                crud_a(s)
                                .end(read(t, ZERO, u.substring(5),s,b))
                            ))
                        )
                        :
                        u
                        .startsWith('create/')
                        ? (
                            body((b) => (
                                crud_a(s)
                                .end(create(t, u.substring(7),s,b))
                            ))
                        )
                        :
                        u.endsWith('c')
                        ? (
                            s
                            .setHeader("Content-Type", "application/json")
                            .writeHead( 200, null )
                            .end( JSON.stringify(tc) )
                        )
                        : s.writeHead(404, null).end()
                        
                    )
                    : (
                        ((i = u.indexOf("?")) === -1)
                        ||
                        (
                            q = u.substring(i + 1),
                            (u = u.substring(0,i))
                        ),

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
                )
            }
        )
    }
)