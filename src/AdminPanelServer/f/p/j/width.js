

export default (
    (_1, _100,_3, _5,_10, _20) => [
        _3,
        _100, // 
        _1,

        _5,
        _10,
        _20,

        _3,
        _5,
        _10,
        _20,

        _100,
        _100,

        _100 // 
    ]
)(
    () => 20,
    () => 100,
    () => 60,
    () => 100,
    () => 200,
    () => 400
)