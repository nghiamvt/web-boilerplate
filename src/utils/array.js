/**
 * convert ['a', 'b'] to { a:'a', b:'b' }
 * @param arr
 * @returns {*}
 */
export function arrayToObject(arr) {
    return arr.reduce((result, i) => ({ ...result, [i]: i }), {});
}
