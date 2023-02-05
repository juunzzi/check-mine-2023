import {Product} from 'src/@domain/product/type'
import {generateQueryStatement} from 'src/common/db/util'
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

    const products = productQueryResult.filter((product: any) => isProductTableRowType(product))

    return products
}

export const findProductsByIds = async (productIds: number[]) => {
    const {inStatement} = generateQueryStatement(productIds.length)

    const productsQueryResult = await pool.query(`SELECT * FROM PRODUCT WHERE id ${inStatement}`, productIds)

    const products: ProductTableRow[] = productsQueryResult.filter((element: any) => isProductTableRowType(element))

    return products
}

export const updateProductsStock = async (productsWithIdAndStockOnly: Pick<Product, 'id' | 'stock'>[]) => {
    const {idAndStocks, ids} = productsWithIdAndStockOnly.reduce<{
        idAndStocks: number[]
        ids: number[]
    }>(
        (prev, {id, stock}) => {
            return {
                idAndStocks: [...prev.idAndStocks, id, stock],
                ids: [...prev.ids, id],
            }
        },
        {idAndStocks: [], ids: []},
    )

    const {inStatement, whenStatement} = generateQueryStatement(productsWithIdAndStockOnly.length)

    const productsQueryResult = await pool.query(
        `UPDATE PRODUCT SET stock = CASE id ${whenStatement} END WHERE id ${inStatement}`,
        [...idAndStocks, ...ids],
    )

    return productsQueryResult
}
