import RepaymentInfo from '@/pages/repayment/RepaymentInfo';

function calculateLoanBalance(
  interestRate,
  amount,
  amountToBePaid,
  paidCount,
  frequency = 'Weekly',
) {
  return RepaymentInfo.calculateLoanBalance({
    interestRate,
    amount,
    amountToBePaid,
    paidCount,
    frequency,
  });
}

describe('LoanBalance', () => {
  it('Calculate LoanBalance 1st', () => {
    const amount = calculateLoanBalance(0.05, 20000, '427.39', 0);
    expect(amount).toBe(0);
  });

  it('Calculate LoanBalance 2nd', () => {
    const amount = calculateLoanBalance(0.05, 20000, '427.39', 1);
    expect(amount.toFixed(1)).toBe('19593.4');
  });

  it('Calculate LoanBalance 3rd', () => {
    const amount = calculateLoanBalance(0.05, 20000, '427.39', 2);
    expect(amount.toFixed(1)).toBe('19166.1');
  });

  it('Calculate LoanBalance 4th', () => {
    const amount = calculateLoanBalance(0.05, 20000, '427.39', 3);
    expect(amount.toFixed(1)).toBe('18738.7');
  });
});
