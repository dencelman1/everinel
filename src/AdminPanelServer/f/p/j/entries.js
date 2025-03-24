


export var 
    _entry_click = (
        (T,a,tables, formopen,cudmsg,to_input,load_input,bfrom) => (e) => {
            var
                t = e.currentTarget,
                ti = T(),

                at = a[ti],
                atv = at.v,
                m = atv.m,
                rules = atv.r,
                EL = atv.EL,
                types = atv.t,

                ct = tables[ti],

                ii = ( Number(t.getAttribute('data-a')) * EL ),
                gi = Number(t.getAttribute('data-b')),

                d = ct.e,

                ul = document.querySelector("#form>form>ul")
            ;

            for (
                var
                    i = 0,
                    l = rules.length,
                    rule = 0,
                    type = 0
                ;
                i < l;
                (i++)
            ) {
                type = types[i];
                rule = rules[i];

                console.log(type);
                

                load_input(
                    ul.querySelector(`li>input[data-a="${i}"]`),
                    type,
                    d,

                    (ii) + m[i][0],
                    rule,

                    bfrom,
                    to_input
                );
            };

            return (
                (cudmsg.className = (ct.cudmsg = true).toString()),
                (cudmsg.value = (ct.i = gi).toString()),

                formopen()
            );
        }
    )