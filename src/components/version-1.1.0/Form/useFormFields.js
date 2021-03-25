import { useMemo } from 'react';
import { useFormClassName } from './useFormClassName';

export const useFormFields = (formValues, currentForm) => {  
    const fieldValues    = formValues?.[currentForm] || {};
    const listFormFields = useMemo(() => ({}), []);

    // Get all the form fields
    const formClassName        = useFormClassName(currentForm);
    const registeredFormFields = document.querySelectorAll(`
        .${formClassName} [data-form-input=${true}] input
    `);

    const getFieldValue = field => (
        typeof fieldValues[field] === 'undefined' ? '' : fieldValues[field]
    );

    // Auto get the form fields
    Object.keys(formValues?.[currentForm]).forEach(field => {
        Object.assign(listFormFields, {[field]: getFieldValue(field)});
    });

    // Auto setup all form fields
    registeredFormFields.forEach(field => {
        // Field Name is used when Field ID is not available
        const formFieldName = field?.id || field?.name;
        if (formFieldName) {
            const fieldValue = field?.value || getFieldValue(formFieldName);
            Object.assign(listFormFields, {[formFieldName]: fieldValue})
        }
    });

  return useMemo(() => listFormFields, [listFormFields]);
};