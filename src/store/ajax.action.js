export default {
    preAjax({ statePath }) {
        return {
            type: 'SET_DATA',
            patch: [
                {
                    op: 'add',
                    path: statePath,
                    value: {
                        __meta: {
                            isLoading: true,
                            error: false,
                        },
                    },
                },
            ],
        };
    },
    postAjax({ statePath, status, error, result }) {
        return {
            type: 'SET_DATA',
            patch: [
                {
                    op: 'add',
                    path: statePath,
                    value: {
                        __meta: {
                            isLoading: false,
                            error,
                            status,
                        },
                        ...result,
                    },
                },
            ],
        };
    },
    resetAjaxMeta(statePath) {
        return {
            type: 'SET_DATA',
            patch: [
                {
                    op: 'add',
                    path: `${statePath}/__meta`,
                    value: {
                        isLoading: false,
                        error: undefined,
                        status: undefined,
                    },
                },
            ],
        };
    },
};
