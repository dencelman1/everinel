

export default (
    (entry_click,offset,limit,query,cudmsg,fo_rd,formFieldsRd,load_entries,color,bfrom) => (b,a,ctable) => {
        var
            av = a.v
        ;
        return (
            document.querySelector('li.table>button.selected')?.classList.remove('selected'),

            (offset.value = ctable.o),
            (limit.value = ctable.l),
            (query.value = ctable.q),
            (query.className = ctable.qr.toString()),
            
            (cudmsg.value = ctable.i.toString()),
            (cudmsg.className = ctable.cudmsg.toString()),

            ctable
            .k
            .reduce(fo_rd, a),

            a
            .n
            .k
            .reduce(formFieldsRd, av.t),

            load_entries(
                ctable.e,
                ctable.el,

                av,ctable.k,color,bfrom,
                entry_click,
                ctable.qlimit
            ),

            b.classList.add("selected")
        );
    }
)