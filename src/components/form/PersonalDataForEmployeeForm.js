import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import { FormGrid, FormGridItem } from '../EmployeesManagement/AddEmployeeForms';
import TextInput from './TextInput';
import DateInput from './DateInput';
import MenuItem from '@material-ui/core/MenuItem';
import SelectField from './SelectField';
import UserForm, {
  useStyles,
  useFormAuth,
  useCurrentForm,
  validateFormOnSubmit,
  ToggleFormSubmitButtonLoadingState
} from './UserForm';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import EventIcon from '@material-ui/icons/Event';
import PublicIcon from '@material-ui/icons/Public';

const useFormStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function PersonalDataForEmployeeForm(formProps) {
  const {
    FormHeader   = null,
    FormFooter   = null,
    SubmitButton = null,
  } = formProps;

  const [{
    user,
    formError,
    isFormLoading,
  }, dispatch] = useStateValue();

  const classes     = useFormStyles();
  const currentForm = 'addEmployee';

  const FormInput = (props) => {
    const { formValues, handleChange } = props;

    return (
      <div className={classes.root}>
        <FormGrid>
          <FormGridItem>
            <TextInput 
              id='personalDataLastName'
              label='Last Name *'
              labelWidth={90}
              Icon={PersonIcon}
              {...{formValues, handleChange}}
            />
          </FormGridItem>
          <FormGridItem>
            <TextInput 
              id='personalDataFirstName'
              label='First Name *'
              labelWidth={90}
              Icon={PersonIcon}
              {...{formValues, handleChange}}
            />
          </FormGridItem>
          <FormGridItem>
            <TextInput 
              id='personalDataOtherName'
              label='Other Name *'
              labelWidth={100}
              Icon={PersonIcon}
              {...{formValues, handleChange}}
            />
          </FormGridItem>
        </FormGrid>

        <FormGrid>
          <FormGridItem>
            <SelectField 
              id='personalDataGender'
              label='Gender *'
              labelWidth={70}
              items={[ 
                { label: 'Male',   value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Other',  value: 'Other' },
                ]}
              {...{formValues, handleChange}}
            />
          </FormGridItem>
          <FormGridItem>
            <SelectField 
              id='personalDataMaritalStatus'
              label='Marital Status *'
              labelWidth={100}
              items={[ 
                { value: 'Married' },
                { value: 'Single' },
                ]}
              {...{formValues, handleChange}}
            />
          </FormGridItem>
          <FormGridItem>
            <TextInput 
              id='personalDataEmail'
              label='Personal Email *'
              labelWidth={120}
              Icon={EmailIcon}
              {...{formValues, handleChange}}
            />
          </FormGridItem>
        </FormGrid>

        <FormGrid>
          <FormGridItem>
            <TextInput 
              id='personalDataPhoneNumber'
              label='Phone Number *'
              labelWidth={120}
              Icon={PhoneIcon}
              {...{formValues, handleChange}}
            />
          </FormGridItem>
          <FormGridItem>
            <DateInput 
              id='personalDataBirthday'
              label='Set Date of Birth *'
              labelWidth={130}
              Icon={EventIcon}
              {...{formValues, handleChange}}
            />
          </FormGridItem>
          <FormGridItem>
            <TextInput 
              id='personalDataNationality'
              label='Nationality *'
              labelWidth={90}
              Icon={PublicIcon}
              {...{formValues, handleChange}}
            />
          </FormGridItem>
        </FormGrid>
      </div>
    );
  };

  return <UserForm {...{
      FormHeader,
      FormInput,
      SubmitButton,
      FormFooter,
      formType: currentForm,
      isAuthForm: false
    }}
  />;
}
