
export default (
    (v,l,e) => (
        v + "\x00".repeat((l / e) - v.length)
    )
)