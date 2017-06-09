import { isArray, isFunction, isNumber, isObject } from './is';

/**
 * Convert "123" => 123 ({String} => {Number})
 */
function getKey(key) {
    const intKey = parseInt(key);
    return (intKey.toString() === key) ? intKey : key;
}

/**
 * Convert path format to array
 */
function pathToArray(path) {
    return isArray(path) ? path : path.toString().split('.').map(getKey);
}

/**
 * Handle index of array
 */
function getArrayIndex(head, obj) {
    if (head === '$end') {
        return obj.length - 1;
    }
    if (!isNumber(head)) {
        throw new Error(`Array index '${head}' has to be an integer`);
    }
    return head;
}


/**
 * Set a value by a dot path.
 * @param src The object to evaluate.
 * @param path The path to be set.
 * @param value The value to set.
 */
export function set(src, path, value) {
    const pathArr = pathToArray(path);

    const setImmutable = (obj, pathList, val) => {
        if (!pathList.length) return isFunction(val) ? val(obj) : val;
        const isArr = isArray(obj);
        const clone = isArr ? obj.slice() : Object.assign({}, obj);
        const curPath = isArr ? getArrayIndex(pathList[0], obj) : pathList[0];
        clone[curPath] = setImmutable(obj[curPath] !== undefined ? obj[curPath] : {}, pathList.slice(1), val);
        return clone;
    };

    return setImmutable(src, pathArr, value);
}

/**
 * Get a value by a dot path.
 * @param src The object to evaluate.
 * @param path The path to value that should be returned.
 */
export function get(src, path) {
    const pathList = pathToArray(path);
    if (pathList.length === 0) return src;
    return pathList.reduce((result, pathFragment) => {
        return result ? result[pathFragment] : src[pathFragment];
    }, null);
}

/**
 * Delete a property by a dot path.
 * If target container is an object, the property is deleted.
 * If target container is an array, the index is deleted.
 * If target container is undefined, nothing is deleted.
 * @param src The object to evaluate.
 * @param path The path to the property or index that should be deleted.
 */
export function remove(src, path) {
    const pathArr = pathToArray(path);

    const deleteImmutable = (obj, pathList) => {
        const isArr = isArray(obj);
        const curPath = isArr ? getArrayIndex(pathList[0], obj) : pathList[0];
        if ((!isObject(obj) && !isArr) || (isArray(obj) && obj[getArrayIndex(curPath, obj)] === undefined)) {
            return obj;
        }
        let clone;
        if (pathList.length > 1) {
            clone = isArr ? obj.slice() : Object.assign({}, obj);
            clone[curPath] = deleteImmutable(obj[curPath], pathList.slice(1));
            return clone;
        }

        if (isArr) {
            clone = [].concat(obj.slice(0, curPath), obj.slice(curPath + 1));
        } else {
            clone = Object.assign({}, obj);
            delete clone[curPath];
        }
        return clone;
    };

    return deleteImmutable(src, pathArr);
}

/**
 * Toggles a value. The target value is evaluated using Boolean(currentValue). The result will always be a JSON boolean.
 * Be careful with strings as target value, as "true" and "false" will toggle to false, but "0" will toggle to true.
 * Here is what Javascript considers false:  0, -0, null, false, NaN, undefined, and the empty string ("")
 * @param src The object to evaluate.
 * @param path The path to the value.
 */
export function toggle(src, path) {
    const curVal = get(src, path);
    return set(src, path, !(curVal));
}

/**
 * Merges a value.  The target value must be an object, array, null, or undefined.
 * If target is an object, Object.assign({}, target, param) is used.
 * If target an array, target.concat(param) is used.
 * If target is null or undefined, the value is simply set.
 * @param src The object to evaluate.
 * @param path The path to the value.
 * @param val The value to merge into the target value.
 */
export function merge(src, path, val) {
    const curVal = get(src, path);
    if (curVal === null || typeof curVal === 'undefined') {
        return set(src, path, val);
    }
    if (isArray(curVal)) {
        return set(src, path, curVal.concat(val));
    }
    if (isObject(curVal)) {
        return set(src, path, Object.assign({}, curVal, val));
    }
    return src;
}
