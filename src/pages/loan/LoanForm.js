import React from 'react';
import { Prompt } from 'react-router';
import { Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { FormField, FormDebug } from '@/components/Form';
import { loanTermOptions, repaymentFrequencyOptions } from './data';

class LoanForm extends React.PureComponent {
  static propTypes = {
    formProps: PropTypes.object.isRequired,
  };

  renderComponent = ({ formProps }) => {
    const { isSubmitting, dirty, values } = formProps;
    const frequencyOptions = repaymentFrequencyOptions(values);
    return (
      <Form>
        <h1 className="FormTitle">Loan Request</h1>
        <Field name="amount" label="Amount (SGD)" component={FormField} />
        <Field
          name="loanTerm"
          label="Loan Term"
          component={FormField}
          type="select"
          options={loanTermOptions}
        />
        <Field
          name="repaymentFrequency"
          label="Repayment Frequency"
          component={FormField}
          type="select"
          defaultValue={frequencyOptions[0]}
          options={frequencyOptions}
        />
        <Field name="interestRate" label="Interest Rate" component={FormField} />
        <Field name="arrangementFee" label="Arrangement Fee" component={FormField} />
        <button className="Btn PrimaryBtn" type="submit" disabled={isSubmitting || !dirty}>
          {isSubmitting ? 'Loading...' : 'Create'}
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
