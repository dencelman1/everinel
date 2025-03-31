


export var 
    _entry_click = (
        (T,a,tables, formopen,cudmsg,to_input,load_input,bfrom,bto) => (event) => {
            var
                t = event.currentTarget,
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

                e = ct.e,
                d = ct.d,

                ul = document.querySelector("#form>form>ul")
            ;

            for (
                var
                    i = 0,
                    l = rules.length,
                    rule = 0,
                    type = 0,
                    mi = 0,

                    offset = 0
                ;
                i < l;
                (i++)
            ) {
                bto[type = types[i]](
                    d,
                    (mi = m[i]),
                    load_input(
                        ul.querySelector(`li>input[data-a="${i}"]`),
    
                        type,
    
                        bfrom[type](
                            e,
                            (ii) + mi,
                            true,
                            (rule = rules[i])
                        ),
                        
                        rule,
    
                        to_input
                    ),
                    true,
                    rule
                );
            };

            return (
                (cudmsg.className = (ct.cudmsg = true).toString()),
                (cudmsg.value = (ct.i = gi).toString()),

                formopen()
            );
        }
    )