import { frequency } from './constant';

export const loanTermOptions = [
  { value: '1', label: '1 Month' },
  { value: '2', label: '2 Months' },
  { value: '3', label: '3 Months' },
  { value: '6', label: '6 Months' },
  { value: '12', label: '12 Months' },
  { value: '24', label: '24 Months' },
];

export const repaymentFrequencyOptions = ({ loanTerm }) => {
  return Object.values(frequency).map(i => ({
    value: i,
    label: i,
    isDisabled: (loanTerm || {}).value < 12 && i === frequency.YEARLY,
  }));
};
