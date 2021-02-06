import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
import SidebarList from '../sidebar/SidebarList';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBarBackground: {
    background: 'radial-gradient(#174d54, #005561)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: 300,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  titleText: {
    fontSize: '17px',
    fontWeight: 300,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  chevronButton: {
    background: '#fff',
    color: '#999',
    width: '40px',
    minWidth: '40px',
    height: '40px',
    padding: '0px',
    borderRadius: '100%',
    marginRight: '50px',
    '&:hover': {
      background: '#fff'
    }
  },
  headerMenuList: {
    marginTop: '49px',
    marginLeft: '4px',
    maxWidth: '300px !important',
    minWidth: '150px',
    '& div': {
      width: '150px',
    },
    '& li': {
      padding: '8px 15px',
      fontSize: '13px',
      color: '#777',
      '&:hover': {
        background: '#42949d',
        color: '#fff',
        boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(66 148 157 / 40%)',
      }
    }
  },
  drawer: {
    width: '260px'
  },
  drawerPaper: {
    width: '260px',
  },
}));

function Header({ headerClass = {}, position = 'relative' }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [{ isDashboardDrawerActive, isMobileMenuActive }, dispatch] = useStateValue();

  const isMenuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    dispatch({
      type: actionTypes.TOGGLE_DASHBOARD_DRAWER,
      payload: { isDashboardDrawerActive: !isDashboardDrawerActive }
    });
  };

  const handleMobileMenuOpen = (event) => {
    dispatch({
      type: actionTypes.TOGGLE_MOBILE_MENU,
      payload: { isMobileMenuActive: !isMobileMenuActive }
    });
  };

  const menuId = 'primary-search-account-menu';
  const RenderMenu = () => (
    <Paper className={classes.headerMenuPaper}>
      <ClickAwayListener onClickAway={handleClose}>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={isMenuOpen}
          onClose={handleClose}
          TransitionComponent={Fade}
          className={classes.headerMenuList}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Log out</MenuItem>
        </Menu>
      </ClickAwayListener>
    </Paper>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Hidden lgUp>
      <SwipeableDrawer 
        className={classes.drawer}
        anchor="right"
        open={isMobileMenuActive}
        onClose={handleMobileMenuOpen}
        onOpen={handleMobileMenuOpen}
        classes={{ paper: classes.drawerPaper }}
      >
        <SidebarList isMobileMenu={true} />
      </SwipeableDrawer>
    </Hidden>
  );

  const ChevronIcon = isDashboardDrawerActive ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <div className={classes.grow}>
      <AppBar 
        className={`${headerClass} ${classes.appBarBackground}`}
        position={position}
      >
        <Toolbar>
          <Typography className={classes.title} noWrap>
            <Hidden smDown>
              <IconButton 
                onClick={handleDrawerOpen}
                aria-label="toggle-sidebar" 
                className={classes.chevronButton}
              >
                <ChevronIcon style={{ fontSize: '32px' }} /> 
              </IconButton>
            </Hidden>
            <span className={classes.titleText}>Dashboard</span>
          </Typography>
          
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge color="secondary">
                <DashboardIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="" color="inherit">
              <Badge color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <RenderMenu />
    </div>
  );
}

export default withWidth()(Header);