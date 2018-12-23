import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AmountToBePaid from '@/modules/AmountToBePaid/AmountToBePaid';
import { formatCurrency } from '@/utils/number';

class RepaymentInfo extends React.PureComponent {
  static propTypes = {
    info: PropTypes.object.isRequired,
  };

  // The below magic comes from the internet, Not my own creativity
  static calculateLoanBalance({
    interestRate,
    amount,
    amountToBePaid,
    paidCount,
    frequency,
  }) {
    if (!paidCount) return 0;
    const n = { Weekly: 48, Monthly: 12, Yearly: 1 }[frequency];
    return +amount + (+interestRate / n) * +amount - amountToBePaid * paidCount;
  }

  getPropAmountToBePaid = ({
    amount,
    interestRate,
    repaymentFrequency,
    loanTerm,
  }) => {
    return {
      amount: +amount,
      interestRate: +interestRate / 100,
      repaymentFrequency: repaymentFrequency.value,
      loanTerm: +loanTerm.value,
    };
  };

  calculateAmountToBePaid = ({
    amount,
    interestRate,
    repaymentFrequency,
    loanTerm,
  }) => {
    const prop = this.getPropAmountToBePaid({
      amount,
      interestRate,
      repaymentFrequency,
      loanTerm,
    });
    return AmountToBePaid.calculateAmountTobePaid({
      ...prop,
      periodMap: AmountToBePaid.frequencyPeriodMap,
    });
  };

  renderField = (label, value) => {
    return (
      <div className="Field">
        <span className="FieldLabel">{label}</span>
        <span className="FieldValue">{value}</span>
      </div>
    );
  };

  renderAmountToBePaid = data => {
    const prop = this.getPropAmountToBePaid(data);
    return this.renderField('Amount to be paid', <AmountToBePaid {...prop} />);
  };

  renderComponent = props => {
    const {
      appliedDate,
      loanTerm,
      amount,
      repaymentFrequency,
      interestRate,
      repayments,
    } = props;
    const dateFormat = 'DD MMMM, YYYY';
    // convert weekly to weeks, monthly to months, yearly to years
    const nextDeadlineUnit = repaymentFrequency.value
      .replace('ly', 's')
      .toLowerCase();
    const amountToBePaid = this.calculateAmountToBePaid(props);
    const data = {
      appliedDate: moment(appliedDate).format(dateFormat),
      toDate: moment(appliedDate)
        .add(loanTerm.value, 'M')
        .format(dateFormat),
      amount: formatCurrency(amount),
      balanceLoan: formatCurrency(
        RepaymentInfo.calculateLoanBalance({
          interestRate: +interestRate / 100,
          amount,
          amountToBePaid,
          paidCount: repayments.length,
          frequency: repaymentFrequency.value,
        }),
      ),
      loanTerm:
        loanTerm.value > 1
          ? `${loanTerm.value} months`
          : `${loanTerm.value} month`,
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
        {this.renderAmountToBePaid({
          amount,
          interestRate,
          repaymentFrequency,
          loanTerm,
        })}
      </div>
    );
  };

  render() {
    return this.renderComponent(this.props.info);
  }
}

export default RepaymentInfo;
