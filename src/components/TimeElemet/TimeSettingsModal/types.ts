import { commonUsedType, commonUsedTimeType, IGetTime ,IChangeByRange} from 'types'
import { IUsedDataRanges } from 'types'


export interface ITimeSettingsModalProps{
    setCommonUsed: (currentPast: commonUsedTimeType, id: commonUsedType, value:string) => void
    getTime: ({lastNext, timeVariant,value} :IGetTime) => void
    usedDataRanges: null | IUsedDataRanges[]
    changeByRange: ({previousNext}:IChangeByRange) => void
}
