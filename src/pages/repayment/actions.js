import { APIPostCreator } from '@/store/api';
import { MERGE_DATA } from '@/store/data-action';

export const apiRepaymentSubmit = APIPostCreator({
  type: 'API:REPAYMENT_SUBMIT',
});

export const addRepayment = payload => {
  return MERGE_DATA({
    _path: 'loan.repayments',
    _value: payload,
    type: 'ADD_REPAYMENT',
  });
};
