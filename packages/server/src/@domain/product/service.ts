import * as DB from 'src/@domain/product/modules/query'
import {RES_MSG, RES_MSG_TYPE} from 'src/common/response-message'

export const getProducts = async (): Promise<{data: any; message: RES_MSG_TYPE}> => {
    const products = await DB.findProducts()
    const message = products ? RES_MSG.SUCCESS : RES_MSG.FAILURE

    return {
        data: products,
        message,
    }
}
