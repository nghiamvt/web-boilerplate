import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'formik';
import { FormField, FormDebug } from '@/components/Form';
import Loading from '@/components/Loading';

import ImageUpload from './ImageUpload';

const paymentMethodOptions = [
  { value: '1', label: 'Bank Transfer' }, // only support this method
  { value: '2', label: 'Bitcoin', isDisabled: true },
  { value: '3', label: 'Credit/Debit Card', isDisabled: true },
];

class RepaymentForm extends React.PureComponent {
  static propTypes = {
    formProps: PropTypes.object.isRequired,
  };

  renderComponent = ({ formProps }) => {
    const { isSubmitting, dirty, values } = formProps;
    return (
      <Form>
        <Field name="appliedDate" label="Applied Date" component={FormField} disabled />
        <Field name="toDate" label="To Date" component={FormField} disabled />
        <Field name="principalAmount" label="Principal Amount" component={FormField} disabled />
        <Field name="balanceLoan" label="Balance Loan" component={FormField} disabled />
        <Field name="loanTerm" label="Loan Term" type="select" component={FormField} disabled />
        <Field
          name="repaymentFrequency"
          label="Repayment Frequency"
          type="select"
          component={FormField}
          disabled
        />
        <Field name="nextDeadline" label="Make a payment before" component={FormField} disabled />
        <Field
          name="amountTobePaid"
          label={`${values.repaymentFrequency.label} amount to be paid`}
          component={FormField}
          disabled
        />
        <Field
          name="paymentMethods"
          label="Payment Methods"
          type="select"
          component={FormField}
          options={paymentMethodOptions}
        />
        <ImageUpload form={formProps} className="FieldBlock" />
        <div className="ButtonWrapper">
          <button className="Btn PrimaryBtn" type="submit" disabled={isSubmitting || !dirty}>
            {isSubmitting ? 'Loading...' : 'Create'}
          </button>
        </div>
        <Loading isLoading={isSubmitting} />
        <FormDebug props={formProps} hide />
      </Form>
    );
  };

  render() {
    return (
      <div className="RepaymentForm">
        <h1 className="FormTitle">Repayment</h1>
        {this.renderComponent(this.props)}
      </div>
    );
  }
}

export default RepaymentForm;
