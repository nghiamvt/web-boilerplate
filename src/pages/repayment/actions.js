import { APIPostCreator } from '@/store/api';
import { SET_DATA } from '@/store/data-action';

export const apiRepaymentSubmit = APIPostCreator({
  type: 'API:REPAYMENT_SUBMIT',
});

export const addRepayment = payload => {
  return SET_DATA({
    _path: 'loan.repayment',
    _value: [payload],
    type: 'ADD_REPAYMENT',
  });
};
