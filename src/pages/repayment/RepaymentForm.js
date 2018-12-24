import React from 'react';
import { Prompt } from 'react-router';
import PropTypes from 'prop-types';
import { Form, Field } from 'formik';
import { FormField, FormDebug } from '@/components/Form';
import Loading from '@/components/loading';

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
      <Form className="RepaymentForm">
        <Field
          name="paymentMethods"
          label="Payment Methods"
          type="select"
          component={FormField}
          options={paymentMethodOptions}
        />
        {values.paymentMethods && (
          <ImageUpload form={formProps} className="FormField" />
        )}
        <div className="ButtonWrapper">
          <button
            className="Btn PrimaryBtn"
            type="submit"
            disabled={isSubmitting || !dirty}
          >
            {isSubmitting ? 'Loading...' : 'Submit'}
          </button>
        </div>
        <Loading isLoading={isSubmitting} />
        <Prompt when={dirty} message="Are you sure you want to leave?" />
        <FormDebug props={formProps} hide />
      </Form>
    );
  };

  render() {
    return this.renderComponent(this.props);
  }
}

export default RepaymentForm;
