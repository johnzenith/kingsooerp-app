import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
  },
  description: {
    marginTop: '-40px',
    padding: '15px',
    fontWeight: 500,
    fontSize: '16px',
    color: '#fff',
    borderRadius: '3px 3px 0px 0px',
    background: 'linear-gradient(60deg, #61979e, #6ca4aa)',
    boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(66 148 157 / 40%)',
  },
  titleArrow: {
    fontSize: '22px',
    minWidth: '28px',
    verticalAlign: 'top',
  }
}));

function StepperTitle({ title, steps, activeStep }) {
    const classes         = useStyles();
    const stepDescription = steps?.[ activeStep ];

    return (
        <Paper className={classes.paper} elevation={3}>
            <div className={classes.description}>
                {title} 
                {typeof stepDescription === 'string' && 
                    <>
                        <ChevronRightIcon className={classes.titleArrow} />
                        {stepDescription}
                    </>
                }
            </div>
        </Paper>
    );
}

StepperTitle.propTypes = {
    title:      PropTypes.node.isRequired,
    steps:      PropTypes.arrayOf(PropTypes.node),
    activeStep: PropTypes.number,
};

export default StepperTitle;