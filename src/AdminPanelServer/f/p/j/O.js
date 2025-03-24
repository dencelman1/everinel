

export var
    headers = {
        "Content-Type": "application/octet-stream"
    },
    createO = {
        headers,
        method: "POST",
        
        body: null
    },

    deleteO = {
        method: "DELETE",
    },

    updateO = {
        method: "PATCH",
        body: null,
    },

    readO = {
        headers,
        method: "POST",

        body: ""
    }
;
