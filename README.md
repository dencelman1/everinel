# everinel

Admin panel that is compatible with the [purekeep](https://github.com/dencelman1/purekeep) database


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


# Deploy ( if not yet ):

```js
import { table_deploy_many } from 'purekeep';

table_deploy_many(tables, pathes);
```

# Run local admin panel server:

```js
import { AdminPanelServer } from 'everinel';
import { table_many } from 'purekeep';

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
```

# Then:

type http://localhost:2000/h/a.html into your browser's search input;

if you got error in console - restart server;
