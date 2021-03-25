import React, { useState, useMemo } from 'react';
import GridItem from './../Grid/GridItem';
import GridContainer from './../Grid/GridContainer';

import RenderFormInput from './RenderFormInput';

/**
 * Form field list worker.
 * Helps to parse and build the form fields using the passed {@see formFieldsList}
 * 
 * @param {Array}  formFieldsList Specifies the form fields list to use in building the form
 * @param {object} gridContainer  Specifies the grid container props {@see GridContainer}
 * @param {object} gridItem       Specifies the grid item props {@see GridIem}
 * 
 * @returns {Object} object
 *  - forms: Array (node[]) of form elements
 *  - steps: Array (string[]) of form steps
 */
export const useFormList = ({ formFieldsList, gridContainer = {}, gridItem = {} }) => {
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const formTitles = formFieldsList.map(formFieldList => formFieldList.formTitle ?? '');
    const stepIcons  = formFieldsList.map(formFieldList => formFieldList.stepIcon  ?? '');

    const handleChange = (currentForm, fieldName) => event => {
        const value      = event.target.value;
        const formTarget = formValues?.[currentForm] || {};
        
        // setFormStateUpdated(false);

        console.log(value);

        setFormValues({
            ...formValues,
            [currentForm]: {
                ...formTarget,
                [fieldName]: value,
            }
        });

        // Note: we are passing the current input value as last parameter
        // because setState() is asynchronous and gives us the previous value when 
        // accessed within this handler
        //
        // Note: by calling this handler, this will auto validate the form fields
        // validateFormFields({
        //     currentForm,
        //     name:       fieldName,
        //     values:     formValues,
        //     errors:     formError[currentForm] || {},
        //     fieldValue: value,
        // });
    };

    const setFormValuesManually = (currentForm, fieldName, value) => {
        const formTarget = formValues?.[currentForm] || {};

        setFormValues({
            ...formValues,
            [currentForm]: {
                ...formTarget,
                [fieldName]: value,
            }
        });
    };

    const getFormInputProps = (currentForm, props) => ({
        ...props,
        formValues: formValues?.[currentForm] || {},
        formErrors,
        currentForm,
        handleChange,
        setFormErrors,
        setFormValues,
        setFormValuesManually
    });

    const getGridItemProps = props => ({
        xs: props?.xs,
        sm: props?.sm,
        md: props?.md,
        lg: props?.lg,
    });
    
    const forms = formFieldsList.map( formFieldList => {
        const { formID: currentForm } = formFieldList;
        
        return (
            <form 
                id={currentForm} 
                key={currentForm}
                action={formFieldList?.action   || ''} 
                method={formFieldList?.method   || 'post'} 
                encType={formFieldList?.encType || ''} 
            >

                {formFieldList?.fields instanceof Array && formFieldList.fields.map((field, index) => {
                    const gridContainerKey = `gridContainer_${currentForm}_${index}`;

                    return (
                        field instanceof Array ? 
                        
                            (<GridContainer 
                                key={gridContainerKey}
                                spacing={gridContainer?.spacing}
                                style={gridContainer?.style}
                            >
                                {field.map((props, index) => (
                                    <GridItem 
                                        key={`gridItem_${currentForm}_${props?.name || index}`}
                                        {...getGridItemProps(props)}
                                    >
                                        <RenderFormInput 
                                            key={`input_${currentForm}_${props?.name || index}`}
                                            {...getFormInputProps(currentForm, props)}
                                        />
                                    </GridItem>
                                ))}                                    
                            </GridContainer>)

                            :

                            (<GridContainer 
                                key={gridContainerKey}
                                spacing={field?.gridContainer?.spacing || gridContainer?.spacing}
                                style={field?.gridContainer?.style || gridContainer?.style}
                                padding={field?.padding}
                                margin={field?.margin}
                            >
                                <GridItem 
                                    key={`gridItem_${currentForm}_${field?.name || index}`}
                                    {...getGridItemProps(field)}
                                >
                                    <RenderFormInput 
                                        key={`input_${currentForm}_${field?.name || index}`}
                                        {...getFormInputProps(currentForm, field)} 
                                    />
                                </GridItem>
                            </GridContainer>)
                    );

                })}

            </form>
        );
    });

    return {
        forms: useMemo(() => forms, [forms]),
        steps: formTitles,
        icons: stepIcons,
    };
}