import {RES_MSG} from 'payment_common/module/constant'
import {useLoading} from 'src/@components/common/Loading/hooks'
import {useToast} from 'src/@components/common/Toast/hooks'
import {parseMessageCodeInAxiosError} from 'src/@domain/api'
import ORDER_API, {CreateOrderRequestBody} from 'src/@domain/api/order'
import {avoidRepeatRequest} from 'src/common/util/func'

export const useMutateOrderDomain = () => {
    const {showLoading, hideLoading} = useLoading()
    const {showToastMessage} = useToast()

    const createOrder = async (args: CreateOrderRequestBody) => {
        try {
            showLoading()

            await ORDER_API.create(args)

            showToastMessage('주문 결제가 완료되었습니다.', 'success')

            return {
                message: RES_MSG.SUCCESS,
            }
        } catch (error) {
            const {messageCode} = parseMessageCodeInAxiosError(error)

            if (messageCode === RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN) {
                showToastMessage('결제 정보를 갱신해주세요.', 'error')
            }

            if (messageCode === RES_MSG.IS_NOT_AVAILABLE_FOR_ORDER) {
                showToastMessage('상품의 재고가 부족합니다.', 'error')
            }

            if (messageCode === RES_MSG.IS_INSUFFICIENT_PAY_POINT) {
                showToastMessage('잔액 부족입니다.', 'error')
            }

            return {
                message: messageCode,
            }
        } finally {
            hideLoading()
        }
    }

    return {
        createOrder: avoidRepeatRequest(createOrder),
    }
}
