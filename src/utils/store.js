/*
 * Reduce multiple reducers into a single reducer from left to right.
 * make sure that the first reducer in the list defines the initial state
 */
function reduceReducers(...reducers) {
    return (store, action) =>
        reducers.reduce((result, reducer) => reducer(result, action), store);
}

function getValueByPath(obj, location) {
    if (location.length === 0) return obj;
    return location.reduce((result, pathFragment) => {
        return result ? result[pathFragment] : obj[pathFragment];
    }, null);
}

function rebuildObjectByPath(location, newValue) {
    return [].concat(location).reverse().reduce((result, pathFragment) => {
        return {
            [pathFragment]: result,
        };
    }, newValue);
}

function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}

function updateItemInArray(array, itemId, updateItemCallback) {
    return array.map(item => {
        return (item.id !== itemId) ? item : updateItemCallback(item);
    });
}

export {
    reduceReducers,
    getValueByPath,
    rebuildObjectByPath,
};
