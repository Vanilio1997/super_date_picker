import React from 'react';
import s from './NumberInput.module.css';
import { INumberInputProps } from './types';

export const NumberInput = ({onChange}:INumberInputProps) => {

    function handelInput(e:any){
        onChange(e.target.value)
    }

    return (
        <>
            <input type="number" min={0}  onChange={(e) => handelInput(e)}/>
        </>
    )
}
