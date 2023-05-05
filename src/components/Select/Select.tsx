import React from 'react';
import { ISelect } from './types';
import s from './Select.module.css';
import { ISelectRelativeChanger } from 'components/TimeElemet/FullDate/FullDateModalSettings/RelativeChanger/types';

export const Select = <T extends string | number>({data,onChange}: ISelect<T>) => {

    function handleChange(value: string | number){
        onChange(value)
    }

    return (
        <select className={s.slct} onChange={(e) => handleChange(e.target.value)}>
            {
                data.map((value, index)  => (
                    <option key={index}>
                        {value}
                    </option>
                ))
            }
        </select>
    )
}
