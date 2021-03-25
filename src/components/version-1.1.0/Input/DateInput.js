import React from 'react';
import PropTypes from 'prop-types';
import InputStyles from './InputStyles';
import TextField from '@material-ui/core/TextField';
import EventIcon from '@material-ui/icons/Event';

import { useFormInputError } from './../Form/useFormInputError';
import { useUndefinedValueHelper } from './../Form/useUndefinedValueHelper';

function DateInput(props) {
  const classes = InputStyles();
  const [inputType, setInputType] = React.useState('text');

  const { 
    id, 
    name: fieldName = false,
    formValues,
    handleChange,
    currentForm,
    formErrors = {},
  } = props;

  const name  = fieldName  ? fieldName : id;
  const value = formValues ? formValues[name] : '';

  const Icon       = props.icon       ?? EventIcon;
  const label      = props.label      || 'Date';
  const labelWidth = props.labelWidth || 60;

  const {
    errorText,
    error,
    errorProp
  } = useFormInputError({
    id,
    name,
    errors: formErrors?.[currentForm]
  });

  const shrink = 'text' === inputType ? 
    (value ? true : false) : true;

  const helperText = error ? 
    { id: `${id}-error-text`, label: errorText } : {};

  return (
       <TextField
       fullWidth
        id={name}
        key={id}
        name={name}
        type={inputType}
        value={useUndefinedValueHelper(value)}
        label={label}
        placeholder=" "
        variant='outlined'
        className={classes.margin}
        onChange={handleChange(currentForm, name)}
        inputProps={{ name }}
        InputLabelProps={{
          shrink: shrink,
          htmlFor: name,
          className: classes.inputLabel,
        }}
        InputProps={{
            labelWidth,
            endAdornment: <Icon />,
            'data-form-input': true,
            onClick: () => { setInputType('date')},
            onBlur: () => { setInputType('text')},
            ...errorProp,
        }}
        FormHelperTextProps={helperText}
        {...{error}}
      />
  );
}

DateInput.propTypes = {
  id:           PropTypes.string.isRequired,
  name:         PropTypes.string.isRequired,
  currentForm:  PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DateInput;