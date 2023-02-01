import {Product} from 'src/@domain/product/type'
import pool from 'src/db'

export type ProductTableRow = Product

export const isProductTableRowType = (productQuertResult: any): productQuertResult is ProductTableRow => {
    return (
        productQuertResult &&
        typeof productQuertResult.id === 'number' &&
        typeof productQuertResult.name === 'string' &&
        typeof productQuertResult.price === 'number' &&
        typeof productQuertResult.stock === 'number'
    )
}

export const findProducts = async () => {
    const productQueryResult = await pool.query(`SELECT * FROM PRODUCT`)

    if (!productQueryResult) {
        return
    }

    const products = productQueryResult.filter((product: any) => isProductTableRowType(product))

    return products
}
