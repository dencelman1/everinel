
// /t/delete/[ table_id ]/[ id ];

export default (
    (s,v,i) => (
        s
        .setHeader("x-a", v.delete_id(i).toString())
        .writeHead(200, null)
        .end()
    )
)