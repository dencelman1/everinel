
import { Type as _ } from '#purekeep';

export default (
    (
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
        4294967296, // 4*(1024**3)
        0,
        4096,

        _.int8,
        _.str8,
        _.bool,
    )
)