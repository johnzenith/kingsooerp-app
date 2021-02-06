import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import { 
  useStyles,
  getFormInputError,
  purifyUndefinedValue
} from './UserForm';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import EventIcon from '@material-ui/icons/Event';

export default function DateInput(props) {
  const classes = useStyles();
  const [inputType, setInputType] = React.useState('text');

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

  const Icon       = props.Icon ? props.Icon : EventIcon;
  const label      = props.label || 'Date';
  const labelWidth = props.labelWidth || 60;

  const {
    errorText,
    error,
    errorProp
  } = getFormInputError({ id, name, errors: formError[currentForm] });

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
        value={purifyUndefinedValue(value)}
        label={label}
        placeholder=" "
        variant='outlined'
        className={classes.margin}
        onChange={handleChange(name)}
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
        FormHelperTextProps	={helperText}
        {...{error}}
      />
  );
}