

export default (
    (I,t, d,o,l,bfrom,to_input) => {
        return console.log(
            I[
                t === 2
                ? "checked"
                : "value"
            ] = (
                to_input[t](
                    
                    bfrom[t](
                        d,
                        o,
                        true,
                        l
                    ),

                    l
                    
                )
            )
        );
    }
)