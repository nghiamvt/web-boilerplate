export const apiActionRequest = ({ type }) => ({
  type: `${type}_REQUEST`,
});

export const apiActionSuccess = ({ type, payload = {} }) => ({
  type: `${type}_SUCCESS`,
  payload,
});

export const apiActionFailed = ({ type, payload = {} }) => ({
  type: `${type}_FAILURE`,
  payload,
  error: true,
});
