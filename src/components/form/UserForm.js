import React, { useState, useEffect } from 'react';
import './UserForm.css';
import { auth } from '../../config/firebase';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';

// Useful for adding the material-ui styles correctly

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fullWidth: {
    display: 'flex',
    height: '100%',
    minHeight: '100vh',
    justifyContent: 'center',
    width: '100%',
    minWidth: '100%',
    margin: 0,
    padding: '80px 0px 20px 0px',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: 'url(/login.jpg)',
  },
  center: {
    width: '100%',
    justifyContent: 'center',
  },
  formPaperWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  userForm: {
    position: 'relative',
    width: '100%',
    padding: '20px 40px',
    background: '#ffff',
    borderRadius: '5px',
    zIndex: 999,
    [theme.breakpoints.up('xs')]: {
      padding: '20px 20px',
    },
  },
  margin: {
    margin: theme.spacing(0),
  },
  marginTop: {
    marginTop: '30px !important',
  },
  marginTopMedium: {
    marginTop: '20px !important',
  },
  marginTopSmall: {
    marginTop: '20px !important',
  },
  formFieldWrapper: {
    minHeight: '70px',
    marginTop: '30px',
    marginBottom: '60px',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  formHeader: {
    padding: '15px',
    marginTop: '-40px',
    borderRadius: '3px',
    textAlign: 'center',
    background: 'linear-gradient(60deg, #61979e, #6ca4aa) !important',
    boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(66 148 157 / 40%) !important',
  },
  formHeaderText: {
    fontSize: '16px',
    color: '#fff',
    marginTop: 0,
    minHeight: 'auto',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 300,
    marginBottom: '3px',
    textDecoration: 'none'
  },
  formSubmitBtn: {
    width: '100%',
    padding: '10px !important',
    marginTop: '5px',
    color: '#fff !important',
    fontWeight: 500
  },
  inputLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#9a9a9a !important'
  },
  formLink: {
    textTransform: 'none',
    fontSize: '15px',
    textDecoration: 'none',
    color: '#676262',
    fontWeight: 500
  },
  alignRight: {
    textAlign: 'right',
  },
  colorWhite: {
    color: '#fff',
  }
}));

const useFormClassName = () => {
  const [{ currentForm }] = useStateValue();
  return `form-${currentForm}`;
};

export const useCurrentForm = () => {
  const [{ isFormCompleted, currentForm }, dispatch] = useStateValue();

  const setCurrentForm = () => {
    const _completed = isFormCompleted;
    _completed[currentForm] = false;

    // If handling multiple forms, uncomment this to persist all form data
    // handleFormValues();

    dispatch({
      type: actionTypes.SET_CURRENT_FORM,
      payload: { currentForm }
    });

    dispatch({
      type: actionTypes.SET_COMPLETED_FORM,
      payload: {
        isFormCompleted: _completed
      }
    });
  };

  return [setCurrentForm];
};

export const useFormAuth = (authArgs = {}) => {
  const {
    returnUser    = false,
    formResponse  = {},
    completedForm = {},
    redirectTo    = {
      error: null,
      success: null,
    },
  } = authArgs;

  const history = useHistory();
  const [{ isFormCompleted }, dispatch] = useStateValue();
  
  const unSubscribeUser = () => {
    return auth.onAuthStateChanged(user => {
      // console.log(user);
      if (user) {
        if (redirectTo?.success) {
          history.push(redirectTo.success);
        }

        // Return the user if specified
        if (returnUser) return user;

        // console.log(user);

        dispatch({
          type: actionTypes.SET_USER,
          payload: { user }
        });
        
        if (completedForm) {
          dispatch({
            type: actionTypes.SET_COMPLETED_FORM,
            payload: {
              isFormCompleted: {
                ...isFormCompleted,
                [completedForm]: true
              }
            }
          });
        }

        if (typeof formResponse === 'object') {
          dispatch({
            type: actionTypes.SET_FORM_RESPONSE,
            payload: { formResponse }
          });
        }
      } else {
        if (redirectTo?.error) {
          history.push(redirectTo.error);
        }
      }
    });
  };

  return [unSubscribeUser];
};

