import { dirname, extname, join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import { create_body, read_body } from './body/i.js';


export default (
    (tables, funcs) => {
        var
            h = {
                ".html": () => "text/html",
                ".css":  () => "text/css",
                ".js":   () => "text/javascript",
                ".json": () => "application/json"
            },
            pb = join( dirname( fileURLToPath( import.meta.url ) ), "p" ),

            create = funcs.create,
            read = funcs.read,


            oncreate = (b,tb,s) => {
                var v = create(tb,s,b,Buffer.allocUnsafe(8));
                return (
                    crud_a(s)
                    .writeHead( 200, null )
                    .end(
                        v
                    )
                );
            },

            
            crud_a = (s) => (
                s
                .setHeader("Content-Type", "application/octet-stream")
            ),

            buffer_from = (v) => Buffer.from(v)
        ;
        
        return (
            (q,s) => {
                var
                    p = "",
                    u = q.url,
                    query = "",
                    i = 0
                ;
                
                return (
                    u.startsWith("/t/")
                    ? (
                        (u = u.substring(3))
                        .startsWith('read/')
                        ? (
                            read_body(
                                q,
                                s,
                                tables[
                                    (u = u.substring( 6 + (query = u.substring(5, u.indexOf("/",5))).length)),

                                    parseInt( query )
                                ],
                                u,
                                buffer_from,
                                read
                            )
                        )
                        :
                        u
                        .startsWith('create/')
                        ? (
                            create_body(
                                q,
                                s,
                                tables[parseInt(u.substring(7))],
                                oncreate
                            )
                        )
                        :
                        u.endsWith('c')
                        ? (
                            s
                            .setHeader("Content-Type", "application/json")
                            .writeHead( 200, null )
                            .end( JSON.stringify( tables ) )
                        )
                        : s.writeHead(404, null).end()
                        
                    )
                    : (
                        ((i = u.indexOf("?")) === -1)
                        ||
                        (
                            query = u.substring(i + 1),
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