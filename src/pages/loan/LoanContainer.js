import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { loanTypeOptions, loanTermOptions, frequency, URL } from '@/data';

import LoanForm from './LoanForm';
import { apiLoanRequest, addLoanRequest } from './actions';

class LoanContainer extends Component {
  static propTypes = {
    apiLoanRequest: PropTypes.func.isRequired,
    requestedLoan: PropTypes.array.isRequired,
  };

  handleOnSubmit = (values, { setSubmitting }, props) => {
    props
      .apiLoanRequest({
        pathUrl: URL.LOAN,
        data: values,
      })
      .then(res => {
        props.addLoanRequest(res.data);
      })
      .catch(e => {
        console.error('e', e);
      })
      .finally(() => setSubmitting(false));
  };

  buildInitialValues = ({ requestedLoan = {} }) => {
    return {
      amount: requestedLoan.amount || '',
      loanTerm: requestedLoan.loanTerm || loanTermOptions[0],
      repaymentFrequency: requestedLoan.repaymentFrequency || {
        label: frequency.WEEKLY,
        value: frequency.WEEKLY,
      },
      loanType: requestedLoan.loanType || loanTypeOptions[0],
      interestRate: requestedLoan.interestRate || loanTypeOptions[0].value,
    };
  };

  buildValidationSchema = () => {
    const objValidate = Yup.object()
      .required('Required')
      .nullable();
    return Yup.object({
      amount: Yup.string()
        .required('Require')
        .matches(/^(?=.)(([0-9]*)(\.([0-9]+))?)$/, 'invalid amount')
        .test('amount', 'Minimum is 100$', a => {
          return a >= 100;
        }),
      loanTerm: objValidate,
      repaymentFrequency: objValidate,
      loanType: objValidate,
    });
  };

  renderForm = formProps => {
    return <LoanForm formProps={formProps} requested={!!this.props.requestedLoan} />;
  };

  renderComponent = props => {
    return (
      <Formik
        initialValues={this.buildInitialValues(props)}
        validationSchema={this.buildValidationSchema()}
        render={this.renderForm}
        onSubmit={(values, actions) => this.handleOnSubmit(values, actions, props)}
      />
    );
  };

  render() {
    return <div className="LoanContainer">{this.renderComponent(this.props, this.state)}</div>;
  }
}

export default connect(
  state => ({
    // only 1 user for this mini app
    requestedLoan: state.loan.requests[0],
  }),
  { apiLoanRequest, addLoanRequest },
)(LoanContainer);
