import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import { 
  useStyles, 
  getFormInputError,
  purifyUndefinedValue
} from './UserForm';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';

export default function SelectField(props) {
  const classes = useStyles();

  const {
    id, 
    name: fieldName = false,
    value: defaultValue = '',
    items,
    formValues,
    handleChange,
  } = props;

  const [{
    formError,
    currentForm
  }] = useStateValue();

  const name        = fieldName  ? fieldName : id;     
  const lookupValue = formValues ? formValues[name] : null;
  const value       = (null === lookupValue || typeof lookupValue === 'undefined') ? 
    defaultValue : lookupValue;

  const label      = props.label || 'Select';
  const labelWidth = props.labelWidth || 60;

  const {
    errorText,
    error,
    errorProp
  } = getFormInputError({ id, name, errors: formError[currentForm] });

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
          value={purifyUndefinedValue(value)}
          variant="outlined"
          labelWidth={labelWidth}
          onChange={handleChange(name)}
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