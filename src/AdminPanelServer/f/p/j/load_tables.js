
export default (
    (a,ontable,) => {
        for (
            var
                i = 0,
                l = a.length,

                tables = document.querySelector("#tables>ul"),
                r = document.querySelector("#tmpl>.table"),
                
                c = null,
                b = null
            ;
            i < l;
            i++
        ) {
            (
                c = r.cloneNode(true)
            )
            .querySelector('span')
            .textContent = a[i].n;
            (b = c.querySelector("button")).setAttribute("data-a", i.toString());
            b.addEventListener("click", ontable);
            tables.appendChild(c);
        }
        return undefined;
    }
)