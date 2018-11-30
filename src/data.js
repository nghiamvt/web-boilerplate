export const BASE_URL = 'http://localhost:4000';

export const URL = {
  LOAN: 'loan',
  REPAYMENT: 'repayment',
};

export const frequency = {
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
};

export const loanTermOptions = [
  { value: '1', label: '1 Month' },
  { value: '2', label: '2 Months' },
  { value: '3', label: '3 Months' },
  { value: '6', label: '6 Months' },
  { value: '12', label: '12 Months' },
  { value: '24', label: '24 Months' },
];

export const loanTypeOptions = [
  { value: 5, label: 'Personal Loan' },
  { value: 2, label: 'Student Loan' },
  { value: 10, label: 'Mortgages Loan' },
];

export const frequencyOptions = ({ loanTerm } = {}) => {
  return Object.values(frequency).map(i => ({
    value: i,
    label: i,
    // disable yearly frequency when loan tearn < 12 months
    isDisabled: (loanTerm || {}).value < 12 && i === frequency.YEARLY,
  }));
};
