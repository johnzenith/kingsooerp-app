import React from 'react';
import { FormGrid, FormGridItem } from '../EmployeesManagement/AddEmployeeForms';
import TextInput from './TextInput';
import UserForm, {
  useStyles,
  useFormAuth,
  useCurrentForm,
  validateFormOnSubmit,
  ToggleFormSubmitButtonLoadingState
} from './UserForm';
import { makeStyles } from '@material-ui/core/styles';
import ContactMailIcon from '@material-ui/icons/ContactMail';

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

export default function OtherDataForEmployeeForm(formProps) {
  const {
    FormHeader   = null,
    FormFooter   = null,
    SubmitButton = null,
  } = formProps;

  const classes     = useFormStyles();
  const currentForm = 'addEmployee';

  const FormInput = (props) => {
    const { formValues, handleChange } = props;

    return (
      <div className={classes.root}>
        <FormGrid>
          <FormGridItem>
            <TextInput 
              id='otherDataEmergencyAddress1'
              label='Emergency Address *'
              labelWidth={150}
              Icon={ContactMailIcon}
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
