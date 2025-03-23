

export var
    _open_click = (
        (view,formclose) => (
            (e) => {
                var t = e.currentTarget;
                return (
                    t.textContent = (
                        (view.toggle("form"))
                        ? (
                            t.setAttribute("title", "Close"),
                            "x"
                        )
                        : formclose(t)
                    )
                )
            }
        )
    )
;