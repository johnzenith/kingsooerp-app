import React from 'react';
import AddEmployeeForms from './AddEmployeeForms';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Switch, Route } from 'react-router-dom';
import { Button, Divider } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';

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
  formWrapper: {
    padding: '0px',
  }
}));

export default function AddEmployee() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <div className={classes.description}>Add Employee</div>
            </Paper>
            
            <AddEmployeeForms />
        </div>
    );
}
