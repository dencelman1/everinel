

export default (
    (I,t, v,l,to_input) => {
        return (
            (
                I[
                    t === 2
                    ? "checked"
                    : "value"
                ] = (
                    to_input[t](
                        v,
                        l
                    )
                )
            ),
            v
        );
    }
)