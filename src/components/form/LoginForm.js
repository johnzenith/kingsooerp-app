import React, { useEffect } from 'react';
import { useStateValue } from '../../context/StateProvider';
import { auth } from '../../config/firebase';
import clsx from 'clsx';
import UserForm, {
  useStyles,
  useFormAuth,
  useCurrentForm,
  validateFormOnSubmit,
  ToggleFormSubmitButtonLoadingState
} from './UserForm';
import { ForgotPasswordFormLinkButton } from './ForgotPasswordForm';
import { SignUpFormLinkButton } from './SignUpForm';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EmailRounded from '@material-ui/icons/EmailRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

export const LoginFormLinkButton = () => {
  const classes          = useStyles();
  const [setCurrentForm] = useCurrentForm();

  return (
    <Link onClick={setCurrentForm} to="/login" className={classes.formLink}>
      Login
    </Link>
  );
};

export default function LoginForm() {
    const classes = useStyles();
    const [{ formError, isFormLoading }] = useStateValue();

    const currentForm = 'login';

    const login = (email, password) => {
      return auth.signInWithEmailAndPassword(email, password);
    };

    const [formAuth] = useFormAuth({
      formResponse: {
        title: 'Login Successful!',
        severity: 'success',
        dismissible: false,
        message: 'Great! Logged In successfully.',
      },
      completedForm: 'login',
    });

    useEffect(() => {
      return formAuth();
    }, [formAuth]);

    const FormHeader = () => (
      <div className={classes.formHeader}>
        <h4 className={classes.formHeaderText}>Login Form</h4>
      </div>
    );

    const FormInput = (props) => {
        const {
          formValues,
          handleChange,
          handleMouseDownPassword,
          handleClickShowPassword
        } = props;

        // Check whether [email] or [userId] field is in use
        const loginUsingEmail = Object.keys(formValues).includes('email');
        const fieldName       = loginUsingEmail ? 'email' : 'userId';

        const fieldProps = loginUsingEmail ? {
          Icon: EmailRounded,
          type: 'email',
          labelWidth: 40,
        } : {};

        return (
          <>
            <TextInput 
                id={`outlined-adornment-${fieldName}`}
                label={ loginUsingEmail ? 'Email' : 'User ID' }
                name={fieldName} 
                {...{...fieldProps, formValues, handleChange}}
            />
                
            <PasswordInput 
                id="outlined-adornment-password"
                label="Password" 
                IconButton={IconButton}
                name="password" 
                {...{
                  formValues,
                  handleChange,
                  handleClickShowPassword,
                  handleMouseDownPassword
                }}
            />
          </>
        );
    };

    const SubmitButton = props => {
      const {
        formValues,
        formFields,
        handleFormLoading,
        handleFormResponse,
        handleFormCompletion,
        handleDismissibleAlert,
        handleFormSubmissionError
      } = props;

      async function handleSubmit(e) {
        e.preventDefault();
        
        const isFormValid = validateFormOnSubmit({
          fields: formFields,
          values: formValues,
          errors: formError[currentForm] || {},
          isFormSubmitted: true,
          handleFormSubmissionError
        });
        
        if (!isFormValid) return;

        // Reset the form response
        handleFormResponse({});
        handleDismissibleAlert(false);
        handleFormSubmissionError({});
        handleFormLoading(true);
        
        try {
          await login(formValues.email, formValues.password);
          handleFormLoading(false);
        }
        catch (e) {
          console.log(e);
          let message;

          if (e?.code === 'auth/argument-error') {
            message = 'Your credentials is invalid';
          } else {
            message = e.message || 'Account creation failed, please try again';
          }
          
          handleFormCompletion(false);
          handleFormLoading(false);
          handleFormResponse({
            title: '',
            severity: 'error',
            dismissible: true,
            message
          });
        }
      }

      const formLoading = isFormLoading ? (isFormLoading[currentForm] || false) : false;
      const ButtonIcon  = formLoading   ? <></> : <ExitToAppIcon />;

      return (
        <Button 
          type="submit"
          onClick={handleSubmit}
          className={ clsx(classes.formHeader, classes.formSubmitBtn) } 
          variant="contained"
          endIcon={ButtonIcon}
        >
          {<ToggleFormSubmitButtonLoadingState 
            label="Let's Go" 
            isFormLoading={formLoading}
          />}
        </Button>
      );
    };

    const FormFooter = () => (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <SignUpFormLinkButton />
        </Grid>
        <Grid item xs={6} className={classes.alignRight}>
          <ForgotPasswordFormLinkButton />
        </Grid>
      </Grid>
    );
    
    return (
      <UserForm {...{
          FormHeader,
          FormInput,
          SubmitButton,
          FormFooter,
          formType: currentForm
        }}
      />
    );
}