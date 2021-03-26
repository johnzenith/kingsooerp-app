import React from 'react';
import './style.css';
import SendIcon from '@material-ui/icons/Send';

import FormTemplate from '../../Form/FormTemplate';
import MainButton from './../../Button/MainButton';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import GridContainer from './../../Grid/GridContainer';
import GridItem from './../../Grid/GridItem';
import { getRegisteredFormField } from '../../../../helpers/getRegisteredFormFields';
import FlexBoxGrow from '../../Flexbox/FlexBoxGrow';

const handleClick = event => {
    event.preventDefault();
};

export const financeReportsFormFieldList = [
    {
        formID    : 'addFinanceRequestJobRelated',
        formTitle : 'Add Finance Request',
        fields    : [
            [
                {
                    ...getRegisteredFormField.paymentStatus,
                },
                {
                    ...getRegisteredFormField.approvalStatus,
                },
                {
                    ...getRegisteredFormField.incomeCategory,
                },
            ],
            [
                {
                    ...getRegisteredFormField.dateOfBirth,
                    id: 'durationFrom',
                    name: 'durationFrom',
                    label: 'Duration From',
                    labelWidth: 100,
                    md: 6,
                    lg: 6,
                },
                {
                    ...getRegisteredFormField.dateOfBirth,
                    id: 'durationTo',
                    name: 'durationTo',
                    label: 'Duration To',
                    labelWidth: 90,
                    md: 6,
                    lg: 6,
                },
            ],
            [
                {
                    type: 'custom',
                    md: 12,
                    lg: 12,
                    content: props => (
                        <FlexBoxGrow 
                            style={{ marginTop: '10px' }}
                            items={[
                                <div>{''}</div>,

                                <MainButton
                                    icon={SendIcon}
                                    iconRight={true}
                                    iconStyle={{ fontSize: '15px', margin: '0px 0px 0px 5px' }}
                                    label="Submit"
                                    {...props}
                                    onClick={handleClick}
                                />,
                            ]}
                        />
                    )
                }
            ],
        ]
    }
];

function FinanceReports() {

    return (
        <div>
            <GridContainer margin="-25px 0px 0px 0px">
                <GridItem
                    md={12}
                    lg={12}
                >
                    <h2 style={{ padding: '0px 0px', fontSize: '20px' }}>
                        <ChromeReaderModeIcon
                            style={{ 
                                marginRight: '10px',
                                fontSize: '30px',
                                verticalAlign: 'bottom',
                            }}
                        />
                        Finance Reports
                    </h2>               
                </GridItem>
            </GridContainer>

            <GridContainer style={{ textAlign: 'center', marginBottom: '40px', }}>
                <GridItem md={3} lg={3}>
                    <div>
                        <MainButton
                            iconRight={true}
                            icon={false}
                            label="24 Hours"
                        />
                    </div>
                </GridItem>
                <GridItem md={3} lg={3}>
                    <div>
                        <MainButton
                            iconRight={true}
                            icon={false}
                            label="Last Week"
                        />
                    </div>
                </GridItem>
                <GridItem md={3} lg={3}>
                    <div>
                        <MainButton
                            iconRight={true}
                            icon={false}
                            label="Last Month"
                        />
                    </div>
                </GridItem>
                <GridItem md={3} lg={3}>
                    <div>
                        <MainButton
                            iconRight={true}
                            icon={false}
                            label="Last Quarter"
                        />
                    </div>
                </GridItem>
            </GridContainer>

            <div>
                <FormTemplate
                    title="Add Finance Request"
                    formFieldsList={financeReportsFormFieldList}
                    line={false}
                    header={false}
                />
            </div>

        </div>
    );
}

export default FinanceReports;