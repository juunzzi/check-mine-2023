export interface InsertQueryResult {
    affectedRows: number
    insertId: bigint
    warningStatus: number
}

export const isInsertQueryResult = (insertQueryResult: any): insertQueryResult is InsertQueryResult => {
    return (
        insertQueryResult &&
        typeof insertQueryResult.affectedRows === 'number' &&
        typeof insertQueryResult.insertId === 'bigint' &&
        typeof insertQueryResult.warningStatus === 'number'
    )
}
