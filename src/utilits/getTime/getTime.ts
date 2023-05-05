import { IGetTime, } from 'types';
import { parseDate } from 'utilits/ParseDate';
import { IParseDateReturn } from 'types';


export const getTime = ({lastNext , value, timeVariant}:IGetTime):IParseDateReturn => {
    let currentTime =  new Date();
    const plusMinusValue = lastNext === 'last' ? -1 * value : +value;


    switch(timeVariant){
    case 'seconds':
        currentTime = new Date(currentTime.setSeconds(currentTime.getSeconds() +  plusMinusValue));
        break
    case 'minutes':
        currentTime = new Date(currentTime.setMinutes(currentTime.getMinutes() +  plusMinusValue));
        break
    case 'hours':
        currentTime = new Date(currentTime.setHours(currentTime.getHours() +  plusMinusValue));
        break
    case 'days':
        currentTime = new Date(currentTime.setDate(currentTime.getDate() +  plusMinusValue));
        break
    case 'weeks':
        currentTime = new Date(currentTime.setDate(currentTime.getDate() +  plusMinusValue*7));
        break
    case 'months':
        currentTime = new Date(currentTime.setMonth(currentTime.getMonth() +  plusMinusValue));
        break
    case 'years':
        currentTime = new Date(currentTime.setFullYear(currentTime.getFullYear() +  plusMinusValue));
        break
    }
    const textTime = parseDate(currentTime)
    return textTime
}
