import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AmountToBePaid from '@/modules/AmountToBePaid/AmountToBePaid';
import { formatCurrency } from '@/utils/number';

class RepaymentInfo extends React.PureComponent {
  static propTypes = {
    info: PropTypes.object.isRequired,
  };

  renderField = (label, value) => {
    return (
      <div className="Field">
        <span className="FieldLabel">{label}</span>
        <span className="FieldValue">{value}</span>
      </div>
    );
  };

  renderAmountToBePaid = ({ amount, interestRate, repaymentFrequency, loanTerm }) => {
    const prop = {
      amount: +amount,
      interestRate: +interestRate / 100,
      repaymentFrequency: repaymentFrequency.value,
      loanTerm: +loanTerm.value,
    };
    return this.renderField('Amount to be paid', <AmountToBePaid {...prop} />);
  };

  renderComponent = ({ appliedDate, loanTerm, amount, repaymentFrequency, interestRate }) => {
    const dateFormat = 'DD MMMM, YYYY';
    // convert weekly to weeks, monthly to months, yearly to years
    const nextDeadlineUnit = repaymentFrequency.value.replace('ly', 's').toLowerCase();
    const data = {
      appliedDate: moment(appliedDate).format(dateFormat),
      toDate: moment(appliedDate)
        .add(loanTerm.value, 'M')
        .format(dateFormat),
      amount: formatCurrency(amount),
      balanceLoan: 0,
      loanTerm: loanTerm.value > 1 ? `${loanTerm.value} months` : `${loanTerm.value} month`,
      repaymentFrequency: repaymentFrequency.value,
      nextDeadline: moment(appliedDate)
        .add(1, nextDeadlineUnit)
        .format(dateFormat),
    };
    return (
      <div className="LoanInfo">
        {this.renderField('Applied Date', data.appliedDate)}
        {this.renderField('To Date', data.toDate)}
        {this.renderField('Principal Amount', data.amount)}
        {this.renderField('Loan Balance', data.balanceLoan)}
        {this.renderField('Loan Term', data.loanTerm)}
        {this.renderField('Repayment Frequency', data.repaymentFrequency)}
        {this.renderField('Next Deadline', data.nextDeadline)}
        {this.renderAmountToBePaid({ amount, interestRate, repaymentFrequency, loanTerm })}
      </div>
    );
  };

  render() {
    return this.renderComponent(this.props.info);
  }
}

export default RepaymentInfo;