export const useFormFields = () => {
  const [{ formData, currentForm }] = useStateValue();
  
  const fieldValues    = formData[currentForm] || {};
  const listFormFields = React.useMemo(() => ({}), []);

  // Get all the form fields
  const formClassName        = useFormClassName();
  const registeredFormFields = document.querySelectorAll(`
    .${formClassName} [data-form-input=${true}] input
  `);

  const getFieldValue = field => (
    typeof fieldValues[field] === 'undefined' ? '' : fieldValues[field]
  );

  // Auto get the form fields
  Object.keys(formData[currentForm]).forEach(field => {
    Object.assign(listFormFields, {[field]: getFieldValue(field)});
  });

  // Auto setup all form fields
  registeredFormFields.forEach(field => {
    // Field Name is used when Field ID is not available
    const formFieldName = field?.id || field?.name;
    if (formFieldName) {
      const fieldValue = field?.value || getFieldValue(formFieldName);
      Object.assign(listFormFields, {[formFieldName]: fieldValue})
    }
  });

  return React.useMemo(() => listFormFields, [listFormFields]);
};

export const getFormInputError = ({ errors, id, name }) => {
  const errorText  = errors ? (errors[name] || '') : '';
  const error      = errorText.length ? true : false;
  const errorProp  = error ? { 'aria-describedby': `${id}-error-text` } : {};

  return {errorText, error, errorProp };
};

export function validateFormFields(props) {
  const {
    name,
    values,
    errors,
    fieldValue      = null,
    currentForm     = '',
    isFormSubmitted = false
  } = props;

  const value = !isFormSubmitted ? fieldValue : (name ? values[name] : '');

  // Only target the current input field when it is active
  const fields = name ? [ name ] : Object.keys(values);

  switch (name) {
    case 'email':
      const emailValue = value.trim();

      if (emailValue.length) {
        if (!isEmailValid(emailValue)) {
          errors.email = 'Email is invalid';
        } else {
          errors.email = '';
        }
      }
      break;

    case 'userId':
      const userIdValue = value.trim();
      const userIdRegex =  /^[a-z0-9]+$/ig;

      if (userIdValue.length) {
        if (userIdValue.length < 5) {
          errors.userId = 'Field minimum length is 5';
        }
        else if (userIdValue.length > 20) {
          errors.userId = 'Field maximum length is 20';
        }
        else {
          if (!userIdRegex.test(userIdValue)) {
            errors.userId = 'User ID is invalid. Only alphabets and numbers are accepted.';
          } else {
            errors.userId = '';
          }
        }
      }
      break;

    case 'password':
    case 'confirmPassword':
      if (value.length) {
        const password        = name === 'password'        ? value : values.password;
        const confirmPassword = name === 'confirmPassword' ? value : values?.confirmPassword;

        if (password.length < 8) {
          errors.password = 'Field minimum length is 8';
        } else {
          errors.password = '';
        }

        if ('signup' === currentForm) {
          if (password !== confirmPassword) {
            if (confirmPassword.length) {
              errors.password        = 'Passwords do not match';
              errors.confirmPassword = ' ';
            }
          } else {
            errors.password = '';
            errors.confirmPassword = '';
          }
        }
      }
      break;

    default: 
      // Nothing
      break;
  }

  // We need this here to properly validate the field empty state
  fields.forEach(field => {
    const emptyValue = (!isFormSubmitted && value !== null) ? value : values[field];

    if (emptyValue.trim().length < 1) {
      errors[field] = 'Field is required';
    } else {
      errors[field] = '';
    }
  });

  return errors;
};

export function validateFormOnSubmit({ fields, values, errors, handleFormSubmissionError }) {
  let _errors = {};

  fields.forEach(field => {
    const fieldError = validateFormFields({
      name: field,
      values,
      errors,
      isFormSubmitted: true
    });

    _errors = { ...fieldError };
  });

  const hasError = Object.values(_errors).some(error => error.trim().length);

  if (hasError) {
    handleFormSubmissionError(_errors);
    return false;
  }
  return true;
}

