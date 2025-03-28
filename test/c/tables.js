
import { Type as _ } from '#purekeep';

export default (
    (
        (fs, int8, str8, bool) => (
            [
                {
                    fs,
                    t: [ int8, str8, bool, int8 ],
                    r: [0,20,0,0],
                },
                {
                    fs,
                    t: [ int8, int8, int8, int8 ],
                    r: [0,0,0,0],
                },
            ]
        )
    )(
        1003520,
        _.int8,
        _.str8,
        _.bool,
    )
)