import { SET_DATA } from './data-action';

export default {
  preFetch({ _path }) {
    return SET_DATA({
      _path,
      _meta: {
        isLoading: true,
      },
    });
  },
  postFetch({ _path, status, result, error }) {
    return SET_DATA({
      ...result,
      _path,
      _meta: {
        isLoading: false,
        status,
        error,
      },
    });
  },
};
