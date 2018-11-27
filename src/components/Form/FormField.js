/* eslint-disable react/prop-types */
import React from 'react';
import Select from 'react-select';
import ErrMsg from './ErrMsg';

function selectField(props) {
  return (
    <Select
      classNamePrefix="select"
      name="color"
      isClearable
      {...props.field}
      onChange={option => {
        if (props.onFieldChange) {
          props.onFieldChange(option);
        }
        props.form.setFieldValue(props.field.name, option);
      }}
      onBlur={() => props.form.setFieldTouched(props.field.name)}
      options={props.options}
      placeholder={props.placeholder}
      isDisabled={props.disabled}
    />
  );
}

function inputField(props) {
  return <input {...props.field} placeHolder={props.placeHolder} />;
}

function fieldByType(props) {
  switch (props.type) {
    case 'select':
      return selectField(props);
    default:
      return inputField(props);
  }
}

export default function FormField(props) {
  const { name } = props.field;
  return (
    <div className={`${name}Field`}>
      {props.label ? <span>{props.label}</span> : ''}
      {fieldByType(props)}
      <ErrMsg name={name} />
    </div>
  );
}
