import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { useFormList } from './useFormList';
import { useStyles } from './../Stepper/IconizeStepper';
import StepperTitle from './../Stepper/StepperTitle';

/**
 * @see useFormList
 * 
 * @param {object} props 
 */
function FormTemplate({ formFieldsList, title = 'New Form', header = true, line = true, description = null }) {
    const classes = useStyles();

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
            <div className={classes.root}>
                <div style={{ marginTop: '-30px', width: '100%' }}>
                    <div 
                        key={`form_content_${index}`}
                        className={clsx(elemClass, classes.stepContentWrapper, classes.formContent)}
                    >
                        {header && <StepperTitle 
                            {...{
                                title,
                                description
                            }}
                        />}

                        {line && <Divider 
                            style={{ 
                                background: '#99999987', 
                                margin: '30px 0px 30px 0px'
                            }}
                        />}

                        {Form}
                    </div>
                </div>
            </div>
        )
    });
}

FormTemplate.propTypes = {
    formFieldsList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FormTemplate;