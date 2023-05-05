import { dataInfo } from 'types'

export const currentDates: dataInfo[] = [
    {
        value: 'Today',
        id: 'day'
    },
    {
        value: 'This week',
        id: 'week'
    },
    {
        value: 'This month',
        id: 'month'
    },
    {
        value: 'This year',
        id: 'year'
    },
]

export const pastDates: dataInfo[] = [
    {
        value: 'Yesterday',
        id: 'day'
    },
    {
        value: 'Week to date',
        id: 'week'
    },
    {
        value: 'Month to date',
        id: 'month'
    },
    {
        value: 'Year to date',
        id: 'year'
    },
]

export const lastNextDateSelect = ['last', 'next'];
export const timeVarinatsDateSelect = ['seconds' , 'minutes' ,'hours' ,'days', 'weeks' , 'months', 'years'];
