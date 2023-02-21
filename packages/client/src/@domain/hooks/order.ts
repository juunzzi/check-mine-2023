import {useQuery} from '@tanstack/react-query'
import {RES_MSG} from 'payment_common/module/constant'
import {useLoading} from 'src/@components/common/Loading/hooks'
import {useToast} from 'src/@components/common/Toast/hooks'
import {hasAxiosResponseAxiosErrorType, hasErrorMessageAxiosResponseType} from 'src/@domain/api'
import ORDER_API, {CancelOrderRequestBody, CreateOrderRequestBody, StartOrderRequestBody} from 'src/@domain/api/order'
import {useMutateUserDomain} from 'src/@domain/hooks/user'
import {avoidRepeatRequest} from 'src/common/util/func'

const QUERY_KEY = {
    getStatus: 'getStatus',
}

interface UseFetchStatusProps {
    token: string | null
    refetchInterval?: number | false
}

export const useFetchStatus = ({token, refetchInterval = false}: UseFetchStatusProps) => {
    const {data: response, refetch} = useQuery(
        [QUERY_KEY.getStatus, token],
        () => ORDER_API.getStatus({paymentToken: token}),
        {
            refetchInterval,
            suspense: false,
            enabled: Boolean(token),
        },
    )

    return {
        status: response?.data.status,
        refetchStatus: avoidRepeatRequest(refetch),
    }
}

export const useMutateOrderDomain = () => {
    const {invalidateUserQuery} = useMutateUserDomain()

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

    const startOrder = async (body: StartOrderRequestBody) => {
        try {
            showLoading()

            await ORDER_API.start(body)

            showToastMessage('유효한 결제 토큰입니다.', 'success')

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

            showToastMessage('유효하지 않은 토큰입니다.', 'error')

            return {
                message: RES_MSG.FAILURE,
            }
        } finally {
            hideLoading()
        }
    }

    const cancelOrder = async (body: CancelOrderRequestBody) => {
        try {
            showLoading()

            await ORDER_API.cancel(body)

            invalidateUserQuery()

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

            showToastMessage('주문 취소에 실패하였습니다.', 'error')

            return {
                message: RES_MSG.FAILURE,
            }
        } finally {
            hideLoading()
        }
    }

    return {
        createOrder: avoidRepeatRequest(createOrder),
        startOrder: avoidRepeatRequest(startOrder),
        cancelOrder: avoidRepeatRequest(cancelOrder),
    }
}
