import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import StarBorder from '@material-ui/icons/StarBorder';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px 20px',
        display: 'flex',
        alignItems: 'stretch',
        flexFlow: 'column',
    },
    rootDrawerClose: {
        alignItems: 'center',
    },
    header: {
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        '& img': {
            width: '40px',
            height: '40px',
            marginRight: '10px',
            backgroundSize: 'cover',
        },
        '& h1': {
            color: '#555',
            fontWeight: 500,
            textTransform: 'uppercase',
            fontSize: '18px',
        }
    },
    headerDrawerClose: {
        '& img': {
            marginRight: 0
        },
    },
    hod: {
        margin: '0px 0px',
        fontSize: '18px',
    },
    list: {
        marginTop: '30px',
    },
    reset: {
        padding: 0,
        margin: 0,
    },
    listItemSize: {
        '& span': {
            fontSize: '14px',
            fontWeight: 300,
        }
    },
    accountCircle: {
        background: '#fff',
        color: '#ec407a',
        width: '40px',
        height: '40px',
        borderRadius: '100%',
        boxShadow: '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(233 30 99 / 40%)',
    },
    listItemFont: {
        fontFamily: '"system-ui", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    listItem: {
        marginBottom: '15px',
        '& .listItemIcon': {
            fontSize: '16px',
            fontWeight: 400,
            width: '30px',
            marginLeft: '10px',
        }
    },
    listItemDrawerClose: {
        '& .listItemIcon': {
        },
        '& div': {
            minWidth: '0px',
        }
    },
    listLink: {
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        marginTop: '35px',
        background: 'radial-gradient(#174d54, #005561)',
        padding: '10px',
        borderRadius: '3px',
        color: '#fff',
        fontWeight: 300,
        fontSize: '16px',
        '& svg': {
            display: 'flex',
            marginRight: '20px',
        }
    },
    listLinkDrawerClose: {
        '& svg': {
            marginRight: '0px',
        }
    }
}));

export default function SidebarList({ isMobileMenu = false }) {
    const classes = useStyles();
    const history = useHistory();
    const [{ 
        isDashboardDrawerActive: _isDashboardDrawerActive,
        isMobileMenuActive 
    }] = useStateValue();

    const isDashboardDrawerActive = isMobileMenu ? true : _isDashboardDrawerActive;

    const [open, setOpen] = React.useState({
        userList: false,
        humanResourceList: false,
    });

    const handleClick = list => () => {
        // console.log(open[list], list);
        setOpen({ ...open, [list]: !open[list] });
    };

    const navigateToRoute = route => () => {
        history.push(route);
    };

    const drawerToggleIcon = open['userList'] ? 
        <ArrowDropUpIcon /> : <ArrowDropDownIcon />;

    const toggleHumanResourceListIcon = open['humanResourceList'] ? 
        <ArrowDropUpIcon /> : <ArrowDropDownIcon />;

    return (
        <div className={clsx(classes.root, {
            [classes.rootDrawerClose]: !isDashboardDrawerActive
        })}>
            <a href="#" className={clsx(classes.header, {
                [classes.headerDrawerClose]: !isDashboardDrawerActive
            })}>
                <img src="/logo.svg" alt="logo" />
                {isDashboardDrawerActive &&  <h1>KingsooERP</h1>}
            </a>
            <h2 className={classes.hod}>
                {isDashboardDrawerActive ? 'Head Of Department' : 'HOD'}
            </h2>

            <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.list}
            >
                <ListItem 
                    button 
                    onClick={handleClick('userList')} 
                    className={clsx(classes.reset, classes.listItemSize, {
                        [classes.listItemDrawerClose]: !isDashboardDrawerActive
                    })}>
                    <ListItemIcon>
                        <img src="/avatar_user.png" alt="avatar" className={classes.accountCircle} />
                    </ListItemIcon>
                    <ListItemText primary={`${isDashboardDrawerActive ? 'Lawson Loctech' : ''}`} />

                    {drawerToggleIcon}
                </ListItem>
                <Collapse style={{ marginTop: '20px' }} in={open['userList']} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem 
                          button 
                          className={clsx(classes.reset, classes.listItemSize, classes.listItem, classes.listItemFont, {
                              [classes.listItemDrawerClose]: !isDashboardDrawerActive
                          })}
                        >
                            <ListItemIcon>
                                <div className="listItemIcon">MP</div>
                            </ListItemIcon>
                            <ListItemText primary={`${isDashboardDrawerActive ? 'My Profile' : ''}`} />
                        </ListItem>
                        <ListItem 
                          button 
                          className={clsx(classes.reset, classes.listItemSize, classes.listItem, classes.listItemFont, {
                              [classes.listItemDrawerClose]: !isDashboardDrawerActive
                          })}
                        >
                            <ListItemIcon>
                                <div className="listItemIcon">EP</div>
                            </ListItemIcon>
                            <ListItemText primary={`${isDashboardDrawerActive ? 'Edit Profile' : ''}`} />
                        </ListItem>
                        <ListItem 
                          button 
                          className={clsx(classes.reset, classes.listItemSize, classes.listItem, classes.listItemFont, {
                              [classes.listItemDrawerClose]: !isDashboardDrawerActive
                          })}
                        >
                            <ListItemIcon>
                                <div className="listItemIcon">S</div>
                            </ListItemIcon>
                            <ListItemText primary={`${isDashboardDrawerActive ? 'Settings' : ''}`} />
                        </ListItem>
                    </List>
                </Collapse>
            </List>

            <Link to="/human-resource/dashboard" className={clsx(classes.listLink, classes.listItemFont, {
                [classes.listLinkDrawerClose]: !isDashboardDrawerActive
            })}>
                <DashboardIcon />
                {isDashboardDrawerActive && 'Dashboard'}
            </Link>

            <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.list}
            >
                <ListItem 
                    button 
                    onClick={handleClick('humanResourceList')} 
                    className={clsx(classes.reset, classes.listItemSize, {
                        [classes.listItemDrawerClose]: !isDashboardDrawerActive
                    })}>
                    <ListItemIcon>
                        <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${isDashboardDrawerActive ? 'Human Resources' : ''}`} />

                    {toggleHumanResourceListIcon}
                </ListItem>

                <Collapse style={{ marginTop: '20px' }} in={open['humanResourceList']} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem 
                          button 
                          className={clsx(classes.reset, classes.listItemSize, classes.listItem, classes.listItemFont, {
                              [classes.listItemDrawerClose]: !isDashboardDrawerActive
                          })}
                          onClick={navigateToRoute('/human-resource/employees-management')}
                        >
                            <ListItemIcon>
                                <div style={{ marginLeft: 0 }} className="listItemIcon">EM</div>
                            </ListItemIcon>
                            <ListItemText primary={`${isDashboardDrawerActive ? 'Employees Management' : ''}`} />
                        </ListItem>
                    </List>
                </Collapse>
                
            </List>
        </div>
    );
}