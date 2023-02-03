import * as ACCOUNT_DB from 'src/@domain/account/modules/query'
import {computeOrderAmount, parseProductsToOrder} from 'src/@domain/order/modules/util'
import {checkProductsAvailableForOrder} from 'src/@domain/order/modules/validation'
import {ProductToOrder} from 'src/@domain/order/type'
import * as PRODUCT_DB from 'src/@domain/product/modules/query'
import {Product} from 'src/@domain/product/type'
import * as USER_DB from 'src/@domain/user/modules/query'
import {User} from 'src/@domain/user/type'
import {transactQueries} from 'src/common/db/util'
import {RES_MSG} from 'src/common/response-message'

export interface ProductsToOrderMap {
    [id: number]: {
        id: number
        quantity: number
    }
}

const orderOnOnlyPayPoint = async ({
    user,
    products,
    productsToOrderMap,
    orderAmount,
}: {
    user: User
    products: Product[]
    productsToOrderMap: ProductsToOrderMap
    orderAmount: number
}) => {
    const {id: userId, payPoint, accountId, email, name} = user

    const updateUserResult = await USER_DB.updateUser({
        id: userId,
        payPoint: payPoint - orderAmount,
        accountId,
        email,
        name,
    })

    const updateProductsResult = await PRODUCT_DB.updateProductsStock(
        products.map(({id, stock, ...rest}) => ({
            ...rest,
            id,
            stock: stock - productsToOrderMap[id].quantity,
        })),
    )

    return {
        updateUserResult,
        updateProductsResult,
    }
}

const orderOnPayPointWithAccount = async ({
    user,
    products,
    productsToOrderMap,
    orderAmount,
}: {
    user: User
    products: Product[]
    productsToOrderMap: ProductsToOrderMap
    orderAmount: number
}) => {
    const {id: userId, payPoint, accountId, email, name} = user

    const {amount, ...accountRest} = await ACCOUNT_DB.findAccountByAccountId(accountId)

    if (payPoint + amount < orderAmount) {
        return
    }

    const updateUserResult = await USER_DB.updateUser({
        id: userId,
        payPoint: 0,
        accountId,
        email,
        name,
    })

    const updateAccountResult = await ACCOUNT_DB.updateAccount({
        ...accountRest,
        amount: amount - orderAmount - payPoint,
    })

    const updateProductsResult = await PRODUCT_DB.updateProductsStock(
        products.map(({id, stock}) => ({
            id,
            stock: stock - productsToOrderMap[id].quantity,
        })),
    )

    return {
        updateUserResult,
        updateProductsResult,
        updateAccountResult,
    }
}

export const createOrder = async (userId: number, productsToOrder: ProductToOrder[]) => {
    const {productsToOrderMap, productIds} = parseProductsToOrder(productsToOrder)

    const queriesResult = await transactQueries(async () => {
        const user = await USER_DB.findUserById(userId)
        const products = await PRODUCT_DB.findProductsByIds(productIds)

        if (!checkProductsAvailableForOrder(products, productsToOrder)) {
            return {message: RES_MSG.FAILURE}
        }

        const orderAmount = computeOrderAmount(products, productsToOrderMap)
        const orderResult =
            user.payPoint >= orderAmount
                ? await orderOnOnlyPayPoint({user, products, productsToOrderMap, orderAmount})
                : await orderOnPayPointWithAccount({user, products, productsToOrderMap, orderAmount})
        const message = orderResult ? RES_MSG.SUCCESS : RES_MSG.FAILURE

        return {
            data: orderResult,
            message,
        }
    })

    return queriesResult
}
