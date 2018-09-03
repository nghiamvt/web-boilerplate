import { SET_DATA } from './data-action';

export default {
  preFetch({ _path, type }) {
    return SET_DATA({
      _path,
      type: `PRE_${type}`,
      _meta: {
        isLoading: true,
      },
    });
  },
  postFetch({ _path, type, status, result, error }) {
    return SET_DATA({
      ...result,
      _path,
      type: `POST_${type}`,
      _meta: {
        isLoading: false,
        status,
        error,
      },
    });
  },
};
