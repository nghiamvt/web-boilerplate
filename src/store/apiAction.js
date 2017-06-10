import { SET_DATA } from './dataAction';

export default {
    preFetch({ path }) {
        return SET_DATA({
            path,
            _meta: {
                isLoading: true,
                error: false,
            },
        });
    },
    postFetch({ path, status, result, error }) {
        return SET_DATA({
            path,
            ...result,
            _meta: {
                isLoading: false,
                error,
                status,
            },
        });
    },
};
