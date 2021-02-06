import React, { useEffect } from 'react';
import { useStateValue } from '../../context/StateProvider';
import clsx from 'clsx';
import UserForm, {
  useStyles,
  useFormAuth,
  useCurrentForm,
  validateFormOnSubmit,
  ToggleFormSubmitButtonLoadingState
} from './UserForm';
import { LoginFormLinkButton } from './LoginForm';
import { SignUpFormLinkButton } from './SignUpForm';
import TextInput from './TextInput';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EmailRounded from '@material-ui/icons/EmailRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

export const ForgotPasswordFormLinkButton = () => {
  const classes          = useStyles();
  const [setCurrentForm] = useCurrentForm();

  return (
    <Link onClick={setCurrentForm} to="/forgot-password" className={classes.formLink}>
      Forgot Password ?
    </Link>
  );
};

export default function LoginForm() {
    const classes = useStyles();
    const [{
      user,
      formError,
      isFormLoading,
    }, dispatch] = useStateValue();

    const currentForm = 'forgotPassword';

    const [formAuth] = useFormAuth({
      formResponse: {
        title: 'Password Retrieval Successful!',
        severity: 'success',
        dismissible: false,
        message: 'Great! Password retrieval request sent successfully.'
      },
      completedForm: 'forgot-password',
    });

    useEffect(() => {
      return formAuth();
    }, [formAuth]);

    const FormHeader = () => (
      <div className={classes.formHeader}>
        <h4 className={classes.formHeaderText}>Password Recovery Form</h4>
      </div>
    );

    const FormInput = (props) => {
        const { formValues, handleChange } = props;

        // Check whether [email] or [userId] field is in use
        const loginUsingEmail = Object.keys(formValues).includes('email');
        const fieldName       = loginUsingEmail ? 'email' : 'userId';

        const fieldProps = loginUsingEmail ? {
          Icon: EmailRounded,
          type: 'email',
          labelWidth: loginUsingEmail ? 125 : 140,
        } : {};

        return (
          <>
            <TextInput 
              id={`outlined-adornment-${fieldName}`}
              label={ `Enter Your ${loginUsingEmail ? 'Email' : 'User ID'}`}
              name={fieldName} 
              {...{...fieldProps, formValues, handleChange}}
            />
          </>
        );
    };

    const SubmitButton = props => {
      const {
        formFields,
        formValues,
        handleFormLoading,
        handleFormResponse,
        handleFormCompletion,
        handleDismissibleAlert,
        handleFormSubmissionError
      } = props;

      function handleSubmit(e) {
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
          // await login(formValues.email, formValues.password);
          handleFormLoading(false);
        }
        catch (e) {
          console.log(e);
          let message;

          if (e?.code === 'auth/argument-error') {
            message = 'Your credentials is invalid';
          } else {
            message = e.message || 'Password recovery failed, please try again';
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
            label="Recover My Password" 
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
          <LoginFormLinkButton />
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