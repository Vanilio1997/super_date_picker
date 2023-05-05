import React ,{useEffect, useState} from 'react';
import s from './TimeElement.module.css'
import SvgElement from 'components/SvgElement';
import FullDate from './FullDate';
import ShowDateElement from './ShowDateElement';
import { ITimeValues ,ITimeElement,IChangeTimeValue} from './types';
import TimeSettingsModal from './TimeSettingsModal';
import {commonUsed} from 'utilits/setTimes';
import { getTime } from 'utilits/getTime';
import { parseDate } from 'utilits/ParseDate';
import { commonUsedType ,commonUsedTimeType, IGetTime,IUsedDataRanges,IChangeByRange } from 'types';
import { log } from 'console';


export const TimeElement = ({isDisabled}:ITimeElement) => {
    const [text, setText] = useState<string>('Last 30 minutes');
    const [range, setRange] = useState<number>(1);
    const [startDate , setStartDate ]  = useState<ITimeValues>({
        fullValue: '30 minutes ago',
        textDateValue: '',
        milliSecondsValue: 0
    });
    const [finishDate , setFinishDate]  = useState<ITimeValues>({
        fullValue: 'now',
        textDateValue: '',
        milliSecondsValue: 0
    });
    const [usedDataRanges, setUsedDataRanges]= useState<IUsedDataRanges[]  | null>(null);
    const [isShowFullDate, SetIsShowFullDate] = useState(false);
    const [isOpenTimeSettingsModal, setIsOpenTimeSettingsModal] = useState<boolean>(false);

    function changeDateVision(){
        SetIsShowFullDate(!isShowFullDate);
    }


    function changeTimeValue({finishTime,startTime,text, range}:IChangeTimeValue){
        setStartDate({fullValue: startTime.fullValue, textDateValue:startTime.textDateValue,milliSecondsValue: startTime.milliSecondsValue});
        setFinishDate({fullValue: finishTime.fullValue, textDateValue:finishTime.textDateValue, milliSecondsValue: finishTime.milliSecondsValue});
        setText(text);
        SetIsShowFullDate(false)
        setRange(range)
        usedDataRanges ? setUsedDataRanges([...usedDataRanges , {
            startDate: {fullValue: startTime.fullValue, textDateValue:startDate.textDateValue,milliSecondsValue: startDate.milliSecondsValue},
            finishDate:{fullValue: finishTime.fullValue, textDateValue:finishDate.textDateValue, milliSecondsValue: finishDate.milliSecondsValue},
            range:range,
            text: text
        }]) :  setUsedDataRanges(
            [
                {
                    startDate: {fullValue: startTime.fullValue, textDateValue:startTime.textDateValue,milliSecondsValue: startTime.milliSecondsValue},
                    finishDate:{fullValue: finishTime.fullValue, textDateValue:finishTime.textDateValue, milliSecondsValue: finishTime.milliSecondsValue},
                    range:range,
                    text: text
                }
            ]
        )
    }


    function changeCommonUsed(currentPast:commonUsedTimeType, id:commonUsedType , value: string){
        const timeInfo = commonUsed(id, currentPast);
        const{finish,range,start,timeLeft,timePass} = timeInfo
        changeTimeValue(
            {
                startTime: {fullValue: `${timePass} ${range} ago`, textDateValue: start.textDateValue, milliSecondsValue: start.millisecondsValue},
                finishTime:{ fullValue: currentPast ==='next' ?` in ${timeLeft} ${range}`: 'now', textDateValue:finish.textDateValue, milliSecondsValue:finish.millisecondsValue},
                text: value,
                range: finish.millisecondsValue - start.millisecondsValue
            }
        )
        setIsOpenTimeSettingsModal(!isOpenTimeSettingsModal)
        SetIsShowFullDate(false);
    }

    function setNowValue(finishStart: 'start' | 'finish'){
        const dateInfo = parseDate(new Date());
        const nowInfoObj = {fullValue: 'now', textDateValue:dateInfo.textDateValue, milliSecondsValue:dateInfo.millisecondsValue};
        const startTime = finishStart === 'start' ? nowInfoObj: startDate;
        const finishTime  = finishStart === 'finish' ?  nowInfoObj : finishDate;
        const newRange  = finishTime.milliSecondsValue - startTime.milliSecondsValue;

        changeTimeValue({
            finishTime: finishTime,
            startTime: startTime,
            text: `${startTime.fullValue} to ${finishTime.fullValue}`,
            range: newRange
        })
        SetIsShowFullDate(true)
    }

    function setCalendarValue(finishStart: 'start' | 'finish', value: number){
        const dateInfo = parseDate(new Date(value));
        const nowInfoObj = {fullValue: dateInfo.textDateValue, textDateValue:dateInfo.textDateValue, milliSecondsValue:dateInfo.millisecondsValue};
        const startTime = finishStart === 'start' ? nowInfoObj: startDate;
        const finishTime  = finishStart === 'finish' ?  nowInfoObj : finishDate;
        const newRange  = finishTime.milliSecondsValue - startTime.milliSecondsValue;
        changeTimeValue({
            finishTime: finishTime,
            startTime: startTime,
            text: `${startTime.fullValue} to ${finishTime.fullValue}`,
            range: newRange
        })
    }


    function setHandleValue({lastNext,timeVariant,value}:IGetTime){
        const timeInfo = getTime({lastNext,timeVariant,value})
        const date = parseDate(new Date())
        if(lastNext ==='next'){
            changeTimeValue(
                {
                    startTime:{fullValue: 'now', textDateValue: date.textDateValue ,milliSecondsValue: +date.millisecondsValue },
                    finishTime:{ fullValue: ` in ${value} ${timeVariant}` , textDateValue: timeInfo.textDateValue ,milliSecondsValue: timeInfo.millisecondsValue } ,
                    text: `${lastNext} ${value} ${timeVariant}`,
                    range: timeInfo.millisecondsValue - +date.millisecondsValue
                }
            );
        }else if(lastNext ==='last'){
            changeTimeValue(
                {
                    startTime:{fullValue: `${value} ${timeVariant} ago`, textDateValue: timeInfo.textDateValue , milliSecondsValue: timeInfo.millisecondsValue},
                    finishTime:{ fullValue: 'now' , textDateValue: date.textDateValue, milliSecondsValue: +date.millisecondsValue } ,
                    text: `${lastNext} ${value} ${timeVariant}`,
                    range: +date.millisecondsValue - timeInfo.millisecondsValue
                }
            );
        }
        setIsOpenTimeSettingsModal(!isOpenTimeSettingsModal);
    }

    function changeByRange({previousNext}:IChangeByRange){
        const multiplierRange = previousNext === 'previous' ? range * -1 : range;
        const newStartValue = parseDate(new Date(startDate.milliSecondsValue  + multiplierRange));
        const newFinishValue = parseDate(new Date(finishDate.milliSecondsValue + multiplierRange));
        const newStartTime:ITimeValues  = Object.assign({
            fullValue: newStartValue.textDateValue,
            textDateValue: newStartValue.textDateValue,
            milliSecondsValue: newStartValue.millisecondsValue
        });
        const newFinishTime:ITimeValues = Object.assign({
            fullValue: newFinishValue.textDateValue,
            textDateValue: newFinishValue.textDateValue,
            milliSecondsValue: newFinishValue.millisecondsValue
        });
        const newText = `${newStartTime.fullValue} to ${newFinishTime.fullValue}`
        changeTimeValue({finishTime:newFinishTime, startTime:newStartTime, text:newText ,range: range})
        SetIsShowFullDate(true);
    }


    function showCloseChangeTimeModal(){
        setIsOpenTimeSettingsModal(!isOpenTimeSettingsModal);
    }

    useEffect(()=>{
        setHandleValue({lastNext:'last', timeVariant:'minutes', value:30});
        setIsOpenTimeSettingsModal(false);
    },[])
    return (
        <>
            <div className={s.dateContainer}>
                <button className={s.btn} disabled={isDisabled} onClick={showCloseChangeTimeModal}>
                    <SvgElement color="#005c9b" fillRule="evenodd" id="calendar" />
                    <SvgElement color="#005c9b" fillRule="evenodd" id="arrow" />
                </button>
                {
                    isShowFullDate ?
                        <FullDate setNowDate={setNowValue} firstDate={startDate} isDisabled={isDisabled} setCalendarDate={setCalendarValue} secondDate={finishDate} />
                        :
                        <ShowDateElement isDisbled={isDisabled} onChange={changeDateVision} text={text} />
                }

            </div>
            {
                isOpenTimeSettingsModal ?
                    <TimeSettingsModal changeByRange={changeByRange} usedDataRanges={usedDataRanges} setCommonUsed={changeCommonUsed} getTime={setHandleValue}/>
                    :
                    null
            }
        </>
    )
}
