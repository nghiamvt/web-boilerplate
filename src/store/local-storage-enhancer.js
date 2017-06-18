import { isArray, isString, isEmpty, isFunction, isUndefined } from '../utils/is';

/**
 * getSubsets returns an object with the same structure as the original object passed in,
 * but contains only the specified keys and only if that key has a truth-y value.
 * @param {Object} obj The object from which to create a subset.
 * @param {String[]} paths An array of (top-level) keys that should be included in the subset.
 * @return {Object} An object that contains the specified keys with truth-y values
 */
function getSubsets(obj, paths) {
    return Object.values(paths).reduce((result, key) => {
        return obj[key] ? { ...result, [key]: obj[key] } : result;
    }, {});
}

/**
 * createSlicer inspects the typeof paths and returns an appropriate slicer function.
 * @param {String|String[]} [paths] The paths argument supplied to persistState.
 * @return {Function} A slicer function, which returns the subset to store when called with Redux's store state.
 */
function createSlicer(paths) {
    if (isEmpty(paths)) return (state) => state;
    if (isString(paths)) return (state) => getSubsets(state, [paths]);
    if (isArray(paths)) return (state) => getSubsets(state, paths);
    return console.error(`Expected paths to be String, Array or Void, but got ${typeof paths}`);
}

function mergeState(initialState, persistedState) {
    return persistedState ? { ...initialState, ...persistedState } : initialState;
}

/**
 * persistState is a Store Enhancer that syncs (a subset of) store state to localStorage.
 *
 * @param {String|String[]} [paths] Specify keys to sync with localStorage, if left undefined the whole store is persisted
 * @param {Object} [config] Optional config object
 * @param {String} [config.key="redux"] String used as localStorage key
 * @param {Function} [config.slicer] (paths) => (state) => subset. A function that returns a subset
 * of store state that should be persisted to localStorage
 * @param {Function} [config.serialize=JSON.stringify] (subset) => serializedData. Called just before persisting to
 * localStorage. Should transform the subset into a format that can be stored.
 * @param {Function} [config.deserialize=JSON.parse] (persistedData) => subset. Called directly after retrieving
 * persistedState from localStorage. Should transform the data into the format expected by your application
 *
 * @return {Function} An enhanced store
 */
export default function localStorageEnhancer(paths, config) {
    const cfg = {
        key: 'store',
        merge: mergeState,
        slicer: createSlicer,
        serialize: JSON.stringify,
        deserialize: JSON.parse,
        ...config,
    };

    const { key, merge, slicer, serialize, deserialize } = cfg;

    return next => (reducer, initialState, enhancer) => {
        if (isFunction(initialState) && isUndefined(enhancer)) {
            enhancer = initialState;
            initialState = undefined;
        }

        let persistedState;
        let finalInitialState;

        try {
            persistedState = deserialize(localStorage.getItem(key));
            finalInitialState = merge(initialState, persistedState);
        } catch (e) {
            console.warn('Failed to retrieve initialize state from localStorage:', e);
        }

        const store = next(reducer, finalInitialState, enhancer);
        const slicerFn = slicer(paths);

        store.subscribe(() => {
            const state = store.getState();
            const subset = slicerFn(state);

            try {
                localStorage.setItem(key, serialize(subset));
            } catch (e) {
                console.warn('Unable to save state to localStorage:', e);
            }
        });

        return store;
    };
}
