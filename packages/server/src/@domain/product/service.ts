import * as DB from 'src/@domain/product/modules/query'

export const getProducts = async () => {
    const products = await DB.findProducts()

    return {
        data: products,
        message: products ? 'SUCCESS' : 'FAILED',
    }
}
