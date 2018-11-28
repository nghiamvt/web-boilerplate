import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import LoanForm from './LoanForm';

class LoanContainer extends Component {
  buildInitialValues = () => {
    return {
      amount: 0,
    };
  };

  buildValidationSchema = () => {
    return Yup.object({
      amount: Yup.number().required('Required'),
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
