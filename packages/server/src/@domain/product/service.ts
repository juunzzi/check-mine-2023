import {RES_MSG, RES_MSG_TYPE} from 'payment_common'
import * as DB from 'src/@domain/product/modules/query'

export const getProducts = async (): Promise<{data: any; message: RES_MSG_TYPE}> => {
    const products = await DB.findProducts()
    const message = products ? RES_MSG.SUCCESS : RES_MSG.FAILURE

    return {
        data: products,
        message,
    }
}
