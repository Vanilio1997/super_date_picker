import React from 'react';
import s from './ShowDateElement.module.css';
import { IShowDateElementProps } from './types';

export const ShowDateElement = ({onChange, text, isDisbled}:IShowDateElementProps) => {
    return (
        <button className={s.btn} disabled={isDisbled} onClick={onChange}>
            <div>{text}</div>
            <div className={s.showDates}>Show dates</div>
        </button>
    )
}
