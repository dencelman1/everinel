import * as a from './f/i.js';
import {createServer} from 'http';

export default (
    (port, tconf, tables, onstart) => {
        var
            s = (
                createServer(
                    a
                    .server(
                        tables,
                        tconf
                    )
                )
            )
        ;
        return (
            s
            .on("error", console.error)
            .listen(port, onstart)
        );
    }
);
