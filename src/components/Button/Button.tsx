import React from 'react'
import { IButtonProps } from './types'
import s from './Button.module.css'
import SvgElement from 'components/SvgElement'

export const Button = ({text}:IButtonProps) => {
    return (
        <button className={s.btn}>
            {text}
        </button>
    )
}
