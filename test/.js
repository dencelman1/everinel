import {AdminPanelServer} from '../src/i.js';
import {table_config_many} from '#purekeep';
import names from './c/names.js';
import pathes from './c/pathes.js';

(
    (
        port,
    ) => {
        var ap_tables = table_config_many(names, pathes);

        return (
            AdminPanelServer(
                port,
                ap_tables,
                () => console.log(port)
            )
        );
    }
)(
    2000
);
