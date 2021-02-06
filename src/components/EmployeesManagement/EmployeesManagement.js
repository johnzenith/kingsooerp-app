import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
import DashboardCard from '../dashboard/DashboardCard';
import DashboardCardItem from '../dashboard/DashboardCardItem';
import AddEmployee from './AddEmployee';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Button, Divider } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';

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
  summaryText: {
    marginTop: '-40px',
    padding: '15px',
    fontWeight: 300,
    color: '#fff',
    borderRadius: '3px 3px 0px 0px',
    background: 'linear-gradient(60deg, #61979e, #6ca4aa)',
    boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(66 148 157 / 40%)',
  },
  addEmployeeBtnWrapper: {
    margin: '30px 0px 20px 0px',
    padding: '10px 15px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  addEmployeeBtn: {
    padding: '10px 30px',
    color: '#fff',
    fontSize: '13px',
    background: '#42949d',
    boxShadow: '0 2px 2px 0 rgb(66 148 157 / 14%), 0 3px 1px -2px rgb(66 148 157 / 20%), 0 1px 5px 0 rgb(66 148 157 / 12%)',
    transition: 'all 300ms',
    '&:hover': {
        background: '#42949d',
        boxShadow: '0 14px 26px -12px rgb(66 148 157 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(66 148 157 / 20%)',
    }
  },
  card: {
    padding: '0px 20px',
  },
  employeeAlertWrapper: {
    marginTop: '-40px',
    marginBottom: '70px',
    wordBreak: 'break-word',
    '& strong': {
        textTransform: 'capitalize',
    }
  }
}));

export const employeeCardItems = [
    {
        cardIcon: <PeopleAltIcon />,
        label: 'Total Employees',
        value: 0,
        docField: 'totalEmployees',
        collectionId: 'employees',
    },
];

export default function EmployeesManagement() {
    const classes   = useStyles();
    const history   = useHistory();
    const routePath = '/human-resource/employees-management';
    const [state, dispatch] = useStateValue();

    const { currentForm, formData, formResponse, employeeAlert } = state;
    
    const handleNewFormScreen = () => {
        const formType = 'addEmployee';
        
        history.push(`${routePath}/add`);
        
        if (currentForm !== formType) {
            dispatch({
            type: actionTypes.SET_CURRENT_FORM,
            payload: { currentForm: formType }
            });
        }

        // Clear form errors
        dispatch({
            type: actionTypes.SET_FORM_ERROR,
            payload: {
                formError: {}
            }
        });
    };

    const RenderEmployeesManagementCard = () => {
        const cards = employeeCardItems.map((cardItem, index) => {
            return (
                <DashboardCardItem 
                    key={`dashboard_card_${index}`} 
                    {...cardItem}
                />
            );
        });

        const RenderDashboardCard = () => (
            <DashboardCard children={cards} />
        );

        return <RenderDashboardCard />;
    };

    const handleEmployeeAlertVisibility = visible => {
        dispatch({
            type: actionTypes.SET_EMPLOYEE_ALERT_VISIBILITY,
            payload: {
                employeeAlert: visible,
            }
        });
    };

    const RenderEmployeeActionAlert = () => {
        const response    = formResponse?.[currentForm] || {};

        const severity    = response.severity || 'error';
        const title       = response.title    || ('success' !== severity ? 'Error' : 'Successful');
        const responseMsg = response.message  || false;

        if (!responseMsg) return <></>;

        return (
            <div className={classes.employeeAlertWrapper}>
                <Collapse in={employeeAlert}>
                    <Alert 
                    severity={severity}
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            handleEmployeeAlertVisibility(false)
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    >
                        <h4 style={{ margin: '0px 0px 5px 0' }}>{title}</h4>
                        {responseMsg}
                    </Alert>
                </Collapse>
            </div>
        );
    };

    const RenderEmployeesManagement = () => (
        <div className={classes.root}>
            <RenderEmployeeActionAlert />
            <Paper className={classes.paper} elevation={3}>
                <div className={classes.summaryText}>
                    Employees Summary
                </div>
                <div className={classes.addEmployeeBtnWrapper}>
                    <Button 
                        onClick={handleNewFormScreen}
                        className={classes.addEmployeeBtn}
                    >
                        Add Employee 
                        <GroupAddIcon style={{ marginLeft: '10px' }} />
                    </Button>
                </div>

                <Divider style={{ marginBottom: '40px' }} />

                <div className={classes.card}>
                    <RenderEmployeesManagementCard />
                </div>
            </Paper>
        </div>
    );

    return (
        <Switch>
            <Route exact path={`${routePath}/add`} component={AddEmployee} />
            <Route exact path={`${routePath}`} component={RenderEmployeesManagement} />
            <Route 
                path={`${routePath}`} 
                redirect={() => <Redirect to={`${routePath}`} />}
            />
        </Switch>
    );
}
