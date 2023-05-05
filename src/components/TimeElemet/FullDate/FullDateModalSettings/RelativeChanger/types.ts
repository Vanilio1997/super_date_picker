import { timeVariantsType } from 'types'

export interface ISelectRelativeChanger {
    lastNext: 'last'| 'next'
    timeVariantType: timeVariantsType
    textValue: string
}
