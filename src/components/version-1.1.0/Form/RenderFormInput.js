import React, { useEffect } from 'react';
import './FormInputStateStyles.css';

import TextInput from './../Input/TextInput';
import SelectInput from './../Input/SelectInput';
import DateInput from '../Input/DateInput';
import FormSection from './FormSection';
import RemoveFormFieldItemButton from './../Button/RemoveFormFieldItemButton';

function RenderFormInput(props) {
    let FormInput = false;

    const { 
        id,
        name: fieldName = false,
        defaultValue = null,
        formValues,
        currentForm,
        setFormValuesManually,
    } = props;

    const name = fieldName  || id;
    const type = props.type || 'text';

    /**
     * The @see slice{*} specifier is used to select part of the form list
     */
    const isSlicingFormList = /^slice.*/gi;

    if ( !isSlicingFormList.test(type) ) {
        // Use the specified form input type
        switch (type.toLowerCase()) {
            case 'select':
                FormInput = SelectInput;
                break;
            
            case 'date':
                FormInput = DateInput;
                break;

            case 'section':
            case 'formsection':
                FormInput = FormSection;
                break;

            case 'custom': 
                FormInput = props?.content || '';
                break;
        
            default:
                FormInput = TextInput;
                break;
        }
    }

    // Trigger input change event for readonly fields
    useEffect(() => {
        if (defaultValue && formValues?.[name] !== defaultValue) {
            // const elem = document.getElementById(id);
            // elem.value = defaultValue;
            setFormValuesManually(currentForm, name, defaultValue);
        }
    });

    if (!FormInput) {
        if (/.*(isRemovable)$/gi.test(type)) {
            FormInput = RemoveFormFieldItemButton;
        } else {
            return <>{''}</>;
        }
    }

    return <FormInput {...props} />;
}

export default RenderFormInput;
