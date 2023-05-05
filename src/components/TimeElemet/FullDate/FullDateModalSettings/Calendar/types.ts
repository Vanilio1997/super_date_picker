import { ITimeValues } from 'components/TimeElemet/types';

export interface ICalendarProps{
    timeInfo: ITimeValues
    setCalendarDate: (finishStart: 'start' | 'finish', value: number) => void
    closeModal: () => void
    startFinish: 'start'| 'finish'
}

export interface ICalendarTimeInfo {
    currentYear: number
    currentMonth: number
    currentDay: number
    currentHour: number
    currentWeekDay: number
}

export interface ICallsInfo{
    day: number
    year:number
    month: number
    currentMonth: boolean
}

export interface IPickYear{
    currentYear:number
    changeYear: (year:number) => void
}

export interface IPickMonth{
    currentMonth:number
    changeMonth: (month:number) => void
}