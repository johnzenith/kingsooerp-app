import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { useFormList } from './useFormList';

/**
 * @see useFormList
 * 
 * @param {object} props 
 */
function FormTemplate({ formFieldsList, title = 'New Form' }) {
    const classes = makeStyles(() => ({
        formContent: { 
            padding: '0px',
        },
    }))();

    const {
        forms
    } = useFormList({
        formFieldsList,
        gridContainer: {
            style: {
                marginBottom: '15px',
            }
        }
    });

    return forms.map((Form, index) => {
        const elemClass = `form__content form__content__${index}`;
        return (
            <div 
                key={`form_content_${index}`}
                className={clsx(elemClass, classes.formContent)}>
                {Form}
            </div>
        )
    });
}

FormTemplate.propTypes = {
    formFieldsList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FormTemplate;