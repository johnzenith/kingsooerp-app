import React from 'react';

import { getRegisteredFormField } from '../../../../helpers/getRegisteredFormFields';
import FlexBoxGrow from '../../Flexbox/FlexBoxGrow';
import MainButton from '../../Button/MainButton';
import UploadButton from '../../Button/UploadButton';

/**
 * Add Finance Request form - job related
 */
export const JobRelatedFormFieldList = [
    {
        formID    : 'addFinanceRequestJobRelated',
        formTitle : 'Add Finance Request',
        fields    : [
            [
                {
                    ...getRegisteredFormField.financeRequestDepartment,
                    md: 6,
                    lg: 6,
                },
                {
                    ...getRegisteredFormField.financeRequestExpenseType,
                    md: 6,
                    lg: 6,
                },
            ],
            [
                {
                    ...getRegisteredFormField.text,
                    md: 6,
                    lg: 6,
                    id: 'financeRequestInvoice',
                    name: 'financeRequestInvoice',
                    label: 'Invoice Number *',
                    labelWidth: 120,
                    validate: {
                        required: true,
                        minlength: 4,
                        maxlength: 10,
                    }
                },
                {
                    ...getRegisteredFormField.number,
                    md: 6,
                    lg: 6,
                    id: 'financeRequestQuantity',
                    name: 'financeRequestQuanity',
                    label: 'Quantity *',
                    labelWidth: 80,
                    validate: {
                        required: true,
                        minlength: 4,
                        maxlength: 10,
                    }
                },
            ],
            [
                {
                    ...getRegisteredFormField.amountText,
                    md: 6,
                    lg: 6,
                    id: 'financeRequestPaymentValue',
                    name: 'financeRequestPaymentValue',
                    label: 'Payment Value *',
                    labelWidth: 120,
                    validate: {
                        minlength: 1,
                        maxlength: 20,
                        required: true,
                    }
                },
                {
                    ...getRegisteredFormField.financeRequestPaymentRate,
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
                            items={[
                                <UploadButton 
                                    name="financeProofOfInvoice"
                                    id="financeProofOfInvoice"
                                    label="Upload Proforma Invoice"
                                    {...props}
                                />,

                                <MainButton
                                    label="Submit"
                                    {...props}
                                />,
                            ]}
                        />
                    )
                }
            ],
        ]
    }
];