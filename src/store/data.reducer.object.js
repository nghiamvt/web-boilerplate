/**
 * Apply data to store with data structure:
 * data = {
 *      id_1: {
 *          id: id_1,
 *          key_1: value_1,
 *          key_2: value_2,
 *      },
 *       id_2: {
 *          id: id_2,
 *          key_1: value_3,
 *          key_2: value_4,
 *      }
 * }
 */

export default function handleObjectData({ state, type, path, data }) {
    try {
        // if (!rootPath && !data) throw new Error('rootPath & path cannot be null');
        // if (rootPath.charAt(0) !== '/'
        //     && path.charAt(0) !== '/'
        //     && rootPath.charAt(rootPath.length - 1) === '/'
        //     && path.charAt(path.length - 1) === '/') {
        //     throw new Error('rootPath & path are invalid');
        // }
        const op = type.substring(type.indexOf('_') + 1).toLowerCase();
        const patchData = data.map((i) => ({ op, path, value: i }));
        console.log('patchData :', patchData);
        console.log('state :', state);
    } catch (e) {
        console.warn('Error when patching state');
        console.warn(e);
        return state;
    }
}

export const operations = {
    OBJECT_ADD: 'OBJECT_ADD',
    OBJECT_REMOVE: 'OBJECT_REMOVE',
    OBJECT_REPLACE: 'OBJECT_REPLACE',
};
