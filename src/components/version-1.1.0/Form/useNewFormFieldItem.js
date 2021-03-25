import React from 'react';
import { useStateValue } from '../../../context/StateProvider';

export function useNewFormFieldItem(props) {
    const [{ employeeFormList }, dispatch] = useStateValue();

    const {
        slice = ['', ''], // Specifies how to slice the form list
    } = props;

    const [startSlice, endSlice] = slice;

    console.log(props);
}