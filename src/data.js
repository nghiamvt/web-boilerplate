export const frequency = {
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
};

export const frequencyPeriodMap = {
  [frequency.WEEKLY]: 4, // 1 month has 4 week
  [frequency.MONTHLY]: 1, // 1 month has 1 month
  [frequency.YEARLY]: 1 / 12, // 1 month has 1/12 year
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

export const frequencyOptions = ({ loanTerm }) => {
  return Object.values(frequency).map(i => ({
    value: i,
    label: i,
    // disable yearly frequency when loan tearn < 12 months
    isDisabled: (loanTerm || {}).value < 12 && i === frequency.YEARLY,
  }));
};
