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
