import React from 'react';
import './AddEmployeeForms.css';
import db, {  firebaseLib } from '../../config/firebase';
import PropTypes from 'prop-types';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
import {
  useFormFields,
  validateFormOnSubmit,
  ToggleFormSubmitButtonLoadingState
} from '../form/UserForm';
import PersonalDataForEmployeeForm from '../form/PersonalDataForEmployeeForm';
import BankDataForEmployeeForm from '../form/BankDataForEmployeeForm';
import OtherDataForEmployeeForm from '../form/OtherDataForEmployeeForm';
import EmployeeInfoForEmployeeForm from '../form/EmployeeInfoForEmployeeForm';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useHistory } from 'react-router-dom';

export const FormGrid = ({ children }) => (
  <Grid container spacing={3} style={{ marginBottom: '10px' }}>
    {children}
  </Grid>
);

export const FormGridItem = ({ children }) => (
  <Grid item xs={12} sm={12} md={4} lg={4}>
    {children}
  </Grid>
);

export default function AddEmployeeForms() {
  const classes = useStyles();
  const steps   = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        <Divider style={{ background: '#999' }} />
        <div className={classes.formContent}>
          {getStepContent({
            steps, 
            classes, 
            activeStep,
            handleBack, 
            handleNext,
            setActiveStep
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Functions
 */

 const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,#f44336 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'radial-gradient(#38873c, #74b42a)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,#f44336 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'radial-gradient(#38873c, #74b42a)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon />,
    2: <WorkIcon />,
    3: <AccountBalanceIcon />,
    4: <ListAltIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepActiveButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    '& button': {
      minWidth: '120px',
      padding: '7px 20px',
      fontSize: '12px',
      fontWeight: 500,
    },
    '& button:last-child': {
      background: '#42949d',
      boxShadow: '0 2px 2px 0 rgb(66 148 157 / 14%), 0 3px 1px -2px rgb(66 148 157 / 20%), 0 1px 5px 0 rgb(66 148 157 / 12%)',
    }
  },
  formContent: {
    padding: '0px',
  },
  makeFormHidden: {
    display: 'none',
  },
}));

function getSteps() {
  return ['Personal', 'Employee Info', 'Bank & Pension', 'Other Data'];
}

