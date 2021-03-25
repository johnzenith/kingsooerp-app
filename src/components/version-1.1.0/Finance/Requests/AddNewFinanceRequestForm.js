import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import StepperTitle from './../../Stepper/StepperTitle';
import AddFinanceRequestForJobRelatedForm from './JobRelatedForm';
import AddFinanceRequestForNonJobRelatedForm from './NonJobRelatedForm';

function AddNewFinanceRequestForm() {
    const [requestType, setRequestType] = useState('');

    const classes = makeStyles(() => ({
        makeFormHidden: {
            display: 'none',
        },
        formWrapper: {

        }
    }))();

    const isJobRelatedForm    = /^job.*/gi.test(requestType);
    const isNonJobRelatedForm = /^non.*/gi.test(requestType);

    return (
        <div>
            <StepperTitle 
                {...{
                    title: 'Add Request Form',
                    description: requestType,
                }}
            />

            <div className={clsx( classes.formWrapper, {
            [classes.makeFormHidden]: !isJobRelatedForm
            })}>
                <AddFinanceRequestForJobRelatedForm />
            </div>

            <div className={clsx( classes.formWrapper, {
            [classes.makeFormHidden]: !isNonJobRelatedForm
            })}>
                <AddFinanceRequestForNonJobRelatedForm />
            </div>
        </div>
    );
}

export default AddNewFinanceRequestForm;