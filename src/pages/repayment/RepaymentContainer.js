import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import RepaymentForm from './RepaymentForm';

export class RepaymentContainer extends Component {
  static propTypes = {
    requestedLoan: PropTypes.array.isRequired,
  };

  handleOnSubmit = () => {};

  buildInitialValues = ({ requestedLoan }) => {
    const { appliedDate, loanTerm, amount, repaymentFrequency } = requestedLoan;
    const nextDeadlineUnit = repaymentFrequency.value.replace('ly', 's').toLowerCase();
    const dateFormat = 'DD MMMM, YYYY';
    return {
      ...requestedLoan,
      paymentMethods: '',
      appliedDate: moment(appliedDate).format(dateFormat),
      toDate: moment(appliedDate)
        .add(loanTerm.value, 'M')
        .format(dateFormat),
      nextDeadline: moment(appliedDate)
        .add(1, nextDeadlineUnit)
        .format(dateFormat),
      principalAmount: amount,
    };
  };

  buildValidationSchema = () => {
    return Yup.object({
      paymentMethods: Yup.object()
        .required('Required')
        .nullable(),
      image: Yup.mixed()
        .test('image', 'invalid file type', f => {
          return !f ? true : /(gif|jpe?g|png)$/i.test(f.type);
        })
        .test('image', 'Exceeding maximum upload file size (5MB)', f => {
          return !f ? true : f.size < 5 * 1024 * 1024;
        }),
    });
  };

  renderForm = formProps => {
    return <RepaymentForm formProps={formProps} />;
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
    return <div className="RepaymentContainer">{this.renderComponent(this.props, this.state)}</div>;
  }
}

export default connect(
  state => ({
    // only 1 user for this mini app
    requestedLoan: state.loan.requests[0],
  }),
  {},
)(RepaymentContainer);
