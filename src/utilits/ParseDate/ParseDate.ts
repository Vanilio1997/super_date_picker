import{IParseDateReturn} from 'types'

export const parseDate = (date:Date):IParseDateReturn => {
    return {textDateValue: `${date.toString().split(' ').slice(1, 5).join(' ')}.${date.getMilliseconds()}`, millisecondsValue:+date}
}
