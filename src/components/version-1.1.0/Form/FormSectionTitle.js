import React from 'react';
import PropTypes from 'prop-types';

function FormSectionTitle({ title, padding = '0px 20px' }) {
    return (
        <span 
            style={{
                padding,
                fontWeight: 600,
                fontFamily: 'system-ui',
            }}
        >
            {title}
        </span>
    );
}

FormSectionTitle.propTypes = {
    title: PropTypes.node.isRequired,
};

export default FormSectionTitle;