import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { frequency } from './constant';

import { loanTypeOptions, loanTermOptions } from './data';
import LoanForm from './LoanForm';

class LoanContainer extends Component {
  buildInitialValues = () => {
    return {
      amount: '',
      loanTerm: loanTermOptions[0],
      repaymentFrequency: {
        label: frequency.WEEKLY,
        value: frequency.WEEKLY,
      },
      loanType: loanTypeOptions[0],
      interestRate: loanTypeOptions[0].value,
    };
  };

  buildValidationSchema = () => {
    return Yup.object({
      amount: Yup.string()
        .required('Require')
        .matches(/^(?=.)(([0-9]*)(\.([0-9]+))?)$/, 'invalid amount'),
      loanTerm: Yup.object()
        .required('Required')
        .nullable(),
      repaymentFrequency: Yup.object()
        .required('Required')
        .nullable(),
      loanType: Yup.object()
        .required('Required')
        .nullable(),
      interestRate: Yup.number()
        .required('Require')
        .typeError('invalid amount')
        .positive('Amount must be a positive number'),
    });
  };

  handleOnSubmit = () => {};

  renderForm = formProps => {
    return <LoanForm formProps={formProps} />;
  };

  renderComponent = () => {
    return (
      <Formik
        initialValues={this.buildInitialValues()}
        validationSchema={this.buildValidationSchema()}
        render={this.renderForm}
        onSubmit={this.handleOnSubmit}
      />
    );
  };

  render() {
    return <div className="LoanContainer">{this.renderComponent(this.props, this.state)}</div>;
  }
}

export default LoanContainer;
