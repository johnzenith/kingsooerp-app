import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    marginBottom: '50px',
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
        justifyContent: 'left',
        alignItems: 'left',
    },
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'column',
    },
    '& > div:first-child svg:first-child': {
      background: 'linear-gradient(60deg, #26c6da, #00acc1)',
      boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 172 193 / 40%)',
    },
    '& > div:nth-child(2) svg:first-child': {
      background: 'linear-gradient(60deg, #ec407a, #d81b60)',
      boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(233 30 99 / 40%)',
    },
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  lastDashboardCardGrid: {
    marginTop: '30px',
  }
}));

export default function DashboardCard({ children }) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid className={classes.gridContainer} container justify="center" spacing={5}>
                    {children}
                </Grid>
            </Grid>
        </Grid>
    );
}