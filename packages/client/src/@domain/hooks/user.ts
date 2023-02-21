import {useQuery, useQueryClient} from '@tanstack/react-query'
import {PAYMENT_TOKEN_EXPIRATION, RES_MSG} from 'payment_common/module/constant'
import {useLoading} from 'src/@components/common/Loading/hooks'
import {useToast} from 'src/@components/common/Toast/hooks'
import {client, hasAxiosResponseAxiosErrorType, hasErrorMessageAxiosResponseType} from 'src/@domain/api'
import USER_API, {
    CancelPaymentTokenRequestBody,
    JoinUserRequestBody,
    LoginUserRequestBody,
    StartPaymentTokenRequestBody,
    USER_ATHORIZATION_TOKEN_KEY,
} from 'src/@domain/api/user'
import {avoidRepeatRequest} from 'src/common/util/func'

const QUERY_KEY = {
    me: 'me',
    generatePaymentToken: 'generatePaymentToken',
    getPaymentTokenStatus: 'getPaymentTokenStatus',
}

interface UseFetchMeProps {
    refetchInterval?: number
}

export const useFetchMe = (props: UseFetchMeProps = {}) => {
    const {refetchInterval} = props

    const {data: response, isInitialLoading} = useQuery([QUERY_KEY.me], USER_API.me, {
        suspense: false,
        useErrorBoundary: false,
        enabled: Boolean(localStorage.getItem(USER_ATHORIZATION_TOKEN_KEY)),
        staleTime: 10000,
        refetchInterval,
    })

    const queryClient = useQueryClient()

    const logout = () => {
        client.defaults.headers['Authorization'] = ''

        localStorage.removeItem(USER_ATHORIZATION_TOKEN_KEY)

        queryClient.clear()
    }

    return {
        me: response?.data,
        isInitialLoading,
        logout,
    }
}

export const useFetchPaymentToken = () => {
    const {data: response, refetch} = useQuery([QUERY_KEY.generatePaymentToken], USER_API.generatePaymentToken, {
        staleTime: PAYMENT_TOKEN_EXPIRATION,
    })

    return {
        paymentToken: response?.data?.paymentToken ?? null,
        reloadPaymentToken: avoidRepeatRequest(refetch),
    }
}

interface UseFetchPaymentTokenStatus {
    token: string | null
    refetchInterval?: number | false
}

export const useFetchPaymentTokenStatus = ({token, refetchInterval = false}: UseFetchPaymentTokenStatus) => {
    const {data: response, refetch} = useQuery(
        [QUERY_KEY.getPaymentTokenStatus, token],
        () => USER_API.getPaymentTokenStatus({paymentToken: token}),
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

export const useMutateUserDomain = () => {
    const queryClient = useQueryClient()

    const {showLoading, hideLoading} = useLoading()
    const {showToastMessage} = useToast()

    const joinUser = async (args: JoinUserRequestBody) => {
        try {
            showLoading()

            await USER_API.join(args)

            showToastMessage('회원가입에 성공하였습니다', 'success')

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

            if (message === RES_MSG.INPUT_TYPE_ERROR || message === RES_MSG.CREATE_USER_INPUT_ERROR) {
                showToastMessage('입력 값이 올바르지 않습니다.', 'error')
            }

            if (message === RES_MSG.DUPLICATE_EMAIL) {
                showToastMessage('이메일이 중복되었습니다.', 'error')
            }

            return {
                message: RES_MSG.FAILURE,
            }
        } finally {
            hideLoading()
        }
    }

    const loginUser = async (args: LoginUserRequestBody) => {
        try {
            showLoading()

            const {
                data: {accessToken},
            } = await USER_API.login(args)

            localStorage.setItem(USER_ATHORIZATION_TOKEN_KEY, accessToken)

            client.defaults.headers['Authorization'] = `Bearer ${accessToken}`

            showToastMessage('로그인에 성공하였습니다', 'success')

            return {
                data: {
                    accessToken,
                },
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

            if (message === RES_MSG.INPUT_TYPE_ERROR) {
                showToastMessage('입력 값이 올바르지 않습니다.', 'error')
            }

            if (message === RES_MSG.IS_NOT_MATCH) {
                showToastMessage('일치하는 유저가 존재하지 않습니다.', 'error')
            }

            return {
                message: RES_MSG.FAILURE,
            }
        } finally {
            hideLoading()
        }
    }

    const invalidateUserQuery = async () => {
        await queryClient.invalidateQueries([QUERY_KEY.me])
    }

    const startPaymentToken = async (body: StartPaymentTokenRequestBody) => {
        try {
            showLoading()

            await USER_API.startPaymentToken(body)

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

    const cancelPaymentToken = async (body: CancelPaymentTokenRequestBody) => {
        try {
            showLoading()

            await USER_API.cancelPaymentToken(body)

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
        joinUser: avoidRepeatRequest(joinUser),
        loginUser: avoidRepeatRequest(loginUser),
        startPaymentToken: avoidRepeatRequest(startPaymentToken),
        cancelPaymentToken: avoidRepeatRequest(cancelPaymentToken),

        invalidateUserQuery: avoidRepeatRequest(invalidateUserQuery),
    }
}
