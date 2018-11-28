import axios from 'axios';
import { apiActionRequest, apiActionSuccess, apiActionFailed } from './api-action';

const APICreator = ({ type, method = 'GET', data, pathUrl, baseUrl, headers = {} }) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!pathUrl || !type) reject(new Error('pathUrl and type are required'));
    dispatch(apiActionRequest({ type }));
    const url = baseUrl ? `${baseUrl}/${pathUrl}` : pathUrl;
    const finalHeaders = Object.assign({}, { 'Content-Type': 'application/json' }, headers);
    return axios({ url, data, method, headers: finalHeaders })
      .then(res => {
        if ([200, 201].includes(res.status) && res.data.status === 1) {
          dispatch(apiActionSuccess({ type, payload: res.data }));
          resolve(res.data);
        } else {
          throw res.data;
        }
      })
      .catch(e => {
        console.error('API:', url, e);
        dispatch(apiActionFailed({ type, payload: e }));
        reject(e);
      });
  });
};

export const APIGetCreator = ({ type, url }) => payload => {
  return APICreator({
    type,
    url,
    ...payload,
    method: 'GET',
  });
};

export const APIPostCreator = ({ type, url, data }) => payload => {
  return APICreator({
    type,
    url,
    ...payload,
    data: Object.assign({}, data, payload.data),
    method: 'POST',
  });
};

export const APIFormCreator = ({ type, url }) => payload => {
  return APICreator({
    type,
    url,
    ...payload,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
