import { Type as _ } from '#purekeep';
import {join} from 'path';


export default (
    (a, mx,  int8, str8, bool) => [
        {
            mx,

            n: "User example",
            k: ["some_value", "name", "is_vip", "percent"],

            p: join(a, "user_example"),
            t: [ int8, str8, bool, int8 ],
            r: [0,20,0,0],
        },
        {
            mx,

            n: "vector4_int8",
            k: ["x", "y", "z", "w"],

            p: join(a, "v4i8"),
            t: [ int8, int8, int8, int8 ],
            r: [0,0,0,0],
        },
    ]
)(
    join(process.cwd(), 'test/tables'),
    Number.MAX_SAFE_INTEGER,
    _.int8,
    _.str8,
    _.bool,
);
