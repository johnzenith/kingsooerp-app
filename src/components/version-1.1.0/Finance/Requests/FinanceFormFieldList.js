import React from 'react';


/**
 * Add New Employee Form Fields
 */
export const EmployeeFormFieldsList = [
    /**
     * Personal Data Form
     */
    {
        formID    : 'addFinanceRequestNonJobRelated',
        stepIcon  : <PersonIcon />,
        formTitle : 'Personal Data',
        fields    : [
            [
                { // Last Name
                    ...getRegisteredFormField.lastName
                },
                { // First Name
                    ...getRegisteredFormField.firstName,
                },
                { // Other Name
                    ...getRegisteredFormField.otherName
                },
            ],
    }
];