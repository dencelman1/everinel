import {join} from 'path';

export default (
    (a) => [
        join(a, "user_example"),
        join(a, "v4i8"),
    ]
)(
    join(process.cwd(), 'test/tables'),
)