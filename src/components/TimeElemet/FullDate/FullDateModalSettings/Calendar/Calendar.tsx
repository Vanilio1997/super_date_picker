import React, {useEffect, useState,useRef} from 'react';
import s from './Calendar.module.css';
import { ICalendarProps,ICalendarTimeInfo, ICallsInfo,IPickMonth,IPickYear } from './types';
import { setMonth,setWeekDay,getDayInMonth,dayOfTheWeek, getAllCallsDays,currentsYears,monthOfTheYear,allHours} from 'utilits/setTextDateCalendar';
import SvgElement from 'components/SvgElement';
import { parseDate } from 'utilits/ParseDate';
import { IAllHoursCalendrarInfo } from 'types';


export const Calendar = ({timeInfo,setCalendarDate,closeModal,startFinish}:ICalendarProps) => {

    const {fullValue,milliSecondsValue,textDateValue} = timeInfo;
    const date = new Date(milliSecondsValue);
    const [calendarDateInfo, setCalendarDateInfo] = useState<ICalendarTimeInfo>({
        currentYear: date.getFullYear(),
        currentDay: date.getDate(),
        currentMonth: date.getMonth(),
        currentHour: date.getHours(),
        currentWeekDay: date.getDay()
    })
    const [isYearChangeModal, setIsYearChangeModal] = useState<boolean>(false);
    const [isMonthChangeModal, setIsMonthChangeModal] = useState<boolean>(false);

    const currentTextDate = parseDate(new Date(calendarDateInfo.currentYear, calendarDateInfo.currentMonth, calendarDateInfo.currentDay , calendarDateInfo.currentHour));
    const [callsDate , setCallsDate] = useState<any>([]);
    const currentMonthName = setMonth(calendarDateInfo.currentMonth);
    const allHoursInfo = allHours(calendarDateInfo.currentHour);

    function nextMonth(){
        if(calendarDateInfo.currentMonth === 11){
            setCalendarDateInfo({
                ...calendarDateInfo,
                currentMonth: 0 ,
                currentYear: calendarDateInfo.currentYear + 1
            })
        } else {
            setCalendarDateInfo({...calendarDateInfo,currentMonth: calendarDateInfo.currentMonth + 1 })
        }
    }

    function prevMonth(){
        if(calendarDateInfo.currentMonth === 0){
            setCalendarDateInfo({
                ...calendarDateInfo,
                currentMonth: 11 ,
                currentYear: calendarDateInfo.currentYear - 1
            })
        } else {
            setCalendarDateInfo({...calendarDateInfo,currentMonth: calendarDateInfo.currentMonth - 1 })
        }
    }


    function chooseDate(){
        setCalendarDate(startFinish ,currentTextDate.millisecondsValue)
        closeModal()
    }
    function changeYear(year:number){
        setCalendarDateInfo({...calendarDateInfo, currentYear: year});
        setIsYearChangeModal(false)
    }

    function changeMonth(month:number){
        setCalendarDateInfo({...calendarDateInfo, currentMonth: month});
        setIsMonthChangeModal(false)
    }

    function changeDay({day,month,year,currentMonth}:ICallsInfo){
        if(currentMonth){
            setCalendarDateInfo({...calendarDateInfo, currentDay: day});
        } else {
            setCalendarDateInfo({...calendarDateInfo,currentMonth:month, currentYear:year, currentDay: day});
        }
    }


    const PickYear = ({currentYear, changeYear}:IPickYear) =>{
        const ourYearsArr = currentsYears(currentYear);

        return (
            <div className={s.yearsContainer}>
                {
                    ourYearsArr.map((year,index) => (
                        <div className={year === calendarDateInfo.currentYear ? s.activeElement : s.nonActiveElement} key={index} onClick={()=> changeYear(year)}>{year}</div>
                    ))
                }
            </div>
        )
    }

    const PickMonth = ({changeMonth,currentMonth}: IPickMonth) => {
        return (
            <div className={s.monthContainer}>
                {
                    monthOfTheYear.map((month , index) =>(
                        <div className={index === calendarDateInfo.currentMonth ? s.activeElement : s.nonActiveElement} key={index} onClick={()=> changeMonth(index)}>{month}</div>
                    ))
                }
            </div>
        )
    }


    function changeHour(hour:number){
        setCalendarDateInfo({...calendarDateInfo, currentHour:hour})
    }


    useEffect(()=>{
        setCallsDate(() => getAllCallsDays(calendarDateInfo.currentYear , calendarDateInfo.currentMonth))
    }, [calendarDateInfo.currentYear, calendarDateInfo.currentMonth])



    return (
        <div>
            {   !isYearChangeModal &&!isMonthChangeModal &&
                <div className={s.dataPickerContainer}>
                    <div>
                        <div className={s.CalendarHeader}>
                            <div>
                                <button onClick={prevMonth} className={s.btn}><SvgElement color="#000" id="leftArrow" fillRule="evenodd" /></button>
                            </div>
                            <div className={s.headerDate}>
                                <div className={s.currentMonth} onClick={()=>setIsMonthChangeModal(true)}>{currentMonthName}</div>
                                <div className={s.currentYear} onClick={()=>setIsYearChangeModal(true)}>{calendarDateInfo.currentYear}</div>
                            </div>
                            <div>
                                <button onClick={nextMonth}  className={s.btn}><SvgElement color="#000" id="rightArrow" fillRule="evenodd" /></button>
                            </div>
                        </div>
                        <div className={s.calendarContainer}>
                            {
                                dayOfTheWeek.map((day,index) => <div key={index}> {day}</div>)
                            }
                            {
                                callsDate.length ?
                                    callsDate?.map((date:ICallsInfo)=> (
                                        <div onClick={() => changeDay(date)} className={`${s.calendarDay} ${date.currentMonth ? s.currentMonth : null} ${date.day === calendarDateInfo.currentDay && date.currentMonth? s.activeElement: null}`}> {date.day}</div>
                                    )) :
                                    null
                            }
                        </div>
                    </div>
                    <div className={s.hoursPickContainer}>
                        <div className={s.hoursWrapper}>
                            <ul className={s.hoursPickList}>
                                {
                                    allHoursInfo.map((hourInfo,index) =>(
                                        <li className={s.dataPickerItem}   onClick={()=> changeHour(hourInfo.value)} key={index}>
                                            {hourInfo.textValue}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            }
            {isYearChangeModal && <PickYear currentYear={calendarDateInfo.currentYear} changeYear={changeYear}/>}
            {isMonthChangeModal && <PickMonth changeMonth={changeMonth} currentMonth={calendarDateInfo.currentMonth} />}
            <div className={s.timeFinalContainer}>
                <div className={s.startFinishInformation}>{startFinish} date</div>
                <div className={s.timeText}>{currentTextDate.textDateValue}</div>
            </div>
            <div className={s.setBtnContainer}>
                <button className={s.setBtn} onClick={() => chooseDate()}>Set Data</button>
            </div>
        </div>
    )
}
