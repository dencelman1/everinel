import {AdminPanelServer} from '../src/i.js';
import {table_many} from '#purekeep';
import tables from './tables.js';


(
    (
        port,
    ) => {
        return (
            AdminPanelServer(
                port,
                tables,
                table_many(tables),
                () => console.log(port)
            )
        );
    }
)(
    2000
);
