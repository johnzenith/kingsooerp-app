import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import InputStyles from './InputStyles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import EditIcon from '@material-ui/icons/Edit';

import { useFormInputError } from './../Form/useFormInputError';
import { useUndefinedValueHelper } from './../Form/useUndefinedValueHelper';

function TextInput(props) {
  const classes = InputStyles();

  const { 
    id, 
    name: fieldName = false,
    formValues,
    handleChange,
    currentForm,
    formErrors = {},
    defaultValue = null,
  } = props;

  const name  = fieldName        || id;
  const value = formValues[name] ?? defaultValue ?? '';

  const Icon       = props.icon       ?? EditIcon;
  const type       = props.type       || 'text';
  const label      = props.label      || 'Enter Value';
  const labelWidth = props.labelWidth || 70;
  const isReadOnly = props?.readOnly === true || props?.readonly === true;
  const isDisabled = props?.disabled === true;

  // console.log(formValues);

  const [
    isReadOnlyClass,
    isDisabledClass
  ] = [
    isReadOnly ? 'is-readonly-input' : '',
    isDisabled ? 'is-disabled-input' : '',
  ];

  const {
    errorText,
    error,
    errorProp
  } = useFormInputError({
    id,
    name,
    errors: formErrors?.[currentForm]
  });

  return (
      <FormControl 
        fullWidth 
        className={clsx(classes.margin, isReadOnlyClass, isDisabledClass)} 
        variant="outlined" 
        {...{error}}
      >
        <InputLabel 
          className={classes.inputLabel} 
          htmlFor={id}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          id={id}
          name={name}
          key={id}
          disabled={isDisabled}
          readOnly={isReadOnly}
          data-form-input={true}
          type={type}
          value={useUndefinedValueHelper(value)}
          onMouseDown={event => {
            if (isReadOnly) {
              event.preventDefault();
            }
          }}
          onChange={handleChange(currentForm, name)}
          endAdornment={
            <InputAdornment position="end">
              <Icon />
            </InputAdornment>
          }
          labelWidth={labelWidth}
          {...errorProp}
        />

        {error && 
        <FormHelperText id={`${id}-error-text`}>
          {errorText}
        </FormHelperText>}
    </FormControl>
  );
}

TextInput.propTypes = {
  id:           PropTypes.string.isRequired,
  name:         PropTypes.string.isRequired,
  currentForm:  PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TextInput;