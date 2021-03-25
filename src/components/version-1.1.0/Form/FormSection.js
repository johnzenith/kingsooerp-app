import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

function FormSection(props) {
    const { 
        title, 
        style, 
        line = false, 
        divider = {}
    } = props;

    const defaultStyle = {
        margin: '15px 0px -10px 0px',
    };

    const dividerDefaultStyle = { background: '#99999987' };

    return (
        <>
            {line && <Divider style={{ ...dividerDefaultStyle, ...divider }} />}
            <div style={style || defaultStyle}>
                {title}
            </div>
        </>
    );
};

FormSection.propTypes = {
    title: PropTypes.node.isRequired,
};

export default FormSection;