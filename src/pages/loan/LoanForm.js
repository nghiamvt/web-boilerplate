import React from 'react';
import { Prompt } from 'react-router';
import { Form, Field } from 'formik';
import { FormField, FormDebug } from '@/components/Form';
import PropTypes from 'prop-types';

class LoanForm extends React.PureComponent {
  static propTypes = {
    formProps: PropTypes.object.isRequired,
  };

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

  renderComponent = ({ formProps }) => {
    const { isSubmitting, dirty } = formProps;
    return (
      <Form>
        <Field name="amount" label="Amount" component={FormField} />
        {this.renderLoanTerm(formProps)}
        {this.renderRepaymentFrequency(formProps)}
        <Field name="interestRate" label="Interest Rate" component={FormField} />
        <Field name="arrangementFee" label="Arrangement Fee" component={FormField} />
        <button className="SubmitBtn btn-primary" type="submit" disabled={isSubmitting || !dirty}>
          Create
        </button>
        <Prompt when={dirty} message="Are you sure you want to leave?" />
        <FormDebug props={formProps} />
      </Form>
    );
  };

  render() {
    return <div className="LoanForm">{this.renderComponent(this.props)}</div>;
  }
}

export default LoanForm;
