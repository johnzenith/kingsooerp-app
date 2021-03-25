import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function StepControlButton(props) {
  const { 
    steps,
    activeStep,
    handleBack, 
    handleNext,
    controlButtons,
  } = props;

  const classes = makeStyles((theme) => ({
    root: {
      width: '90%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    stepActiveButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
      marginBottom: '30px',
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
  }))();

  const [
    PreviousButton,
    NextButton,
    SubmitButton
  ] = [
    controlButtons?.previous,
    controlButtons?.next,
    controlButtons?.submit,
  ];

  const CreateNextButton = () => {
    if (activeStep !== steps.length - 1) {
      return (
        NextButton ? 
          <NextButton {...props} />
          : 
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Next
            <ChevronRightIcon style={{ marginLeft: '7px' }} />
          </Button>
      );
    }

    return (
      SubmitButton ? 
        <SubmitButton {...props} />
        : 
        <Button 
          type="submit"
          onClick={() => { console.log('done');}}
          variant="contained"
          endIcon={<ExitToAppIcon />}
          style={{ color: '#fff' }}
        >
          Done 
        </Button>
    );
  };

  return (
    <div className={clsx(classes.stepActiveButtons, `stepper__controlButton stepper__controlButton__${activeStep}`)}>
      {PreviousButton ? 
        <PreviousButton 
          disabled={activeStep < 1} 
          {...props}
        />
        : 
        <Button 
          variant="contained" 
          disabled={activeStep < 1} 
          onClick={handleBack} 
          className={classes.button}
        >
          <ChevronLeftIcon style={{ marginRight: '7px' }} /> 
          Back 
        </Button>
      }
      
      <CreateNextButton />
    </div>
  );
}

/**
 * Props
 */
StepControlButton.propTypes = {
  steps:          PropTypes.arrayOf(PropTypes.node),
  activeStep:     PropTypes.number,
  handleBack:     PropTypes.func, 
  handleNext:     PropTypes.func,
  setActiveStep:  PropTypes.func,
  controlButtons: PropTypes.objectOf(PropTypes.elementType),
};

export default StepControlButton;