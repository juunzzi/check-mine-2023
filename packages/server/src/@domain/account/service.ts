import * as DB from 'src/@domain/account/modules/query'
export const getAccount = (userId: number) => {
    return DB.findAccountByUserId(userId)
}
