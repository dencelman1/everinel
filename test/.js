import {AdminPanelServer} from '../src/i.js';
import {table_many} from '#purekeep';
import names from './c/names.js';
import pathes from './c/pathes.js';

(
    (
        port,
    ) => {
        return (
            AdminPanelServer(
                port,
                table_many(names, pathes),
                () => console.log(port)
            )
        );
    }
)(
    2000
);
