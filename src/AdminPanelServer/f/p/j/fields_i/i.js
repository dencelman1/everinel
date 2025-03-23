

export var
    fi_keydown = (
        (e) => (
            (e.keyCode === 13)
            &&
            e.currentTarget.parentElement.classList.remove("order")
        )
    ),
    fi_blur = (
        (e) => (
            e.currentTarget.parentElement.classList.remove("order")
        )
    )
;