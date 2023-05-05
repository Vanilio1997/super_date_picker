export interface ISelect<T> {
    data: T[]
    onChange: (value: any) => void
}
