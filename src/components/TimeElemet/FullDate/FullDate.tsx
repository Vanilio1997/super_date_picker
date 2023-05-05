import React from 'react';
import { IFullDateProps } from './types';
import s from './FullDate.module.css'
import {useState} from 'react'
import { FullDateModalSettings } from './FullDateModalSettings';

export const FullDate = ({firstDate, secondDate, isDisabled,setNowDate ,setCalendarDate}: IFullDateProps)=> {
    const [isShowModal ,setIsShowModal] = useState<boolean>(false)
    const [startFinishValue, setStartFinishValue] = useState<'start' | 'finish'>('start')
    function openCloseModal(startFinish: 'start' | 'finish'){
        setIsShowModal(!isShowModal)
        setStartFinishValue(startFinish)
    }

    function closeModal(){
        setIsShowModal(false)
    }
    return (
        <div className={s.container}>
            <div>
                <button className={s.btn} onClick={() => openCloseModal('start')} disabled={isDisabled}> ~ {firstDate.textDateValue}</button>
                →
                <button className={s.btn}  onClick={() => openCloseModal('finish')} disabled={isDisabled} >{secondDate.textDateValue} </button>
            </div>
            {
                isShowModal
                    ?
                    <FullDateModalSettings  startFinish={startFinishValue} closeModal={closeModal} setCalendarDate={setCalendarDate}  timeInfo={startFinishValue === 'start' ? firstDate : secondDate }  mode='Now'  setNowValue={() => setNowDate(startFinishValue)} />
                    :
                    null
            }
        </div>
    )
}
