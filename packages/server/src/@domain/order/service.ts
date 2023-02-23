import {RES_MSG} from 'payment_common/module/constant'
import * as ACCOUNT_DB from 'src/@domain/account/modules/query'
import {computeOrderAmount, parseOrderProducts} from 'src/@domain/order/modules/util'
import {checkProductsAvailableForOrder} from 'src/@domain/order/modules/validation'
import {OrderProduct, OrderProductMap} from 'src/@domain/order/type'
import * as PRODUCT_DB from 'src/@domain/product/modules/query'
import {Product} from 'src/@domain/product/type'
import * as USER_DB from 'src/@domain/user/modules/query'
import {User} from 'src/@domain/user/type'
import {transactQueries} from 'src/common/db/util'

const orderOnPayPoint = async ({
    user: {id: userId, payPoint, accountId, email, name},
    products,
    orderProductMap,
    orderAmount,
}: {
    user: User
    products: Product[]
    orderProductMap: OrderProductMap
    orderAmount: number
}) => {
    const updateUserResult = await USER_DB.updateUser({
        id: userId,
        payPoint: payPoint - orderAmount,
        accountId,
        email,
        name,
    })

    const updateProductsResult = await PRODUCT_DB.updateProductsStock(
        products.map(({id, stock}) => ({
            id,
            stock: stock - orderProductMap[id].quantity,
        })),
    )

    return {
        message: RES_MSG.CREATE_ORDER_SUCCESS,
        data: {
            updateUserResult,
            updateProductsResult,
        },
    }
}

const orderOnPayPointWithAccount = async ({
    user: {id: userId, payPoint, accountId, ...userRest},
    products,
    orderProductMap,
    orderAmount,
}: {
    user: User
    products: Product[]
    orderProductMap: OrderProductMap
    orderAmount: number
}) => {
    const account = await ACCOUNT_DB.findAccountByAccountId(accountId)

    if (!account) {
        return {message: RES_MSG.IS_INSUFFICIENT_PAY_POINT}
    }

    const {amount, ...accountRest} = account

    if (payPoint + amount < orderAmount) {
        return {message: RES_MSG.IS_INSUFFICIENT_PAY_POINT}
    }

    const updateAccountResult = await ACCOUNT_DB.updateAccount({
        amount: amount - orderAmount - payPoint,
        ...accountRest,
    })

    const updateUserResult = await USER_DB.updateUser({
        id: userId,
        payPoint: 0,
        accountId,
        ...userRest,
    })

    const updateProductsResult = await PRODUCT_DB.updateProductsStock(
        products.map(({id, stock}) => ({
            id,
            stock: stock - orderProductMap[id].quantity,
        })),
    )

    return {
        message: RES_MSG.CREATE_ORDER_SUCCESS,
        data: {
            updateUserResult,
            updateProductsResult,
            updateAccountResult,
        },
    }
}

const ORDER_SERVICE = {
    create: async (userId: number, orderProducts: OrderProduct[]) => {
        const createOrderQueries = async () => {
            const {orderProductMap, productIds} = parseOrderProducts(orderProducts)

            const user = await USER_DB.findUserById(userId)
            const products = await PRODUCT_DB.findProductsByIds(productIds)

            if (!checkProductsAvailableForOrder(products, orderProducts)) {
                return {message: RES_MSG.IS_NOT_AVAILABLE_FOR_ORDER}
            }

            const orderAmount = computeOrderAmount(products, orderProductMap)
            const orderMethod = user.payPoint >= orderAmount ? orderOnPayPoint : orderOnPayPointWithAccount
            const {data, message} = await orderMethod({user, products, orderProductMap, orderAmount})

            return {
                data,
                message,
            }
        }

        const queriesResult = await transactQueries(createOrderQueries)

        return queriesResult
    },
}

export default ORDER_SERVICE
