import { ITimeValues } from '../types';
import { IGetTime } from 'types';

export interface IFullDateProps {
    firstDate: ITimeValues
    secondDate: ITimeValues
    isDisabled: boolean
    setNowDate: (finishStart: 'start' | 'finish') => void
    setCalendarDate: (finishStart: 'start' | 'finish', value: number) => void
}
