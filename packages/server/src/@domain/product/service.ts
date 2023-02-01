import * as DB from 'src/@domain/product/modules/query'
export const getProducts = () => {
    return DB.findProducts()
}
