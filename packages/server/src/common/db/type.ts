import {isBigintType, isNumberType} from 'src/common/type/guard'

export interface InsertQueryResult {
    affectedRows: number
    insertId: bigint
    warningStatus: number
}

export const isInsertQueryResultType = (insertQueryResult: any): insertQueryResult is InsertQueryResult => {
    return (
        insertQueryResult &&
        isNumberType(insertQueryResult.affectedRows) &&
        isNumberType(insertQueryResult.warningStatus) &&
        isBigintType(insertQueryResult.insertId)
    )
}
