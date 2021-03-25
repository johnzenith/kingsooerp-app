import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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
                    ...getRegisteredFormField.financeRequestClient,
                    md: 6,
                    lg: 6,
                },
                {
                    ...getRegisteredFormField.text,
                    md: 6,
                    lg: 6,
                    id: 'financeRequestPurchaseOrderNumberJobRelated',
                    name: 'financeRequestPurchaseOrderNumberJobRelated',
                    label: 'Purchase Order Number *',
                    labelWidth: 180,
                    validate: {
                        required: true,
                    }
                },
            ],
            [
                {
                    ...getRegisteredFormField.financeRequestBuyingHouseOrOEM,
                    md: 6,
                    lg: 6,
                },
                {
                    ...getRegisteredFormField.text,
                    md: 6,
                    lg: 6,
                    id: 'financeRequestBillOfLadenOrMAWB',
                    name: 'financeRequestBillOfLadenOrMAWB',
                    label: 'Bill Of Laden / MAWB *',
                    labelWidth: 140,
                },
            ],
            [
                {
                    ...getRegisteredFormField.financeRequestExpenseType,
                    md: 6,
                    lg: 6,
                    id: 'financeRequestExpenseTypeJobRelated',
                    name: 'financeRequestExpenseTypeJobRelated',
                },
                {
                    ...getRegisteredFormField.financeRequestDepartment,
                    md: 6,
                    lg: 6,
                    id: 'financeRequestDepartmentJobRelated',
                    name: 'financeRequestDepartmentJobRelated',
                },
            ],
            [
                {
                    ...getRegisteredFormField.amountText,
                    md: 4,
                    lg: 4,
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
                    md: 4,
                    lg: 4,
                    id: 'financeRequestPaymentRateJobRelated',
                    name: 'financeRequestPaymentRateJobRelated',
                },
                {
                    ...getRegisteredFormField.number,
                    md: 4,
                    lg: 4,
                    id: 'financeRequestQuantityJobRelated',
                    name: 'financeRequestQuanityJobRelated',
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
                    id: 'financeRequestDescriptionJobRelated',
                    name: 'financeRequestDescriptionJobRelated',
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
                            style={{ marginTop: '10px' }}
                            items={[
                                <UploadButton 
                                    name="financeProformaInvoiceJobRelated"
                                    id="financeProformaInvoiceJobRelated"
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