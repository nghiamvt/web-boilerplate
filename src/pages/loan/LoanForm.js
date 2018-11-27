import React from 'react';
import { Prompt } from 'react-router';
import { Form, Field, withFormik } from 'formik';
import { FormField, FormDebug } from '@/components/Form';
// import PropTypes from 'prop-types';

class LoanForm extends React.PureComponent {
  static propTypes = {};

  renderLoanTerm = () => {
    const options = [
      { value: 'ocean', label: 'Ocean' },
      { value: 'blue', label: 'Blue' },
      { value: 'purple', label: 'Purple' },
    ];

    return (
      <Field
        name="loanTerm"
        label="Loan Term"
        component={FormField}
        type="select"
        options={options}
      />
    );
  };

  renderRepaymentFrequency = () => {
    console.log('FormikProps', withFormik);
    const options = [
      { value: 'ocean', label: 'Ocean' },
      { value: 'blue', label: 'Blue' },
      { value: 'purple', label: 'Purple' },
    ];

    return (
      <Field
        name="repaymentFrequency"
        label="Repayment Frequency"
        component={FormField}
        type="select"
        options={options}
      />
    );
  };

  renderComponent = props => {
    const { isSubmitting, dirty } = props;
    return (
      <Form>
        <Field name="amount" label="Amount" component={FormField} />
        {this.renderLoanTerm(props)}
        {this.renderRepaymentFrequency(props)}
        <Field name="interestRate" label="Interest Rate" component={FormField} />
        <Field name="arrangementFee" label="Arrangement Fee" component={FormField} />
        <button className="SubmitBtn btn-primary" type="submit" disabled={isSubmitting || !dirty}>
          Create
        </button>
        <Prompt when={dirty} message="Are you sure you want to leave?" />
        <FormDebug props={props} />
      </Form>
    );
  };

  render() {
    return <div className="LoanForm">{this.renderComponent(this.props)}</div>;
  }
}

export default LoanForm;
