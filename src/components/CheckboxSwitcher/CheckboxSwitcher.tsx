import React, {useState} from 'react'
import s from './CheckboxSwitcher.module.css'
import SvgElement from 'components/SvgElement'
import { ICheckboxSwitcherProps } from './types'


export const CheckboxSwitcher = ({label,onClick, startChecked}:ICheckboxSwitcherProps) => {
    const [value ,setValue] = useState(startChecked)

    function changeCheckboxValue(isChecked: boolean){
        setValue(isChecked)
        onClick(isChecked)
    }

    return (
        <>
            <label className={s.switch}>
                <input type="checkbox" checked={value} onChange={(e) => changeCheckboxValue(e.target.checked)}/>
                <span className={`${s.slider} ${s.round}`}></span>
            </label>
            <span>{label}</span>
        </>
    )
}
