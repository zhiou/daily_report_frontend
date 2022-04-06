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

export function random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}