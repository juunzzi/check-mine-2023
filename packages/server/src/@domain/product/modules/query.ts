import {Product} from 'src/@domain/product/type'
import {generateQueryStatement} from 'src/common/db/util'
import {isNumberType, isStringType} from 'src/common/type/guard'
import pool from 'src/db'

export type ProductTableRow = Product

export const isProductTableRowType = (productTableRow: any): productTableRow is ProductTableRow => {
    return (
        productTableRow &&
        isNumberType(productTableRow.id) &&
        isNumberType(productTableRow.price) &&
        isNumberType(productTableRow.stock) &&
        isStringType(productTableRow.name)
    )
}

export const findProducts = async () => {
    const productQueryResult = await pool.query(`SELECT * FROM PRODUCT`)

    const productTableRows = productQueryResult.filter((productQueryResultElement: any) =>
        isProductTableRowType(productQueryResultElement),
    )

    return productTableRows
}

export const findProductsByIds = async (productIds: number[]) => {
    const {inStatement} = generateQueryStatement(productIds.length)

    const productsQueryResult = await pool.query(`SELECT * FROM PRODUCT WHERE id ${inStatement}`, productIds)

    const productTableRows: ProductTableRow[] = productsQueryResult.filter((productQueryResultElement: any) =>
        isProductTableRowType(productQueryResultElement),
    )

    return productTableRows
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
