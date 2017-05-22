import jsonPatch from 'jsonpatch';

/**
 * Apply JSON Patch for multiple places on state
 * @param state
 * @param rootPath
 * @param patch
 * @returns new state (immutable)
 */
function applyPatch({ state, rootPath, patch }) {
    try {
        const patchObj = rootPath ? patch.map(item => ({ item, path: `${rootPath}/${item.path}` })) : patch;
        return jsonPatch.apply_patch(state, patchObj);
    } catch (e) {
        console.warn('Error when trying to patch state');
        console.warn(e);
        return state;
    }
}


export default function handleObjectData({ state, patch, values = [] }) {
    return {
        OBJECT_ADD: applyPatch({ state, action: 'add', patch, values }),
        OBJECT_REMOVE: 1,
        OBJECT_UPDATE: 1,
        OBJECT_DELETE: 1,
    };
}
