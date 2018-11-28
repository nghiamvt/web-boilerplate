import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { frequency } from './constant';

import { loanTypeOptions, loanTermOptions } from './data';
import LoanForm from './LoanForm';
import { apiLoanRequest } from './actions';

class LoanContainer extends Component {
  static propTypes = {
    apiLoanRequest: PropTypes.func.isRequired,
  };

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
    const objValidate = Yup.object()
      .required('Required')
      .nullable();
    return Yup.object({
      amount: Yup.string()
        .required('Require')
        .matches(/^(?=.)(([0-9]*)(\.([0-9]+))?)$/, 'invalid amount'),
      loanTerm: objValidate,
      repaymentFrequency: objValidate,
      loanType: objValidate,
    });
  };

  handleOnSubmit = (values, { setSubmitting }, props) => {
    props
      .apiLoanRequest({
        pathUrl: 'http://localhost:4000/loan',
        data: values,
      })
      .then(res => {
        console.log('res', res);
      })
      .catch(e => {
        console.error('e', e);
      })
      .finally(() => setSubmitting(false));
  };

  renderForm = formProps => {
    return <LoanForm formProps={formProps} />;
  };

  renderComponent = props => {
    return (
      <Formik
        initialValues={this.buildInitialValues()}
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
  null,
  { apiLoanRequest },
)(LoanContainer);
