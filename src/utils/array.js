/**
 * convert ['a', 'b'] to { a:'a', b:'b' }
 * @param arr
 * @returns {*}
 */
export function arrayToObject(arr) {
  return arr.reduce((result, i) => ({ ...result, [i]: i }), {});
}

export function groupArrayByField(array, fieldName, original = false) {
  const result = array.reduce((acc, item) => {
    const existingValue = acc.get(item[fieldName]);
    if (existingValue) {
      acc.set(item[fieldName], existingValue.concat([item]));
    } else {
      acc.set(item[fieldName], [item]);
    }
    return acc;
  }, new Map());

  return original ? result : Array.from(result);
}

/**
 * Convert path format to array
 */
export function pathToArray(path) {
  // if (typeof path !== 'string') throw new Error('path must be string');
  if (Array.isArray(path)) return path;
  if (!path) return [];
  return path
    .replace(/\\\./g, '@')
    .replace(/\./g, '*')
    .replace(/@/g, '.')
    .split('*');
}
