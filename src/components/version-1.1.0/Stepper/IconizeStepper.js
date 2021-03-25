import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Divider from '@material-ui/core/Divider';

import StepContent from './StepContent';
import StepperTitle from './StepperTitle';
import StepControlButton from './StepControlButton';

const StepStyleConnector = withStyles({
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

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: '30px',
        padding: '20px',
        [theme.breakpoints.down('xs')]: {
        padding: 0,
        },
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
    stepper: {
        [theme.breakpoints.down('sm')]: {
            
        }
    },
    stepContentWrapper: {
      minHeight: 'calc(100vh - 90% )',
      background: '#fff',
      padding: '30px 0px 20px 0px',
      boxShadow: '0px 2px 5px #ddd',
    }
}));

/**
 * Stepper
 */
function IconizeStepper(props) {
    const {
        steps          = ['Personal', 'Employee Info', 'Bank & Pension', 'Other Data'],
        icons          = [<PersonIcon />, <WorkIcon />, <AccountBalanceIcon />, <ListAltIcon />],
        title          = 'Title',
        contents       = ['form 1', 'form 2', 'form 3', 'form 4'],
        controlButtons = {
            'next'    : '',
            'submit'  : '', // Will auto setup the submit button on last step when specified
            'previous': '',
        },
        activeStep: _activeStep = 0,
    } = props;

    const [classes, firstStep, lastStep] = [useStyles(), 0, steps.length - 1];
    const [activeStep, setActiveStep]    = useState(_activeStep);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            const step = prevActiveStep + 1;
            return step > lastStep ? lastStep : step;
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            const step = prevActiveStep - 1;
            return  step < firstStep ? firstStep : step;
        });
    };

    const moveToStep = (index) => () => {
        setActiveStep(index);
    };

    const StepIcon = ({ icon, active, completed }) =>
    {
        const useStepStyleStepIconStyles = makeStyles({
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
                cursor: 'pointer',
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
            cursorPointer: {
                cursor: 'pointer',
            }
        });
        
        const [classes, iconIndex] = [useStepStyleStepIconStyles(), (+icon - 1)];

        return (
            <div
            className={clsx(classes.root, {
                [classes.active]:    active,
                [classes.completed]: completed,
            })}
            onClick={moveToStep(iconIndex)}
            >
            {icons[ iconIndex ] ?? ''}
            </div>
        );
    };

    StepIcon.propTypes = {
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

    return (
        <div className={classes.root}>
            {title && <StepperTitle {...{ title, steps, activeStep }} />}

            <div style={{ width: '100%' }}>
                <Stepper className={classes.stepper} alternativeLabel activeStep={activeStep} connector={<StepStyleConnector />}>
                    {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={StepIcon}>
                            <span style={{cursor: 'pointer'}} onClick={moveToStep(index)}>
                                {label}
                            </span>
                        </StepLabel>
                    </Step>
                    ))}
                </Stepper>

                <Divider style={{ background: '#99999987' }} />

                <div className={classes.stepContentWrapper}>
                    <StepContent
                        {...{ activeStep, steps, contents }}
                    />
                </div>

                <StepControlButton
                    {...{ steps, activeStep, handleBack, handleNext, setActiveStep, controlButtons }}
                />
            </div>
        </div>
    );
}

/**
 * Props
 */
IconizeStepper.propTypes = {
  steps:          PropTypes.arrayOf(PropTypes.node),
  icons:          PropTypes.arrayOf(PropTypes.node),
  contents:       PropTypes.node,
  activeStep:     PropTypes.number,
  controlButtons: PropTypes.objectOf(PropTypes.elementType)
};

export default IconizeStepper;