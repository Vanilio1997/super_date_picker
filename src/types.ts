export type commonUsedType = 'day' | 'week' | 'month' | 'year'

export type commonUsedTimeType = 'last'| 'next'

export interface dataInfo{
    id: commonUsedType
    value: string
}

export type timeVariantsType =  'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'

export interface IGetTime{
    lastNext: commonUsedTimeType
    value: number
    timeVariant: timeVariantsType
}

export interface IParseDateReturn {
    textDateValue: string
    millisecondsValue: number
}

export interface ITimeObj {
    timePass: number
    timeLeft: number
    range: string
    start: IParseDateReturn
    finish: IParseDateReturn
}

interface ITimeValues{
    fullValue: string;
    textDateValue: string
    milliSecondsValue: number
}

export interface IUsedDataRanges{
    text: string
    startDate: ITimeValues
    finishDate: ITimeValues
    range : number
}

export interface IChangeByRange{
    previousNext: 'previous' | 'next'
}


export interface IAllHoursCalendrarInfo {
    value: number
    textValue: string
    isCurrent: boolean
}