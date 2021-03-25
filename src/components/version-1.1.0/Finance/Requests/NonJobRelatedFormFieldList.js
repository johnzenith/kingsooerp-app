import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { getRegisteredFormField } from '../../../../helpers/getRegisteredFormFields';
import FlexBoxGrow from '../../Flexbox/FlexBoxGrow';
import MainButton from '../../Button/MainButton';
import UploadButton from '../../Button/UploadButton';

/**
 * Add Finance Request form - non job related
 */
export const NonJobRelatedFormFieldList = [
    {
        formID    : 'addFinanceRequestNonJobRelated',
        formTitle : 'Add Finance Request',
        fields    : [
            [
                {
                    ...getRegisteredFormField.text,
                    md: 4,
                    lg: 4,
                    id: 'financeRequestInvoiceNonJobRelated',
                    name: 'financeRequestInvoiceNonJobRelated',
                    label: 'Invoice Number *',
                    labelWidth: 120,
                },
                {
                    ...getRegisteredFormField.financeRequestExpenseType,
                    md: 4,
                    lg: 4,
                    id: 'financeRequestExpenseTypeNonJobRelated',
                    name: 'financeRequestExpenseTypeNonJobRelated',
                },
                {
                    ...getRegisteredFormField.financeRequestDepartment,
                    md: 4,
                    lg: 4,
                    id: 'financeRequestDepartmentNonJobRelated',
                    name: 'financeRequestDepartmentNonJobRelated',
                },
            ],
            [
                {
                    ...getRegisteredFormField.amountText,
                    md: 4,
                    lg: 4,
                    id: 'financeRequestPaymentValueNonJobRelated',
                    name: 'financeRequestPaymentValueNonJobRelated',
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
                    md: 4,
                    lg: 4,
                    id: 'financeRequestPaymentRateNonJobRelated',
                    name: 'financeRequestPaymentRateNonJobRelated',
                },
                {
                    ...getRegisteredFormField.number,
                    md: 4,
                    lg: 4,
                    id: 'financeRequestQuantityNonJobRelated',
                    name: 'financeRequestQuantityNonJobRelated',
                    label: 'Quantity *',
                    labelWidth: 80,
                    validate: {
                        required: true,
                    }
                },
            ],
            [
                {
                    ...getRegisteredFormField.descriptionText,
                    md: 12,
                    lg: 12,
                    id: 'financeRequestDescriptionNonJobRelated',
                    name: 'financeRequestDescriptionNonJobRelated',
                    label: 'Description *',
                    labelWidth: 100,
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
                                    name="financeProformaInvoiceNonJobRelated"
                                    id="financeProformaInvoiceNonJobRelated"
                                    label="Upload Proforma Invoice"
                                    {...props}
                                />,

                                <MainButton
                                    icon={ArrowForwardIosIcon}
                                    iconRight={true}
                                    iconStyle={{ fontSize: '15px', margin: '0px 0px 0px 5px' }}
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