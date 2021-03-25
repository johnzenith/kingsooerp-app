import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useFormInputError } from './../Form/useFormInputError';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function UploadButton(props) {
  const classes = useStyles();

    const { 
        id, 
        name: fieldName = false,
        // formValues,
        handleChange,
        currentForm,
        accept = '',
        formErrors = {},
        isMultiple = false,
    } = props;

    const name  = fieldName    || id;

    const Icon  = props.icon   ?? CloudUploadIcon;
    const label = props.label  || 'Upload';

    const {
        errorText,
        error,
        errorProp
    } = useFormInputError({
        id,
        name,
        errors: formErrors?.[currentForm]
    });

    return (
        <div className={classes.root}>
            <input
                accept={accept ?? "image/*,application/pdf"}
                className={classes.input}
                id={id} 
                name={name} 
                multiple={isMultiple}
                type="file"
                onChange={handleChange(currentForm, name)}
                {...errorProp}
            />
            <label htmlFor={id} style={{ margin: '0px' }}>
                <Button variant="contained" color="secondary" component="span">                    
                    <Icon 
                        style={{
                            fontSize: '20px',
                            marginRight: '10px',
                        }} 
                    />
                    {label}
                </Button>
            </label>

            {error && 
            <FormHelperText id={`${id}-error-text`}>
              {errorText}
            </FormHelperText>}
        </div>
    );
}

UploadButton.propTypes = {
  id:           PropTypes.string.isRequired,
  name:         PropTypes.string.isRequired,
  currentForm:  PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default UploadButton;