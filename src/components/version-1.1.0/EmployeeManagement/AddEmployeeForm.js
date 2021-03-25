import React, { memo } from 'react';

import IconizeStepper from './../Stepper/IconizeStepper';
import { useFormList } from './../Form/useFormList';
import { useStateValue } from './../../../context/StateProvider';

function AddEmployeeForm() {
    const [{ employeeFormList }] = useStateValue();

    const {
        steps,
        icons,
        forms: contents
    } = useFormList({
        formFieldsList: employeeFormList,
        gridContainer: {
            style: {
                marginBottom: '15px',
            }
        }
    });
    
    return (
        <IconizeStepper 
            {...{
                steps,
                icons,
                contents,
                title: 'Add New Employee',
            }}
        />
    );
}

export default memo(AddEmployeeForm);