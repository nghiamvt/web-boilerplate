import { APIPostCreator } from '@/store/api';
import { SET_DATA } from '@/store/data-action';

export const apiLoanRequest = APIPostCreator({
  type: 'API:LOAN_REQUEST',
});

export const addLoanRequest = payload => {
  return SET_DATA({
    _path: 'loan.requests',
    _value: [payload],
    type: 'ADD_LOAN_REQUEST',
  });
};
