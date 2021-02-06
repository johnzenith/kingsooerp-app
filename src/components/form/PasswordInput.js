import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import { 
  useStyles, 
  getFormInputError,
  purifyUndefinedValue
} from './UserForm';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function PasswordInput(props) {
  const classes = useStyles();
  const { 
    id,
    label,
    name: fieldName = false,
    formValues,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword
  } = props;

  const [{
    formError,
    showPassword,
    currentForm
  }] = useStateValue();

  const name  = fieldName  ? fieldName : id;
  const value = formValues ? formValues[name] : '';

  // The password input may support visibility toggling
  const Icon       = props.Icon || false;
  const IconButton = props.IconButton || false;

  const labelWidth = props.labelWidth || 70;

  const {
    errorText,
    error,
    errorProp
  } = getFormInputError({ id, name, errors: formError[currentForm] });

  const togglePassword = showPassword[currentForm] || false;

  return (
    <FormControl 
      fullWidth 
      className={ clsx(classes.margin, classes.marginTop) } 
      variant="outlined"

      {...{error}}
    >
      <InputLabel 
        className={classes.inputLabel} 
        htmlFor={id}

        {...{error}}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id={name} 
        key={`${id}_1`}
        type={togglePassword ? 'text' : 'password'}
        value={purifyUndefinedValue(value)}
        data-form-input={true}
        onChange={handleChange(name)}
        endAdornment={
          <InputAdornment position="end">
            {Icon && <Icon />}
            {IconButton && 
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {togglePassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>}
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