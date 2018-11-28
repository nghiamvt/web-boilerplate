import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { frequency } from './constant';

import { loanTypeOptions, loanTermOptions } from './data';
import LoanForm from './LoanForm';
import { apiLoanRequest, addLoanRequest } from './actions';

class LoanContainer extends Component {
  static propTypes = {
    apiLoanRequest: PropTypes.func.isRequired,
    loan: PropTypes.func.isRequired,
  };

  buildInitialValues = ({ loan = {} }) => {
    return {
      amount: loan.amount || '',
      loanTerm: loan.loanTerm || loanTermOptions[0],
      repaymentFrequency: loan.repaymentFrequency || {
        label: frequency.WEEKLY,
        value: frequency.WEEKLY,
      },
      loanType: loan.loanType || loanTypeOptions[0],
      interestRate: loan.interestRate || loanTypeOptions[0].value,
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
        props.addLoanRequest(res.data);
      })
      .catch(e => {
        console.error('e', e);
      })
      .finally(() => setSubmitting(false));
  };

  renderForm = formProps => {
    return <LoanForm formProps={formProps} disabled={this.props.loan} />;
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
    // only have 1 user for this mini app
    loan: state.loan[0],
  }),
  { apiLoanRequest, addLoanRequest },
)(LoanContainer);
