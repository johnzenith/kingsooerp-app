import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: 'none',
//   },
// }));

function MainButton(props) {
    // const classes = useStyles();
    const { 
        label = 'Button',
        icon = null ,
        iconRight = false,
        iconStyle = {},
    } = props;

    const Icon = icon || AddIcon;

    const renderIcon = Icon && <Icon 
        style={{
            fontSize: '20px',
            position: 'relative',
            top: '-2px',
            marginRight: '2px',
            ...iconStyle,
        }}
    />;

    return (
        <Button 
            type="button"
            variant="contained" 
            color="primary"
            {...props}
        >
            {!iconRight && renderIcon}
            {label}
            {iconRight && renderIcon}
        </Button>
    );
}

MainButton.propTypes = {
    icon:  PropTypes.elementType,
    label: PropTypes.node,  
};

export default MainButton;