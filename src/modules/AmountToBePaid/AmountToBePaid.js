import React from 'react';
import PropTypes from 'prop-types';
import { frequency } from '@/data';
import { formatCurrency } from '@/utils/number';

class AmountToBePaid extends React.PureComponent {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    interestRate: PropTypes.number.isRequired,
    repaymentFrequency: PropTypes.oneOf(Object.values(frequency)).isRequired,
    loanTerm: PropTypes.number.isRequired,
  };

  static frequencyPeriodMap = {
    [frequency.WEEKLY]: 4, // 1 month has 4 weeks
    [frequency.MONTHLY]: 1, // 1 month has 1 month
    [frequency.YEARLY]: 1 / 12, // 1 month has 1/12 year
  };

  // The below magic comes from the internet, Not my own creativity
  static calculateAmountTobePaid({
    amount,
    interestRate,
    repaymentFrequency,
    loanTerm,
    periodMap,
  }) {
    if (+amount <= 0) return 0;
    const period = periodMap[repaymentFrequency];
    const numberOfPeriod = +loanTerm * period;
    const numerator = +interestRate / numberOfPeriod;
    const denominator = 1 - Math.pow(numerator + 1, -numberOfPeriod); // eslint-disable-line
    const result = (numerator / denominator) * amount;
    return isNaN(result) ? 0 : result;
  }

  renderComponent = ({ amount, interestRate, repaymentFrequency, loanTerm }) => {
    return (
      <span className="AmountToBePaid">
        {formatCurrency(
          AmountToBePaid.calculateAmountTobePaid({
            amount,
            interestRate,
            repaymentFrequency,
            loanTerm,
            periodMap: AmountToBePaid.frequencyPeriodMap,
          }),
        )}
      </span>
    );
  };

  render() {
    return this.renderComponent(this.props);
  }
}

export default AmountToBePaid;
