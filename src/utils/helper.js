export function removeNullChildren(arr) {
    for (let obj of arr) {
        if (obj.children) {
            removeNullChildren(obj.children)
        }
        else {
            delete obj.children
        }
    }
    return arr
}