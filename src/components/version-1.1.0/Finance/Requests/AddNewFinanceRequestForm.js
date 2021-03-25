import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import StepperTitle from './../../Stepper/StepperTitle';
import AddFinanceRequestForJobRelatedForm from './AddFinanceRequestForJobRelatedForm';
import AddFinanceRequestForNonJobRelatedForm from './AddFinanceRequestForNonJobRelatedForm';
import GridContainer from './../../Grid/GridContainer';
import GridItem from './../../Grid/GridItem';
import SelectInput from './../../Input/SelectInput';

function AddNewFinanceRequestForm() {
    const [requestType, setRequestType] = useState('');

    const classes = makeStyles(() => ({
        formHeader: {
            marginTop: '10px',
            padding: '20px 20px 0px 20px',
        },
        makeFormHidden: {
            display: 'none',
        },
        formWrapper: {
            paddingTop: '20px',
        },
        contentShadow: {
            background: '#fff',
            padding: '30px 0px 30px 0px',
            boxShadow: '0px 5px 5px #ddd',
        },
    }))();

    const isJobRelatedForm    = /^job.*/gi.test(requestType);
    const isNonJobRelatedForm = /^non.*/gi.test(requestType);

    const handleChangeEvent = () => event => {
        setRequestType(event.target.value);
    };

    return (
        <div>
            <div className={classes.formHeader}>
                <div className={clsx(classes.contentShadow)}>
                    <StepperTitle 
                        title='Add Request Form'
                        description={requestType?.length ? requestType : null}
                        style={{
                            marginBottom: '40px',
                        }}
                    />

                    <GridContainer>
                        <GridItem
                            md={12}
                            lg={12}
                        >
                            <SelectInput
                                id="financeRequestType"
                                name="financeRequestType"
                                label="Select Request Type *"
                                labelWidth={160}
                                value={requestType}
                                currentForm="financeRequestForm"
                                items={[
                                    { value: 'Job Related' },
                                    { value: 'Non Job Related' },
                                ]}
                                handleChange={handleChangeEvent}
                                formValues={{
                                    financeRequestType: requestType,
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    
                    {requestType?.length > 0 && <Divider 
                        style={{ 
                            background: '#99999987', 
                            margin: '20px 0px 30px 0px'
                        }}
                    />}
                </div>
            </div>

            <div style={{ marginTop: '-100px' }}>
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
        </div>
    );
}

export default AddNewFinanceRequestForm;