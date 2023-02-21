import {RES_MSG} from 'payment_common/module/constant'
import {useLoading} from 'src/@components/common/Loading/hooks'
import {useToast} from 'src/@components/common/Toast/hooks'
import {hasAxiosResponseAxiosErrorType, hasErrorMessageAxiosResponseType} from 'src/@domain/api'
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
            if (!hasAxiosResponseAxiosErrorType(error) || !hasErrorMessageAxiosResponseType(error.response)) {
                showToastMessage('알 수 없는 에러가 발생하였습니다.', 'error')

                return {
                    message: RES_MSG.FAILURE,
                }
            }

            const {
                response: {
                    data: {message},
                },
            } = error

            if (message === RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN) {
                showToastMessage('결제 정보를 갱신해주세요.', 'error')
            }

            if (message === RES_MSG.IS_NOT_AVAILABLE_FOR_ORDER) {
                showToastMessage('상품의 재고가 부족합니다.', 'error')
            }

            if (message === RES_MSG.FAILURE) {
                showToastMessage('구매할 수 없습니다. 잔고를 확인해주세요.', 'error')
            }

            return {
                message: message,
            }
        } finally {
            hideLoading()
        }
    }

    return {
        createOrder: avoidRepeatRequest(createOrder),
    }
}
