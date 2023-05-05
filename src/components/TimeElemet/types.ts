export interface ITimeElement{
    isDisabled: boolean
}

export interface ITimeValues{
    fullValue: string;
    textDateValue: string
    milliSecondsValue: number
}

export interface IChangeTimeValue {
    startTime: ITimeValues
    finishTime: ITimeValues
    text: string
    range: number
}


