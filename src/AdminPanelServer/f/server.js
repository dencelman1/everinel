import { dirname, extname, join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import { read_body, write_body } from './body/i.js';


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

            read = funcs.read,
            write = funcs.write,

            buffer_from = (v) => Buffer.from(v)
        ;
        // application/octet-stream
        
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
                        .startsWith('write/')
                        ? (
                            write_body(
                                q,
                                s,
                                tables[
                                    parseInt(
                                        u.substring(6, (i = u.indexOf("/", 7)) )
                                    )
                                ]
                                .v,
                                Number(u.substring(i + 1)),
                                write
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