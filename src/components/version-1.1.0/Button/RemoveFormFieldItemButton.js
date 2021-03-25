import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { useStateValue } from './../../../context/StateProvider';
import { actionTypes } from './../../../context/reducer';

function RemoveFormFieldItemButton(props) {
    const [state, dispatch] = useStateValue();

    const {
        currentForm,
        icon         = null,
        label        = 'Button',
        slice        = [],
        formListName = '',
    } = props;

    const [
        Icon,
        formList
    ] = [
        icon || DeleteForeverIcon,
        state?.[formListName]
    ];

    const handleClick = () => {
        const targetFormList         = formList.filter(list => list?.formID === currentForm)[0] ?? [];
        const formFields             = targetFormList?.fields ?? [];
        const [startSlice, endSlice] = slice;

        let [ spliceStart, spliceEnd ] = [null, null];

        formFields.forEach((formField, index) => {
            if (formField instanceof Array) {
                formField.forEach(field => {
                    if (field?.slice?.[0]) {
                        [spliceStart, spliceEnd] = field.slice;
                    }
                });
            }
            else if (formField?.slice?.[0]) {
                [spliceStart, spliceEnd] = formField.slice;
            }
            else {
                if (formField?.type === (formField?.slice?.[0] ?? startSlice)) {
                    spliceStart = index;
                }

                if (formField?.type === (formField?.slice?.[1] ?? endSlice)) {
                    spliceEnd = index;
                }
            }
        });

        // Get the splice start and end index if string is given
        if (typeof spliceStart === 'string') {
            formFields.forEach((formField, index) => {
                if (formField instanceof Array) {
                    formField.forEach(field => {
                        if (field?.type === spliceStart) {
                            spliceStart = index;
                        }
                        if (field?.type === spliceEnd) {
                            spliceEnd = index;
                        }
                    });
                }
                else {
                    if (formField?.type === spliceStart) {
                        spliceStart = index;
                    }
                    if (formField?.type === spliceEnd) {
                        spliceEnd = index;
                    }
                }
            });
        }

        // Remove the form field item
        if (spliceStart !== null && spliceEnd !== null) {
            let spliceForm;
            const newFormFieldsList = [];
            const spliceFormFields  = [];
            
            // spliceFormFields.splice(spliceStart, spliceEnd - spliceStart);
            // console.log(formFields, spliceFormFields);

            formList.forEach(list => {
                if (list?.formID === currentForm) {
                    formFields.forEach((field, index) => {
                        if (index < spliceStart) {
                            spliceFormFields.push(field);
                        }
                        else if (index > spliceEnd) {
                            spliceFormFields.push(field);
                        }
                    });
                    console.log(spliceStart, spliceEnd, spliceFormFields);

                    spliceForm = {
                        ...targetFormList,
                        fields: spliceFormFields
                    };

                    newFormFieldsList.push(spliceForm);
                }
                else {
                    newFormFieldsList.push(list);
                }
            });

            dispatch({
                type: actionTypes.SET_EMPLOYEE_FORM_LIST,
                payload: {
                    [actionTypes.SET_EMPLOYEE_FORM_LIST]: newFormFieldsList,
                }
            });
        }
    };

    return (
        <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleClick}
            style={{ marginBottom: '-10px' }}
        >
            <Icon />
            {label}
        </Button>
    );
}

RemoveFormFieldItemButton.propTypes = {
    label: PropTypes.node,
};

export default RemoveFormFieldItemButton;