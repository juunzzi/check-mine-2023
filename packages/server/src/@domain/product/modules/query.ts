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

    const products = productQueryResult.filter((product: any) => isProductTableRowType(product))

    return products
}

export const findProductsByIds = async (productIds: number[]) => {
    const questionMark = productIds.reduce((prev, _, index) => (index === 0 ? `${prev}?` : `${prev},?`), '')

    const productsQueryResult = await pool.query(`SELECT * FROM PRODUCT WHERE id IN (${questionMark})`, productIds)

    const products: ProductTableRow[] = productsQueryResult.filter((element: any) => isProductTableRowType(element))

    return products
}

export const updateProductsStock = async (productsWithIdAndStockOnly: Pick<Product, 'id' | 'stock'>[]) => {
    const {idAndStocks, ids, when, questionMark} = productsWithIdAndStockOnly.reduce<{
        idAndStocks: number[]
        ids: number[]
        when: string
        questionMark: string
    }>(
        (prev, {id, stock}, index) => {
            const nextWhen = `${[prev.when]}WHEN ? THEN ? `
            const nextQuestionMark = index === 0 ? `${prev.questionMark}?` : `${prev.questionMark},?`

            return {
                idAndStocks: [...prev.idAndStocks, id, stock],
                ids: [...prev.ids, id],
                when: nextWhen,
                questionMark: nextQuestionMark,
            }
        },
        {idAndStocks: [], ids: [], when: '', questionMark: ''},
    )

    const productsQueryResult = await pool.query(
        `UPDATE PRODUCT SET stock = CASE id ${when} END WHERE id IN (${questionMark})`,
        [...idAndStocks, ...ids],
    )

    return productsQueryResult
}
