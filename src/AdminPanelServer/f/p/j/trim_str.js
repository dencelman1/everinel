

export default (
    (v,l) => {
        var i = l-1;
        for (; i;i--){
            if (v[i] !== "\x00") {
                i++;
                break;
            };
        };
        return v.substring(0,i);
    }
)