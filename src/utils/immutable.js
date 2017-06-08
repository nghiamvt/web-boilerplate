/* eslint-disable */
import { isArray, isFunction, isNumber } from './is'

/**
 * Convert "123" => 123
 * @param key {String}
 * @returns {Number}
 */
function getKey(key) {
    const intKey = parseInt(key);
    return (intKey.toString() === key) ? intKey : key;
}

/**
 * Convert path format to array
 * @param path
 * @returns {Array}
 */
function pathToArray(path) {
    return isArray(path) ? path : path.toString().split('.').map(getKey);
}

function getArrayIndex(head, obj) {
    if (head === '$end') {
        head = obj.length - 1;
    }
    if (!isNumber(head)) {
        throw new Error('Array index \'' + head + '\' has to be an integer');
    }
    return head;
}


/**
 * Set a value by a dot path.
 * @param obj The object to evaluate.
 * @param path The path to be set.
 * @param value The value to set.
 */
export const set = function(obj, path, value) {
    const pathList = pathToArray(path);

	const setPropImmutableRec = (obj, pathList, value) => {
	    if (!pathList.length) return isFunction(value) ? value(obj) : value;
	    let clone = isArray(obj) ? obj.slice() : Object.assign({}, obj);
        const curPath = pathList[0];
        clone[curPath] = setPropImmutableRec(obj[curPath] !== undefined ? obj[curPath] : {}, pathList.slice(1), value);
        return clone;
	};

	return setPropImmutableRec(obj, pathList, value);
};

/**
 * Get a value by a dot path.
 * @param obj The object to evaluate.
 * @param path The path to value that should be returned.
 */
export const get = function(obj, path) {
    const pathList = pathToArray(path);
    if (pathList.length === 0) return obj;
    return pathList.reduce((result, pathFragment) => {
        return result ? result[pathFragment] : obj[pathFragment];
    }, null);
}

/**
 * Delete a property by a dot path.
 * If target container is an object, the property is deleted.
 * If target container is an array, the index is deleted.
 * If target container is undefined, nothing is deleted.
 * @param obj The object to evaluate.
 * @param prop The path to the property or index that should be deleted.
 */
const delete1 = function(obj, prop) {
	prop = typeof prop === 'number' ? propToArray(prop.toString()) : typeof prop === 'string' ? propToArray(prop) : prop;

	var deletePropImmutableRec = function(obj, prop, i) {
		var clone, head = prop[i];

		if (typeof obj !== 'object' ||
			!Array.isArray(obj) && obj[head] === undefined ||
			Array.isArray(obj) && obj[getArrayIndex(head, obj)] === undefined) {

			return obj;
		}

		if (prop.length - 1 > i) {
			if (Array.isArray(obj)) {
				head = getArrayIndex(head, obj);
				clone = obj.slice();
			} else {
				clone = Object.assign({}, obj);
			}

			clone[head] = deletePropImmutableRec(obj[head], prop, i + 1);
			return clone;
		}

		if (Array.isArray(obj)) {
			head = getArrayIndex(head, obj);
			clone = [].concat(obj.slice(0, head), obj.slice(head + 1));
		} else {
			clone = Object.assign({}, obj);
			delete clone[head];
		}

		return clone;
	};

	return deletePropImmutableRec(obj, prop, 0);
};

/**
 * Toggles a value.  The target value is evaluated using Boolean(currentValue).  The result will always be a JSON boolean.
 * Be careful with strings as target value, as "true" and "false" will toggle to false, but "0" will toggle to true.
 * Here is what Javascript considers false:  0, -0, null, false, NaN, undefined, and the empty string ("")
 * @param obj The object to evaluate.
 * @param prop The path to the value.
 */
const toggle = function(obj, prop) {
	var curVal = this.get(obj, prop);
	return this.set(obj, prop, !Boolean(curVal));
};

/**
 * Merges a value.  The target value must be an object, array, null, or undefined.
 * If target is an object, Object.assign({}, target, param) is used.
 * If target an array, target.concat(param) is used.
 * If target is null or undefined, the value is simply set.
 * @param obj The object to evaluate.
 * @param prop The path to the value.
 * @param val The value to merge into the target value.
 */
const merge = function(obj, prop, val) {
	var curVal = this.get(obj, prop);
	if (typeof curVal === 'object') {
		if (Array.isArray(curVal)){
			return this.set(obj, prop, curVal.concat(val));
		} else if (curVal === null){
			return this.set(obj, prop, val);
		}
		else {
			var merged = Object.assign({}, curVal, val);
			return this.set(obj, prop, merged);
		}
	} else if (typeof curVal === 'undefined'){
		return this.set(obj, prop, val);
	}
	else {
		return obj;
	}
};

function propToArray(prop) {
	return prop.replace(/\\\./g, '@').replace(/\./g, '*').replace(/@/g, '.').split('*');
}