function getStepContent(stepProps) {
  const { 
    steps,
    activeStep, 
    classes, 
    handleBack, 
    handleNext, 
    setActiveStep
  } = stepProps;

  const SubmitButton = props => {
    const history = useHistory();

    const [{
      formData,
      formError,
      currentForm,
      dataCounter,
      isFormLoading
    }, dispatch] = useStateValue();

    const {
      setFormValues,
      handleFormLoading,
      handleFormResponse,
      handleFormCompletion,
      handleDismissibleAlert,
      handleFormSubmissionError
    } = props;

    const formValues = useFormFields();
    const formFields = Object.keys(formValues);

    function handleSubmit(e) {
      e.preventDefault();

      const isFormValid = validateFormOnSubmit({
        fields: formFields,
        values: formValues,
        errors: formError[currentForm] || {},
        isFormSubmitted: true,
        handleFormSubmissionError
      });
      
      // Focus the first error input
      if (!isFormValid || typeof formError?.[currentForm] === 'object') {
        const errors       = formError[currentForm];
        const formHasError = Object.values(errors).some(error => error && error.length);

        if (formHasError) {
          const errorList       = Object.keys(errors);
          const inputSelector   = `[id=${errorList[0]}], [name=${errorList[0]}]`;
          const firstInputError = document.querySelector(inputSelector);

          if (firstInputError) {
            const targetForm = 
              firstInputError.closest('.addEmployeeFormsWrapper').querySelectorAll('form');

            if (targetForm && targetForm.length) {
              targetForm.forEach((form, index) => {
                const findInput = form.querySelector(inputSelector);
                if (findInput) {
                  findInput.focus();
                  setActiveStep(index);
                }
              });
            }
          }
        }
      }

      if (!isFormValid) return;

      // Reset the form response
      handleFormResponse({});
      handleDismissibleAlert(false);
      handleFormSubmissionError({});
      handleFormLoading(true);
      
      try {
        db.collection('employees').add({
          personalData: {
            lastName:      formValues.personalDataLastName,
            firstName:     formValues.personalDataFirstName,
            otherName:     formValues.personalDataOtherName,
            gender:        formValues.personalDataGender,
            email:         formValues.personalDataEmail,
            birthday:      formValues.personalDataBirthday,
            nationality:   formValues.personalDataNationality,
            phoneNumber:   formValues.personalDataPhoneNumber,
            maritalStatus: formValues.personalDataMaritalStatus,
          },
          bankData: {
            bankName: formValues.bankDataBankName,
          },
          employeeInfo: {
            expectedSalary: formValues.employeeInfoExpectedSalary
          },
          otherData: {
            emergencyAddress1: formValues.otherDataEmergencyAddress1,
          },
        });

        db.collection('dataCounter').doc('employees').update({
          totalEmployees: firebaseLib.firestore.FieldValue.increment(1),
        });

        handleFormLoading(false);

        const employeeName = `${formValues.personalDataLastName} ${formValues.personalDataFirstName}`;

        const message = (
          <span>
            Great! The employee <strong>{employeeName.toLowerCase()}</strong> has been added successfully
          </span>
        );

        handleFormResponse({
          title: 'Employee Added successfully!',
          severity: 'success',
          dismissible: true,
          isFormSubmitted: true,
          message,
        });

        const totalEmployees = typeof dataCounter?.totalEmployees === 'number' ? 
          dataCounter.totalEmployees : 0;

        dispatch({
          type: actionTypes.SET_DATA_COUNTER,
          payload: {
            dataCounter: {
              ...dataCounter,
              totalEmployees:  totalEmployees + 1,
            }
          }
        });

        dispatch({
          type: actionTypes.SET_EMPLOYEE_ALERT_VISIBILITY,
          payload: {
              employeeAlert: true,
          }
        });

        dispatch({
          type: actionTypes.SET_FORM_DATA,
          payload: {
            formData: {
              ...formData,
              [currentForm]: {}
            }
          }
        });

        setFormValues({});

        // Clear the form
        document.querySelectorAll('.form-addEmployee input').forEach(input => {
          input.value = '';
        });

        history.push('/human-resource/employees-management');
      }
      catch (e) {
        console.log(e);
        const message = e?.message || 'An error occurred. The employee could not be added.';
        
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
      <div className={classes.stepActiveButtons}>
        <Button 
          variant="contained" 
          disabled={activeStep === 0} 
          onClick={handleBack} 
          className={classes.button}
        >
          <ChevronLeftIcon style={{ marginRight: '7px' }} /> 
          Back 
        </Button>

        {(activeStep !== steps.length - 1) ? 
          (<Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Next
            <ChevronRightIcon style={{ marginLeft: '7px' }} />
          </Button>) 
          : 
          (<Button 
            type="submit"
            onClick={handleSubmit}
            className={ clsx(classes.formHeader, classes.formSubmitBtn) } 
            variant="contained"
            endIcon={ButtonIcon}
            style={{ color: '#fff' }}
          >
            <ToggleFormSubmitButtonLoadingState 
              label="Submit" 
              isFormLoading={formLoading}
            />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="addEmployeeFormsWrapper">
      <div className={clsx({
          [classes.makeFormHidden]: 0 !== activeStep
      })}>
        <PersonalDataForEmployeeForm SubmitButton={SubmitButton} />
      </div>

      <div className={clsx({
          [classes.makeFormHidden]: 1 !== activeStep
      })}>
        <EmployeeInfoForEmployeeForm SubmitButton={SubmitButton} />
      </div>

      <div className={clsx({
          [classes.makeFormHidden]: 2 !== activeStep
      })}>
        <BankDataForEmployeeForm SubmitButton={SubmitButton} />
      </div>

      <div className={clsx({
          [classes.makeFormHidden]: 3 !== activeStep
      })}>
        <OtherDataForEmployeeForm SubmitButton={SubmitButton} />
      </div>
    </div>
  );
}