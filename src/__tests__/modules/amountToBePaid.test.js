import AmountToBePaid from '@/modules/AmountToBePaid/AmountToBePaid';

function calculateAmount(amount, interestRate, repaymentFrequency, loanTerm) {
  return AmountToBePaid.calculateAmountTobePaid({
    amount,
    interestRate,
    repaymentFrequency,
    loanTerm,
    periodMap: AmountToBePaid.frequencyPeriodMap,
  });
}

describe('AmountToBePaid', () => {
  it('Calculate amountToBePaid with amount = 0', () => {
    const amount = calculateAmount(0, 0.05, 'Weekly', 12);
    expect(amount).toBe(0);
  });

  it('Calculate amountToBePaid number with amount = "abc" ', () => {
    const amount = calculateAmount('abc', 0.05, 'Weekly', 12);
    expect(amount).toBe(0);
  });

  it('Calculate amountToBePaid number with amount = -1234 ', () => {
    const amount = calculateAmount(-1234, 0.05, 'Weekly', 12);
    expect(amount).toBe(0);
  });

  it('Calculate amountToBePaid (interestRate: 2%, loarnTerm: 1, Weekly)', () => {
    const amount = calculateAmount(20000, 0.02, 'Weekly', 1);
    expect(amount.toFixed(2)).toBe('5062.66');
  });

  it('Calculate amountToBePaid (interestRate: 10%, loarnTerm: 24, Monthly)', () => {
    const amount = calculateAmount(20000, 0.1, 'Monthly', 24);
    expect(amount.toFixed(2)).toBe('877.43');
  });

  it('Calculate amountToBePaid (interestRate: 5%, loarnTerm: 6, Yearly)', () => {
    const amount = calculateAmount(20000, 0.05, 'Yearly', 6);
    expect(amount.toFixed(2)).toBe('42976.18');
  });
});
