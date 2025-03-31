# everinel

Admin panel that is compatible with the [purekeep](https://github.com/dencelman1/purekeep) database


# Installation:

- Before running you need to install these packages:

```sh
npm i purekeep everinel
```

# Configurations:

```js

import {Type as _} from "purekeep"

var
    names = [
        {
            n: "User example",
            k: ["some_value", "name", "is_vip", "percent"],
        },
        {
            n: "vector4_int8",
            k: ["x", "y", "z", "w"],
        }
    ],

    pathes = [
        "path to User example",
        "path to vector4_int8",
    ],

    tables = (
        (
            fs, fba, bs,
            int8, str8, bool
        ) => (
            [
                {
                    fs,
                    bs,
                    fba,

                    t: [
                        int8,
                        str8,
                        bool,
                        int8
                    ],
                    r: [0,13,0,0],
                },
                {
                    fs,
                    bs,
                    fba,
                    
                    t: [ int8, int8, int8, int8 ],
                    r: [0,0,0,0],
                },
            ]
        )
    )(
        4294967296, // 4*(1024**3) // database file size
        0, // blocks amount, if > 0 then all blocks of database file size
        4096, // block_size

        _.int8,
        _.str8,
        _.bool,
    )
;

```

- for detailed explanation of:

fs - table file size in bytes;
bs - blocks amount;
bs - block size;
t - types of fields;
r - lengths of fields;

-> go to README.md file view in purekeep repository - [link](https://github.com/dencelman1/purekeep);


# Deploy ( if you haven't done so yet ):

```js
import { table_deploy_many } from 'purekeep';

table_deploy_many(tables, pathes);
```

# Run local admin panel server:

```js
import { AdminPanelServer } from 'everinel';
import { table_many, table_config_many, single } from 'purekeep';

(
    (
        port,
    ) => {
        // if you connect to tables with config:
        var ap_tables = table_config_many(names, pathes);

        // else if you already have runned tables on your backend:
        var
            runned_tables = [
                single("users table path"),
                single("table1 path"),
                single("sessions table path"),
                single("table5 path"),
                // .... - there are examples of your projects' tables
            ],
            
            // in same order like in the names too (inside runned_tables)

            ap_tables = table_many(names, runned_tables)
        ;
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
```

# Then:

type http://localhost:2000/h/a.html into your browser's search input;

if you got error in console - restart server;


# Explanation about interface:

Soon....
