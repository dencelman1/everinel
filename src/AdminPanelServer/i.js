import * as a from './f/i.js';
import {createServer} from 'http';

export default (
    (port, tables, onstart) => {
        var
            s = (
                createServer(
                    a
                    .server(
                        tables,
                        a
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
