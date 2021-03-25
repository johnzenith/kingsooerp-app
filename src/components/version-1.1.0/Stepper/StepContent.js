import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

function StepContent({ activeStep, steps, contents }) {
  const classes = makeStyles(() => ({
    formContent: { 
      padding: '0px',
    },
    makeFormHidden: {
      display: 'none',
    },
  }))();
  
  return contents.map((Content, index) => {
    const elemClass = `stepper__content stepper__content__${index}`;
    return (
      <div 
        key={`step_content_${index}`}
        className={clsx(elemClass, classes.formContent, {
          [classes.makeFormHidden]: index !== activeStep
        })}>
        {Content ?? ''}
      </div>
    )
  });
}

/**
 * Props
 */
StepContent.propTypes = {
  steps:      PropTypes.arrayOf(PropTypes.node),
  contents:   PropTypes.node,
  activeStep: PropTypes.number,
};

export default StepContent;