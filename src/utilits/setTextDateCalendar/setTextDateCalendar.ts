import { ICallsInfo } from 'components/TimeElemet/FullDate/FullDateModalSettings/Calendar/types';
import { IAllHoursCalendrarInfo } from 'types';

export const  dayOfTheWeek = ['MO','TU','WE','TH','FR','SA','SU'];
export const monthOfTheYear =  ['January','February','March','April','May','June','July',
    'August','September','October','November','December'];


const sundayWeekToMondayWeekDayMap: Record<number, number> = {
    0: 6,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
};
export const setMonth = (month:number):string => {
    return monthOfTheYear[month];
}

export const setWeekDay = (day:number):string => {
    return day === 0 ? 'MO' : dayOfTheWeek[day];
}


export const getDayInMonth = (year:number, month:number) => {
    const nextMonthDate = new Date(year, month + 1, 1);
    nextMonthDate.setMinutes(-1);
    return nextMonthDate.getDate();
}

export const getPrevMonthDays = (year:number, month:number) => {
    const currentMontDays = new Date(year, month,1);
    const currentWeekDay = currentMontDays.getDay();
    const prevMonthCellsAmount = sundayWeekToMondayWeekDayMap[currentWeekDay];
    const daysInPrevMonth = getDayInMonth(year , month - 1);
    const [cellYear, cellMonth] = month === 0 ? [year - 1, 11] : [year, month - 1];
    const dateCalls:ICallsInfo[] = [];
    for(let i = prevMonthCellsAmount - 1 ; i >= 0 ; i--){
        dateCalls.push({
            year:cellYear,
            month:cellMonth,
            day: daysInPrevMonth - i,
            currentMonth:false
        })
    }

    return dateCalls;
}


export const getCurrentMonthDays = (year:number , month:number) => {
    const currentMonthCells = getDayInMonth(year, month);
    const dateCalls: ICallsInfo[]  = [];
    for(let i = 1 ; i <= currentMonthCells ; i++){
        dateCalls.push({
            year:year,
            month:month,
            day: i,
            currentMonth:true
        })
    }
    return dateCalls;
}

export const getNextMonthDays = (year:number, month:number) => {
    const nextMonthFirstDay = new Date(year, month + 1,1);
    let nextMonthFirstWeekDay = nextMonthFirstDay.getDay();
    const [cellYear, cellMonth] = month === 11 ? [year +1, 0] : [year, month + 1];
    const dateCalls:ICallsInfo[]= [];

    nextMonthFirstWeekDay = 7 - sundayWeekToMondayWeekDayMap[nextMonthFirstWeekDay]

    if(nextMonthFirstWeekDay !== 7){
        for (let i = 1 ; i <= nextMonthFirstWeekDay;i++){
            dateCalls.push({
                year:cellYear,
                month:cellMonth,
                day: i,
                currentMonth:false
            })
        }
    }
    return dateCalls;
}


export const getAllCallsDays = (year:number, month:number) => {
    const prevMonthDays = getPrevMonthDays(year, month);
    const currentMonthDays = getCurrentMonthDays(year, month);
    const nextMonthDays = getNextMonthDays(year, month);
    return [...prevMonthDays,...currentMonthDays,...nextMonthDays];
}


export const currentsYears = (currentYear:number) => {
    const startYear = currentYear - 7;
    const yearsArr = [];
    for(let i = startYear; i < startYear + 15; i++){
        yearsArr.push(i);
    }

    return yearsArr;
}

export const allHours = (currentNumber: number): IAllHoursCalendrarInfo[] =>{
    const hours: IAllHoursCalendrarInfo[] = [];
    for(let i = 0; i<24; i++){
        const isCurrent = currentNumber === i ? true : false;
        const textValue = i < 10 ? `0${i}:00` : `${i}:00`;
        hours.push({isCurrent:isCurrent, textValue: textValue, value:i});
    }

    return hours
}
