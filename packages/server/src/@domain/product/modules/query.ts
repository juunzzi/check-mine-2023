import {Product} from 'src/@domain/product/type'
import pool from 'src/db'

export type ProductTableRow = Product

export const isProductTableRowType = (productQueryResponse: any): productQueryResponse is ProductTableRow => {
    return (
        productQueryResponse &&
        typeof productQueryResponse.id === 'number' &&
        typeof productQueryResponse.name === 'string' &&
        typeof productQueryResponse.price === 'number' &&
        typeof productQueryResponse.stock === 'number'
    )
}

export const findProducts = async () => {
    const productsQueryResponse = await pool.query(`SELECT * FROM PRODUCT`)

    if (!productsQueryResponse) {
        return
    }

    const products = productsQueryResponse.filter((product: any) => isProductTableRowType(product))

    return products
}
