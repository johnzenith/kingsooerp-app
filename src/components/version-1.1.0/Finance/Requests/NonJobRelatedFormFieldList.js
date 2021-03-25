import React from 'react';

import { getRegisteredFormField } from '../../../../helpers/getRegisteredFormFields';
import FlexBoxGrow from '../Flexbox/FlexBoxGrow';
import MainButton from '../../Button/MainButton';
import UploadButton from '../../Button/UploadButton';

/**
 * Add Finance Request form - non job related
 */
export const NonJobRelatedFormFieldList = [
    {
        formID    : 'addFinanceRequestNonJobRelated',
        formTitle : 'Add Finance Request | Non - Job Related',
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
                    labelWidth: 100,
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
                    labelWidth: 80,
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