import invariant from './invariant';

/**
 * Flux Standard Action utilities for Redux.
 * @param type
 * @param payloadCreator
 * @param metaCreator
 * @returns {function(...[*])}
 */
export default function createActionCreator(type, payloadCreator = v => v, metaCreator) {
    invariant(
        typeof payloadCreator === 'function',
        'Expected payloadCreator to be a function, undefined or null',
    );

    const buildPayLoadCreator = (firstArgs, ...args) => {
        return (firstArgs instanceof Error) ? firstArgs : payloadCreator(firstArgs, ...args);
    };

    return (...args) => {
        const payload = buildPayLoadCreator(...args);
        const action = { type };

        if (payload instanceof Error) {
            action.error = true;
        }

        if (payload !== undefined) {
            action.payload = payload;
        }

        if (typeof metaCreator === 'function') {
            action.meta = metaCreator(...args);
        }

        return action;
    };
}
