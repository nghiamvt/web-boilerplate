import React from 'react';
import { Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormField, FormDebug } from '@/components/Form';
import Loading from '@/components/Loading';
import AmountToBePaid from '@/modules/AmountToBePaid/AmountToBePaid';
import { loanTermOptions, frequencyOptions, loanTypeOptions } from '@/data';

class LoanForm extends React.PureComponent {
  static propTypes = {
    formProps: PropTypes.object.isRequired,
    requested: PropTypes.bool,
  };

  static defaultProps = {
    requested: false,
  };

  handleResetForm = () => {
    localStorage.clear();
    location.reload();
  };

  renderAmountTobePaid = (values = {}, errors = {}) => {
    const isValid = !Object.keys(errors).length;
    const frequency = values.repaymentFrequency.value;
    const prop = isValid
      ? {
          amount: +values.amount,
          interestRate: +values.interestRate / 100,
          repaymentFrequency: frequency,
          loanTerm: +values.loanTerm.value,
        }
      : {};
    return (
      <div className="AmountToBePaidWrapper">
        {`${frequency} amount to be paid `}
        <AmountToBePaid {...prop} />
      </div>
    );
  };

  renderComponent = ({ formProps, requested }) => {
    const { isSubmitting, dirty, values, errors, setFieldValue } = formProps;
    return (
      <Form>
        <h1 className="FormTitle">Loan Request</h1>
        {requested && (
          <p className="ApproveMsg">
            Your loan request has been approved,{' '}
            <Link to="/repayment">make a repayment</Link>
          </p>
        )}
        <Field
          name="amount"
          label="Amount (SGD)"
          placeholder={0}
          component={FormField}
          disabled={requested}
        />
        <Field
          name="loanTerm"
          label="Loan Term"
          type="select"
          component={FormField}
          options={loanTermOptions}
          disabled={requested}
        />
        <Field
          name="repaymentFrequency"
          label="Repayment Frequency"
          type="select"
          component={FormField}
          options={frequencyOptions(values)}
          disabled={requested}
        />
        <Field
          name="loanType"
          label="Loan Type"
          type="select"
          onFieldChange={({ value }) => setFieldValue('interestRate', value)}
          component={FormField}
          options={loanTypeOptions}
          disabled={requested}
        />
        <Field
          name="interestRate"
          label="Interest Rate (%)"
          component={FormField}
          disabled
        />
        {this.renderAmountTobePaid(values, errors)}
        <div className="ButtonWrapper">
          {requested ? (
            <button
              className="Btn PrimaryBtn"
              type="button"
              onClick={this.handleResetForm}
            >
              Reset
            </button>
          ) : (
            <button
              className="Btn PrimaryBtn"
              type="submit"
              disabled={isSubmitting || !dirty}
            >
              {isSubmitting ? 'Loading...' : 'Submit'}
            </button>
          )}
        </div>
        <Loading isLoading={isSubmitting} />
        <FormDebug props={formProps} hide />
      </Form>
    );
  };

  render() {
    return <div className="LoanForm">{this.renderComponent(this.props)}</div>;
  }
}

export default LoanForm;
