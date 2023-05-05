import React, { useEffect } from 'react'
import s from './RelativeChanger.module.css'
import Select from 'components/Select'
import NumberInput from 'components/NumberInput'
import { selectRelativeChanger } from './constants'
import { useState } from 'react'
import { IGetTime } from 'types'
import { getTime } from 'utilits/getTime'
import { ICalendarProps } from '../Calendar/types'
import { parseDate } from 'utilits/ParseDate'

export const RelativeChanger = ({closeModal,setCalendarDate,startFinish,timeInfo}:ICalendarProps) => {

    const [handleSelect, setHandleSelect] = useState<IGetTime>({value: 0, lastNext:'last',timeVariant:'seconds'});
    const currentTDateInformation = parseDate(new Date(getTime({value:handleSelect.value, lastNext: handleSelect.lastNext, timeVariant:handleSelect.timeVariant}).millisecondsValue))
    function handlerSelect(e:any){
        const textInfo = e.target.value.split(',')
        setHandleSelect({...handleSelect, lastNext:textInfo[1],timeVariant:textInfo[0]})
    }
    const [dateInfo ,setDateInfo] = useState<any>(timeInfo)

    function handlerInput(value:number){
        setHandleSelect({...handleSelect, value: value})
    }


    function chooseDate(){
        setCalendarDate(startFinish,dateInfo.millisecondsValue)
        closeModal()
    }
    useEffect(()=>{
        const currentTextInfo = getTime({
            lastNext:handleSelect.lastNext,
            timeVariant:handleSelect.timeVariant,
            value:handleSelect.value
        })
        setDateInfo(parseDate(new Date(currentTextInfo.millisecondsValue)))
    },[handleSelect.lastNext, handleSelect.timeVariant, handleSelect.value])

    return (
        <div>
            <div className={s.changingTimeElementsContainer}>
                <NumberInput onChange={handlerInput} />
                <select onChange={(e)=>handlerSelect(e)}>
                    {
                        selectRelativeChanger.map((optionElementInfo,index) =>(
                            <option value={[optionElementInfo.timeVariantType, optionElementInfo.lastNext]} key={index}>{optionElementInfo.textValue}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <div className={s.timeFinalContainer}>
                    <div className={s.startFinishInformation}>{startFinish} date</div>
                    <div className={s.timeText}>{dateInfo.textDateValue}</div>
                </div>
                <div className={s.setBtnContainer}>
                    <button className={s.setBtn} onClick={() => chooseDate()}>Set Data</button>
                </div>
            </div>
        </div>
    )
}
