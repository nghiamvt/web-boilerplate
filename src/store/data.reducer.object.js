import jsonPatch from 'jsonpatch';

/**
 * Apply JSON Patch for multiple places on state
 * @param state
 * @param type
 * @param rootPath
 * @param path
 * @returns new state (immutable)
 */

export default function handleObjectData({ state, type, rootPath, path }) {
    try {
        if (!rootPath && !path) throw new Error('rootPath & path cannot be null');
        if (rootPath.charAt(0) !== '/'
            && path.charAt(0) !== '/'
            && rootPath.charAt(rootPath.length - 1) === '/'
            && path.charAt(path.length - 1) === '/') {
            throw new Error('rootPath & path are invalid');
        }
        const op = type.substring(type.indexOf('_') + 1);
        const patchData = rootPath ? (path || []).map(i => ({ ...i, op, path: `${rootPath}${i.path}` })) : path;

        return jsonPatch.apply_patch(state, patchData);
    } catch (e) {
        console.warn('Error when trying to patch state');
        console.warn(e);
        return state;
    }
}
