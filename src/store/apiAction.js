import { SET_DATA } from './dataAction';

export default {
    preFetch({ path, status, error }) {
        return SET_DATA({
            path,
            _meta: {
                isLoading: true,
                status,
                error,
            },
        });
    },
    postFetch({ path, status, result, error }) {
        return SET_DATA({
            path,
            ...result,
            _meta: {
                isLoading: false,
                status,
                error,
            },
        });
    },
};
