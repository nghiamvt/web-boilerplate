import { isPlainObject } from '@/utils/object';

function isValidKey(key) {
  return ['type', 'payload', 'error', 'meta'].includes(key);
}

export function isFSA(action) {
  return (
    isPlainObject(action) &&
    (typeof action.type === 'string') &&
    Object.keys(action).every(isValidKey)
  );
}

export function isError(action) {
  return isFSA(action) && action.error === true;
}
