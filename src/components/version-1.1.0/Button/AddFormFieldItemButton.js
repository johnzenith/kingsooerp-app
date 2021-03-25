import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { useStateValue } from './../../../context/StateProvider';
import { actionTypes } from './../../../context/reducer';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: 'none',
//   },
// }));

function AddFormFieldItemButton(props) {
    const [state, dispatch] = useStateValue();

    const {
        currentForm,
        icon         = null,
        label        = 'Button',
        slice        = [],
        isHidden     = false,
        removeLabel  = 'Remove',
        formListName = '',
    } = props;

    const [
        Icon,
        formList
    ] = [
        icon || AddIcon,
        state?.[formListName]
    ];

    const handleClick = () => {
        const targetFormList         = formList.filter(list => list?.formID === currentForm)[0] ?? [];
        const formFields             = targetFormList?.fields ?? [];
        const [startSlice, endSlice] = slice;

        let [ spliceStart, spliceEnd, newFormItem ] = [-1, -1, []];

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

        newFormItem = formFields.filter((formField, index) => index > spliceStart && index < spliceEnd);

        // Get the last character in a string
        const getLastCharInStr = str => str?.[ (str.length ?? 0) - 1 ];

        // Remove last character from string
        const getStrWithoutLastChar = str => str.substr(0, (str.length ?? 0) -1 );
        
        /**
         * Update the form field $name and $id
         */
        const updateFieldPropsHelper = props => {
            let   [newId, newName] = ['', ''];
            const {id, name}       = props;

            const [
                idLastChar,
                nameLastChar,
            ] = [ 
                getLastCharInStr(id),
                getLastCharInStr(name),
            ];

            if (isNaN(+idLastChar)) {
                newId = `${id}_2`;
            } else {
                newId = `${getStrWithoutLastChar(id)}${+idLastChar + 1}`;
            }

            if (isNaN(+nameLastChar)) {
                newName = `${name}_2`;
            } else {
                newName = `${getStrWithoutLastChar(name)}${+nameLastChar + 1}`;
            }

            return {
                ...props,
                id:   newId,
                name: newName
            };
        };

        // Add the new form item if found
        let updateFormItemProps;
        if (newFormItem.length) {
            updateFormItemProps = newFormItem.map(item => {
                if (item instanceof Array) {
                    return item.map(field => {
                        return updateFieldPropsHelper(field);
                    });
                }

                return updateFieldPropsHelper(item);
            });
        }
        
        // Now we need to update the form button slicing position, $startSlice and $endSlice
        // This enables the new item to be added correctly
        if (updateFormItemProps?.length) {
            let lastFormItemID;
            const lastFormItem = updateFormItemProps[ updateFormItemProps.length - 1 ];
            
            if (lastFormItem instanceof Array) {
                lastFormItemID = lastFormItem?.[ lastFormItem?.length - 1 ]?.id;
            } else {
                lastFormItemID = lastFormItem?.id;
            }

            // Set the slice positions
            const slicePositions = [ `slice${lastFormItemID}Starts_isRemovable`, `slice${lastFormItemID}Ends`];
            const [newSliceStartIndex, newSliceEndIndex] = slicePositions;
            
            // Add the slice prop to the form fields
            const addSlicePropToNewFormItems = updateFormItemProps.map(item => {
                if (item instanceof Array) {
                    return item.map(field => ({
                        ...field,
                        slice: slicePositions,
                    }));
                }

                return {
                    ...item,
                    slice: slicePositions,
                };
            });

            const newFormFieldItemsToAdd = {
                sliceStarts: {
                    formListName,
                    md: 12,
                    lg: 12,
                    type:  newSliceStartIndex,
                    label: removeLabel,
                },
                items:      [...addSlicePropToNewFormItems],
                sliceEnds:  { type: newSliceEndIndex },
            };

            // Add the new form item just after the $spliceEnd position
            const mergeFormFields = [];
            formFields.forEach((formField, index) => {
                /**
                 * Only allow the { @see Add-Certifiction } to be added when on the last form item
                 */
                let targetFormField = formField instanceof Array ? formField?.[0] : formField;

                if (targetFormField?.actionButton === true) {
                    mergeFormFields.push({
                        ...targetFormField,
                        isLastButton: false,
                    });
                } else {
                    mergeFormFields.push(formField);
                }

                // console.log(mergeFormFields);
                
                if (index === spliceEnd) {
                    // console.log(newFormFieldItemsToAdd.sliceStarts, newFormFieldItemsToAdd.sliceEnds);
                    mergeFormFields.push(newFormFieldItemsToAdd.sliceStarts);
                    mergeFormFields.push(...newFormFieldItemsToAdd.items);
                    mergeFormFields.push(newFormFieldItemsToAdd.sliceEnds);
                }
            });

            if (mergeFormFields.length) {
                const newFormFieldsList = [];
                formList.forEach(list => {
                    if (list?.formID === currentForm) {
                        const _list  = list;
                        _list.fields = mergeFormFields;

                        newFormFieldsList.push(_list);
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
        }
    };

    const makeButtonHidden = isHidden ? { display:  'none' } : {};

    return (
        <Button 
            variant="contained" 
            color="primary"
            onClick={handleClick}
            style={makeButtonHidden}
        >
            {Icon && <Icon 
                style={{
                    fontSize: '20px',
                    position: 'relative',
                    top: '-2px',
                    marginRight: '2px',
                }}
            />}
            {label}
        </Button>
    );
}

AddFormFieldItemButton.propTypes = {
    icon:  PropTypes.elementType,
    label: PropTypes.node,
};

export default AddFormFieldItemButton;