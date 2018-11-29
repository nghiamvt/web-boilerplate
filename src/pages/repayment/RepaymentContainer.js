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

  renderForm = formProps => {
    return <RepaymentForm formProps={formProps} />;
  };

  renderComponent = props => {
    const initialValues = {
      ...props.requestedLoan,
      paymentMethods: '',
      appliedDate: moment(props.requestedLoan.appliedDate).format('DD MMMM YYYY'),
    };
    const validationSchema = Yup.object({
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
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