export function isEmailValid(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLowerCase());
}

export function ToggleFormSubmitButtonLoadingState({ label, isFormLoading }) {
  const classes = useStyles();
  
  return (
    <>
      {!isFormLoading ? label 
      : <CircularProgress 
          className={classes.colorWhite} 
          size={40} 
          thickness={3}
      />}
    </>
  );
}

export const purifyUndefinedValue = value => (
  (typeof value === 'undefined' || null === value) ? '' : value
);
  
export default function UserForm(formProps) {
    const {
      formType,
      FormHeader   = null,
      FormInput    = null,
      SubmitButton = null,
      FormFooter   = null,
      isAuthForm   = true // whether is login, signup, or forgot-password form
    } = formProps;

    const classes = useStyles();
    
    const [{
      formData,
      formError,
      formResponse,
      currentForm: _currentForm,
      showPassword,
      isFormLoading,
      isFormCompleted,
      dismissibleFormAlert
    }, dispatch] = useStateValue();
    
    const currentForm   = _currentForm;
    const fieldValues   = formData[currentForm] || {};
    const formClassName = useFormClassName();

    // Get all the form fields
    const formFields = useFormFields();
    const [values, setFormValues] = useState(formFields);

    // When updating field value, we don't want to mutate the state
    // and cause a re-render. So let's properly set the form field values
    const formStateUpdated = Object.values(fieldValues).filter(value => value.length > 0).length;
    
    const [isFormStateUpdated, setFormStateUpdated] = useState(formStateUpdated);
    const formValues = isFormStateUpdated ? fieldValues : values;

    const handleChange = fieldName => event => {
      const value = event.target.value;
      setFormStateUpdated(false);
      setFormValues({ ...formValues, [fieldName]: value });

      // Note: we are passing the current input value as last parameter
      // because setState() is asynchronous and gives us the previous value when 
      // accessed within this handler
      //
      // Note: by calling this handler, this will auto validate the form fields
      validateFormFields({
        currentForm,
        name:       fieldName,
        values:     formValues,
        errors:     formError[currentForm] || {},
        fieldValue: value,
      });
    };

    const handleFormValues = () => {
      const data = formData;
      data[currentForm] = formValues;

      dispatch({
        type: actionTypes.SET_FORM_DATA,
        payload: {
          formData: data
        }
      });
    }

    const handleClickShowPassword = () => {
      const togglePassword = showPassword[currentForm] || false;

      handleFormValues();
      dispatch({
        type: actionTypes.TOGGLE_FORM_PASSWORD,
        payload: {
          showPassword: {
            [currentForm]: !togglePassword
          }
        }
      });
    };

    const handleMouseDownPassword = event => {
      event.preventDefault();
    };

    const handleFormSubmissionError = errors => {
      const _errors = formError;
      _errors[currentForm] = errors;

      handleFormValues();
      dispatch({
        type: actionTypes.SET_FORM_ERROR,
        payload: {
          formError: _errors
        }
      });
    };

    const handleFormLoading = loading => {
      const _loading = isFormLoading;
      _loading[currentForm] = loading;

      handleFormValues();
      dispatch({
        type: actionTypes.SET_IS_FORM_LOADING,
        payload: {
          isFormLoading: _loading
        }
      });
    };

    const handleFormResponse = response => {
      const isDismissibleAlertVisible = (
        typeof response === 'object' 
        && typeof response.dismissible === 'boolean' 
      );

      const _response = formResponse;
      _response[currentForm] = response;

      handleFormValues();
      dispatch({
        type: actionTypes.SET_FORM_RESPONSE,
        payload: {
          formResponse: _response
        }
      });

      handleDismissibleAlert(isDismissibleAlertVisible);
    };

    const handleFormCompletion = completed => {
      const _completed = isFormCompleted;
      _completed[currentForm] = completed;

      handleFormValues();
      dispatch({
        type: actionTypes.SET_COMPLETED_FORM,
        payload: {
          isFormCompleted: _completed
        }
      });
    };

    const handleDismissibleAlert = formAlert => {
      const _formAlert = dismissibleFormAlert;
      _formAlert[currentForm] = formAlert;

      handleFormValues();
      dispatch({
        type: actionTypes.SET_DISMISSIBLE_FORM_ALERT,
        payload: {
          dismissibleFormAlert: _formAlert
        }
      });
    };

    /**
     * Set the current.
     * 
     * Initialize form data when it renders for the first time.
     */
    useEffect(() => {
      if (_currentForm !== formType) {
        dispatch({
          type: actionTypes.SET_CURRENT_FORM,
          payload: { currentForm: formType }
        });
      }

      if (!Object.keys(formData?.[currentForm] || {}).length) {
        const data = Object.assign({}, formData, {
          [currentForm]: formFields
        });

        dispatch({
          type: actionTypes.SET_FORM_DATA,
          payload: { formData: data }
        });
      }
    }, [_currentForm, formType, dispatch, formData, currentForm, formFields]);

    const DisplayFormCompletionState = () => {
      const response      = formResponse;
      const severity      = response.severity || 'error';
      const responseMsg   = response.message;
      const responseTitle = response.title;
      
      return (
        <div className={classes.marginTop}>
          <Alert severity={severity}>
            <AlertTitle>{responseTitle}</AlertTitle>
            {responseMsg}
          </Alert>
        </div>
      );
    };

    const DisplayDismissibleFormError = () => {
      const Fragment = <></>;
      const response = formResponse[currentForm] || {};
      
      if (isFormCompleted[formType] || false) return Fragment;

      const severity        = response.severity        || 'error';
      const dismissible     = response.dismissible     || false;
      const responseMsg     = response.message         || false;
      const isFormSubmitted = response.isFormSubmitted || false;

      if (isFormSubmitted) return Fragment;

      if (!dismissible || !responseMsg) return Fragment;

      const isDismissibleAlertVisible = dismissibleFormAlert[formType] || false;

      return (
        <div className={clsx(classes.marginTop, 'dismissibleAlertWrapper')}>
          <Collapse in={isDismissibleAlertVisible}>
            <Alert 
              severity={severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    handleDismissibleAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {responseMsg}
            </Alert>
          </Collapse>
        </div>
      );
    };

    const renderFormInput = (
      <FormInput {...{ 
          formValues,
          handleChange,
          handleClickShowPassword,
          handleMouseDownPassword
        }}
      />
    );

    const renderSubmitButton = !SubmitButton ? <></> : (
      <SubmitButton {...{
        formFields: Object.keys(formFields),
        formValues,
        setFormValues,
        handleFormValues,
        handleFormLoading,
        handleFormResponse,
        handleFormCompletion,
        handleDismissibleAlert,
        handleFormSubmissionError
        }}
      />
    );

    const renderAuthForm = (
       <div className={classes.root}>
        <CssBaseline />
        <Container maxWidth="sm" className={ clsx(classes.fullWidth, 'fullWidthContainer') }>
          <Grid container spacing={3} className={classes.center}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Paper className={classes.formPaperWrapper}>
                <form className={classes.userForm}>
                  {FormHeader && <FormHeader />}
                  <DisplayDismissibleFormError />

                  {!(isFormCompleted[formType] || false) ? 
                    <>
                      <div className={classes.formFieldWrapper}>
                        {renderFormInput}
                      </div>
                      <div>{renderSubmitButton}</div>
                    </> 
                    : 
                    <DisplayFormCompletionState />
                  }

                  <div className={classes.marginTop}>
                    {FormFooter && <FormFooter />}
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container> 
      </div>
    );

    const renderNormalForm = (
      <form className={`${formClassName} normalForm`}>
        {(isFormCompleted[formType] || false) ? 
          <DisplayFormCompletionState />
          : 
          <>
            {FormHeader && <FormHeader />}
            <DisplayDismissibleFormError />
            <div className="formInputWrapper">{renderFormInput}</div>
            {renderSubmitButton}
            {FormFooter && <FormFooter />}
          </>
        }
      </form>
    );

    return isAuthForm ? renderAuthForm : renderNormalForm;
}