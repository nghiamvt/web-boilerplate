function isNumber(value) {
    return /^\d+$/.test(value);
}

function isString(obj) {
    return typeof obj === 'string';
}

function isFunction(obj) {
    return typeof obj === 'function';
}

function isArray(obj) {
    return Array.isArray(obj);
}

function isObject(obj) {
    return !isArray(obj) && obj === Object(obj);
}

function isEmpty(value) {
    if (!value) return true;

    if (isArray(value) && value.length === 0) {
        return true;
    } else if (isObject(value)) {
        return !!Object.keys(value).length;
    }
    return false;
}


export {
    isNumber,
    isString,
    isFunction,
    isArray,
    isObject,
    isEmpty,
};
