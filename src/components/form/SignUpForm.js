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
import { LoginFormLinkButton } from './LoginForm';
import { ForgotPasswordFormLinkButton } from './ForgotPasswordForm';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import EmailRounded from '@material-ui/icons/EmailRounded';
import { Link } from 'react-router-dom';

export const SignUpFormLinkButton = () => {
  const classes          = useStyles();
  const [setCurrentForm] = useCurrentForm();

  return (
    <Link onClick={setCurrentForm} to="/signup" className={classes.formLink}>
      Sign Up
    </Link>
  );
};

export default function SignUpForm() {
    const classes = useStyles();
    const [{ formError, isFormLoading, }] = useStateValue();

    const currentForm = 'signup';

    const createUser = (email, password) => {
      return auth.createUserWithEmailAndPassword(email, password);
    };

    const [formAuth] = useFormAuth({
      formResponse: {
        title: 'Sign Up Successful!',
        severity: 'success',
        dismissible: false,
        message: 'Great! Account created successfully.'
      },
      completedForm: 'signup',
    });
    
    useEffect(() => {
      return formAuth();
    }, [formAuth]);

    const FormHeader = () => (
      <div className={classes.formHeader}>
        <h4 className={classes.formHeaderText}>Sign Up</h4>
      </div>
    );

    const FormInput = (props) => {
        const {
          formValues,
          handleChange,
          handleMouseDownPassword,
          handleClickShowPassword
        } = props;
        
        const inputFieldProps = {
          formValues,
          handleChange
        };

        const passwordInputProps = {
          formValues,
          handleChange,
          handleClickShowPassword,
          handleMouseDownPassword
        };
        
        return (
          <>
            <TextInput 
                id="outlined-adornment-userId"
                label="User ID" 
                name="userId" 
                {...inputFieldProps} 
            />

            <div className={classes.marginTopSmall}>
              <TextInput 
                  id="outlined-adornment-email"
                  type="email"
                  Icon={EmailRounded}
                  label="Email" 
                  name="email" 
                  labelWidth={40}
                  {...inputFieldProps} 
              />
            </div>
                
            <PasswordInput 
                id="outlined-adornment-password"
                label="Password" 
                IconButton={IconButton}
                name="password"
                {...passwordInputProps}
            />

            <PasswordInput 
                id="outlined-adornment-confirm-password" 
                label="Confirm Password"  
                labelWidth={140}
                Icon={LockIcon} 
                name="confirmPassword" 
                {...passwordInputProps}
            />
         </>
        );
    };

    const SubmitButton = (props) => {
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
          errors: formError[currentForm] || {},
          values: formValues,
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
          await createUser(formValues.email, formValues.password);
          handleFormLoading(false);
        }
        catch (e) {
          const message = e.message || 'Sign up failed, please try again';
          
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
      const ButtonIcon = formLoading ? <></> : <PersonAddIcon />;

      return (
        <Button 
          type="submit" 
          className={ clsx(classes.formHeader, classes.formSubmitBtn) } 
          variant="contained"
          endIcon={ButtonIcon} 
          onClick={handleSubmit}
          disabled={formLoading}
        >
          {<ToggleFormSubmitButtonLoadingState 
            label="Sign Me Up" 
            isFormLoading={formLoading}
          />}
        </Button>
      );
    };

    const FormFooter = () => (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <LoginFormLinkButton />
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
          formType: 'signup'
        }} 
      />
    );
}