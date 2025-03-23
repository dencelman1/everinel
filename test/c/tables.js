
import { Type as _, max_length } from '#purekeep';

export default (
    (
        (mx,  int8, str8, bool) => (
            [
                {
                    mx,
                    t: [ int8, str8, bool, int8 ],
                    r: [0,20,0,0],
                },
                {
                    mx,
                    t: [ int8, int8, int8, int8 ],
                    r: [0,0,0,0],
                },
            ]
        )
    )(
        max_length,
        _.int8,
        _.str8,
        _.bool,
    )
)