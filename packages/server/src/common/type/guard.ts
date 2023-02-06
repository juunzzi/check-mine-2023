export const isNumberType = (arg: any): arg is number => {
    return typeof arg === 'number' && !isNaN(arg)
}

export const isStringType = (arg: any): arg is string => {
    return typeof arg === 'string'
}

export const isNullType = (arg: any): arg is null => {
    return arg === null
}

export const isBigintType = (arg: any): arg is bigint => {
    return typeof arg === 'bigint'
}
