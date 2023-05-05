export type modeType = 'Absolute' |  'Now' | 'Relative'
import { ITimeValues } from 'components/TimeElemet/types'
import { IGetTime } from 'types'

export interface IFullDateModalSettingsProps {
    mode: modeType
    timeInfo: ITimeValues
    setNowValue: (startFinish: 'start' | 'finish') => void
    setCalendarDate: (finishStart: 'start' | 'finish', value: number) => void
    closeModal: () => void
    startFinish: 'start' | 'finish'
}

