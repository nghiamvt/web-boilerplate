/**
 * convert ['a', 'b'] to { a:'a', b:'b' }
 * @param arr
 * @returns {*}
 */
function arrayToObject(arr) {
    return arr.reduce((result, i) => ({ ...result, [i]: i }), {});
}

export {
    arrayToObject,
};
