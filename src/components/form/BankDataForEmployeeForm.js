import React from 'react';
import { FormGrid, FormGridItem } from '../EmployeesManagement/AddEmployeeForms';
import TextInput from './TextInput';
import UserForm from './UserForm';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

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

export default function BankDataForEmployeeForm(formProps) {
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
              id='bankDataBankName'
              label='Bank Name *'
              labelWidth={90}
              Icon={HomeIcon}
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
