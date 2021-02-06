import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import { 
  useStyles, 
  getFormInputError,
  purifyUndefinedValue
} from './UserForm';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function TextInput(props) {
  const classes = useStyles();

  const { 
    id, 
    name: fieldName = false,
    formValues,
    handleChange
  } = props;

  const [{
    formError,
    currentForm
  }] = useStateValue();

  const name  = fieldName  ? fieldName : id;
  const value = formValues ? formValues[name] : '';

  const Icon       = props.Icon ? props.Icon : AccountCircle;
  const type       = props.type || 'text';
  const label      = props.label || 'User ID';
  const labelWidth = props.labelWidth || 60;

  const {
    errorText,
    error,
    errorProp
  } = getFormInputError({ id, name, errors: formError[currentForm] });

  const shrink = ('date' === type) ? true : false;

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
        <OutlinedInput
          id={name}
          name={name}
          key={id}
          data-form-input={true}
          type={type}
          value={purifyUndefinedValue(value)}
          onChange={handleChange(name)}
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