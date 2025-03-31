
export default (
    (a,ontable,) => {
        for (
            var
                i = 0,
                l = a.length,

                tables = document.querySelector("#tables>ul"),
                r = document.querySelector("#tmpl>.table"),
                
                c = null,
                b = null,

                ai = null
            ;
            i < l;
            i++
        ) {
            (
                c = r.cloneNode(true)
            )
            .querySelector('span:nth-child(1)')
            .textContent = (ai = a[i]).n.n;

            c.querySelector('span:nth-child(2)')
            .textContent = ai.v.EL;

            (b = c.querySelector("button")).setAttribute("data-a", i.toString());
            b.addEventListener("click", ontable);
            tables.appendChild(c);
        }
        return undefined;
    }
)