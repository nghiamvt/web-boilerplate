import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { URL } from '@/data';

import RepaymentInfo from './RepaymentInfo';
import RepaymentForm from './RepaymentForm';
import { apiRepaymentSubmit, addRepayment } from './actions';

export class RepaymentContainer extends Component {
  static propTypes = {
    requestedLoan: PropTypes.array.isRequired,
    apiRepaymentSubmit: PropTypes.func.isRequired,
  };

  handleOnSubmit = (values, { setSubmitting }, props) => {
    props
      .apiRepaymentSubmit({
        pathUrl: URL.REPAYMENT,
        data: values,
      })
      .then(res => {
        props.addRepayment(res.data);
      })
      .catch(e => {
        console.error('e', e);
      })
      .finally(() => setSubmitting(false));
  };

  buildValidationSchema = () => {
    return Yup.object({
      paymentMethods: Yup.object()
        .required('Required')
        .nullable(),
      image: Yup.mixed()
        .required()
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
    const info = {
      ...props.requestedLoan,
      repayments: props.repayments,
    };
    return (
      <React.Fragment>
        <RepaymentInfo info={info} />
        <Formik
          initialValues={{
            image: '',
          }}
          validationSchema={this.buildValidationSchema()}
          render={this.renderForm}
          onSubmit={(values, actions) => this.handleOnSubmit(values, actions, props)}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="RepaymentContainer RepaymentContainer2">
        <h1 className="FormTitle">Repayment</h1>
        {this.props.requestedLoan ? (
          this.renderComponent(this.props, this.state)
        ) : (
          <div className="NoLoanRequested">
            <p>You have not have any loan request yet, please submit a loan request first</p>
            <Link to="/">Submit a loan request form</Link>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    // only 1 user for this mini app
    requestedLoan: state.loan.requests[0],
    repayments: state.loan.repayments,
  }),
  { apiRepaymentSubmit, addRepayment },
)(RepaymentContainer);
