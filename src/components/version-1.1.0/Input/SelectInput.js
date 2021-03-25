import React from 'react';
import PropTypes from 'prop-types';
import InputStyles from './InputStyles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import { useFormInputError } from './../Form/useFormInputError';
import { useUndefinedValueHelper } from './../Form/useUndefinedValueHelper';

function SelectInput(props) {
  const classes = InputStyles();

  const {
    id, 
    name: fieldName = false,
    items,
    value: defaultValue = '',
    formValues,
    handleChange,
    currentForm,
    formErrors = {},
  } = props;

  const name        = fieldName ||  id;     
  const lookupValue = formValues ? formValues[name] : null;

  const value       = (null === lookupValue || typeof lookupValue === 'undefined') ? 
    defaultValue : lookupValue;

  const label      = props.label || 'Select';
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

  return (
      <FormControl 
        fullWidth 
        className={classes.margin} 
        variant="outlined" 
        {...{error}}
      >
        <InputLabel 
          className={classes.inputLabel} 
          htmlFor={id}
        >
          {label}
        </InputLabel>

        <Select 
          labelId={`${id}-label`}
          id={`wrapper-${name}`}
          data-form-input={true}
          value={useUndefinedValueHelper(value)}
          variant="outlined"
          labelWidth={labelWidth}
          onChange={handleChange(currentForm, name)}
          inputProps={{ name }}
          {...errorProp}
        >
          {items.map(item => {
            const value = item?.value;
            return (
              <MenuItem 
                key={`menu_item_${id}_${value}`} 
                value={value || ''}
              >
                {item?.label || (value ? value : 'Label')}
              </MenuItem>
            )
          })}
        </Select>

        {error && 
        <FormHelperText id={`${id}-error-text`}>
          {errorText}
        </FormHelperText>}
    </FormControl>
  );
}

SelectInput.propTypes = {
  id:           PropTypes.string.isRequired,
  name:         PropTypes.string.isRequired,
  items:        PropTypes.arrayOf(PropTypes.object).isRequired,
  currentForm:  PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectInput;