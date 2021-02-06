import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
import Header from '../header/Header';
import SidebarList from './SidebarList';
import DashboardContent from '../dashboard/DashboardContent';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => {
  const shiftWidth          = theme.spacing(7) + 1;
  const sm_shiftWidth       = theme.spacing(9) + 1;
  const appBarWidth         = `calc(100% - ${drawerWidth}px)`;
  const sm_appBarWidthShift = `calc(100% - ${sm_shiftWidth}px)`;

  return {
    root: {
      display: 'flex',
    },
    appBar: {
      width: appBarWidth,
      marginLeft: appBarWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        width: sm_appBarWidthShift,
        marginLeft: sm_appBarWidthShift,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
      },
    },
    appBarShift: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: appBarWidth,
      marginLeft: appBarWidth,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: shiftWidth,
      [theme.breakpoints.up('sm')]: {
        width: sm_shiftWidth,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: sm_appBarWidthShift,
        marginLeft: 0,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0px auto',
      },
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }
});

function ResponsiveDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [{ isDashboardDrawerActive }, dispatch] = useStateValue();

  const handleDrawerOpen = () => {
    dispatch({
      type: actionTypes.TOGGLE_DASHBOARD_DRAWER,
      payload: { isDashboardDrawerActive: true }
    });
  };

  const handleDrawerClose = () => {
    dispatch({
      type: actionTypes.TOGGLE_DASHBOARD_DRAWER,
      payload: { isDashboardDrawerActive: false }
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Header 
        position="fixed"
        headerClass={clsx(classes.appBar, {
          [classes.appBarShift]: isDashboardDrawerActive,
        })}
      />

      <Hidden smDown>
        <Drawer 
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isDashboardDrawerActive,
            [classes.drawerClose]: !isDashboardDrawerActive,
          })}
          variant="permanent"
          anchor="left"
          classes={{
            paper: clsx({
              [classes.drawerOpen]: isDashboardDrawerActive,
              [classes.drawerClose]: !isDashboardDrawerActive,
            }),
          }}
        >
          <SidebarList />
        </Drawer>
      </Hidden>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isDashboardDrawerActive,
        })}
      >
        <div className={classes.drawerHeader} />

        <DashboardContent />
      </main>
    </div>
  );
}

export default withWidth()(ResponsiveDrawer);