import { getTime } from 'utilits/getTime';
import { parseDate } from 'utilits/ParseDate';
import { ITimeObj } from 'types';

type commonUsedType = 'day' | 'week' | 'month' | 'year'

function daysInMonth (month:number, year:number):number {
    return new Date(year, month, 0).getDate();
}

const date = new Date();
const dateObj = {
    year: date.getFullYear(),
    month: date.getMonth(),
    weekDay: date.getDay(),
    day: date.getDate(),
}

const {day,month,weekDay,year} = dateObj

export const commonUsed = (value: commonUsedType, nextLast: 'next'| 'last'):ITimeObj => {
    const date = new Date();
    const currentYear  = date.getFullYear();
    const currentMonth  = date.getMonth();
    const timeObj:ITimeObj = {
        timePass: 0 , timeLeft:0, range: '' , start: {millisecondsValue: 0, textDateValue: '' } , finish: {millisecondsValue:0, textDateValue: ''}
    };
    switch(value){
    case 'day' :
    {
        const ourDate = new Date(year , month , day);
        const ourNextDate = new Date(year , month , day + 1);
        timeObj.timePass = date.getHours();
        timeObj.timeLeft = 24 - date.getHours();
        timeObj.range = 'hours';
        timeObj.start = nextLast === 'last' ?  parseDate(new Date(year, month, day - 1)) : parseDate(ourDate);
        timeObj.finish =  nextLast === 'last' ? parseDate(new Date(+ourDate - 1)) : parseDate(new Date(+ourNextDate - 1));

        break
    }
    case 'week':
    {
        const ourDate = new Date(year , month , day+6 - weekDay);
        timeObj.timePass = date.getDay();
        timeObj.timeLeft = 7 - date.getDay();
        timeObj.range = 'days';
        timeObj.start = parseDate(new Date(year , month , day - weekDay));
        timeObj.finish = nextLast === 'last' ? parseDate(new Date()) :parseDate(new Date(+ourDate -1));
        break
    }
    case 'month':{
        const ourDate = new Date(year , month + 1);
        const currentMonthDays = daysInMonth(currentYear , currentMonth);
        timeObj.timePass = date.getDate();
        timeObj.timeLeft = currentMonthDays - date.getDate();
        timeObj.range = 'days';
        timeObj.start = parseDate(new Date(year , month))
        timeObj.finish = nextLast === 'last' ? parseDate(new Date()) :parseDate(new Date(+ourDate -1));
        break
    }
    case 'year':
    {
        const ourDate = new Date(year +1,0);
        timeObj.timePass = date.getMonth();
        timeObj.timeLeft = 12 - date.getMonth();
        timeObj.range = 'months';
        timeObj.start = parseDate(new Date(year, 0))
        timeObj.finish = nextLast === 'last' ? parseDate(new Date()) :parseDate(new Date(+ourDate -1));
        break
    }
    }
    return timeObj
}

