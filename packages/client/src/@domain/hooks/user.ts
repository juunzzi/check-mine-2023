import {useQuery, useQueryClient} from '@tanstack/react-query'
import {PAYMENT_TOKEN_EXPIRATION, RES_MSG} from 'payment_common/module/constant'
import {useLocation} from 'react-router-dom'
import {useLoading} from 'src/@components/common/Loading/hooks'
import {useToast} from 'src/@components/common/Toast/hooks'
import {client, parseMessageCodeInAxiosError} from 'src/@domain/api'
import USER_API, {
    CancelPaymentTokenRequestBody,
    JoinUserRequestBody,
    LoginUserRequestBody,
    StartPaymentTokenRequestBody,
    USER_ATHORIZATION_TOKEN_KEY,
} from 'src/@domain/api/user'
import {avoidRepeatRequest} from 'src/common/util/func'
import {ONLY_UNAUTHORIZED_USER_PATH} from 'src/Router'

const QUERY_KEY = {
    me: 'me',
    generatePaymentToken: 'generatePaymentToken',
    getPaymentTokenStatus: 'getPaymentTokenStatus',
}

export const useFetchMe = () => {
    const {pathname} = useLocation()

    const useErrorBoundary = !Object.values(ONLY_UNAUTHORIZED_USER_PATH).includes(pathname)

    const {data: response, isInitialLoading} = useQuery([QUERY_KEY.me], USER_API.me, {
        suspense: false,
        enabled: Boolean(localStorage.getItem(USER_ATHORIZATION_TOKEN_KEY)),
        useErrorBoundary,
        staleTime: 10000,
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
        refetchPaymentToken: avoidRepeatRequest(refetch),
    }
}

interface UseFetchPaymentTokenStatusProps {
    token: string | null
    refetchInterval?: number | false
    useErrorBoundary?: boolean
}

export const useFetchPaymentTokenStatus = ({
    token,
    refetchInterval = false,
    useErrorBoundary = true,
}: UseFetchPaymentTokenStatusProps) => {
    const {data: response, refetch} = useQuery(
        [QUERY_KEY.getPaymentTokenStatus, token],
        () => USER_API.getPaymentTokenStatus({paymentToken: token}),
        {
            refetchInterval: (data) => {
                if (!data) {
                    return refetchInterval
                }

                const {
                    data: {status},
                } = data

                return status === 'failure' || status === 'success' ? false : refetchInterval
            },
            suspense: false,
            useErrorBoundary,
            enabled: Boolean(token),
        },
    )

    return {
        status: response?.data.status,
        refetchPaymentTokenStatus: avoidRepeatRequest(refetch),
    }
}

export const useMutateUserDomain = () => {
    const queryClient = useQueryClient()

    const {showLoading, hideLoading} = useLoading()
    const {showToastMessage} = useToast()

    const invalidatePaymentTokenStatus = async () => {
        await queryClient.invalidateQueries([QUERY_KEY.getPaymentTokenStatus])
    }

    const joinUser = async (args: JoinUserRequestBody) => {
        try {
            showLoading()

            await USER_API.join(args)

            showToastMessage('회원가입에 성공하였습니다', 'success')

            return {
                message: RES_MSG.SUCCESS,
            }
        } catch (error) {
            const {messageCode} = parseMessageCodeInAxiosError(error)

            if (messageCode === RES_MSG.INPUT_TYPE_ERROR || messageCode === RES_MSG.JOIN_USER_INPUT_ERROR) {
                showToastMessage('입력 값이 올바르지 않습니다.', 'error')
            }

            if (messageCode === RES_MSG.JOIN_USER_DUPLICATE_EMAIL) {
                showToastMessage('이메일이 중복되었습니다.', 'error')
            }

            if (messageCode === RES_MSG.IS_ALREADY_LOGIN) {
                showToastMessage('이미 로그인 중 입니다.', 'error')
            }

            if (messageCode === RES_MSG.JOIN_USER_FAILURE || messageCode === RES_MSG.SERVER_ERROR) {
                showToastMessage('서비스 측에 문제가 발생하였습니다.', 'error')
            }

            return {
                message: messageCode,
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
            const {messageCode} = parseMessageCodeInAxiosError(error)

            if (messageCode === RES_MSG.INPUT_TYPE_ERROR) {
                showToastMessage('입력 값이 올바르지 않습니다.', 'error')
            }

            if (messageCode === RES_MSG.IS_NOT_MATCH_EMAIL_OR_PASSWORD) {
                showToastMessage('일치하는 유저가 존재하지 않습니다.', 'error')
            }

            if (messageCode === RES_MSG.IS_ALREADY_LOGIN) {
                showToastMessage('이미 로그인 중 입니다.', 'error')
            }

            if (messageCode === RES_MSG.LOGIN_USER_FAILURE || messageCode === RES_MSG.SERVER_ERROR) {
                showToastMessage('서비스 측에 문제가 발생하였습니다.', 'error')
            }

            return {
                message: messageCode,
            }
        } finally {
            hideLoading()
        }
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
            const {messageCode} = parseMessageCodeInAxiosError(error)

            if (messageCode === RES_MSG.INPUT_TYPE_ERROR || messageCode === RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN) {
                showToastMessage('결제 정보가 존재하지 않거나 유효하지 않습니다.', 'error')
            }

            if (messageCode === RES_MSG.IS_NOT_AVAILABLE_PAYMENT_TOKEN) {
                showToastMessage('이미 결제가 종료된 토큰이거나 유효하지 않은 토큰입니다.', 'error')
            }

            if (messageCode === RES_MSG.SET_PAYMENT_TOKEN_STATUS_FAILURE) {
                showToastMessage('결제 정보에 문제가 있습니다. 결제 정보를 갱신 후 다시 스캔해주세요.', 'error')
            }

            if (messageCode === RES_MSG.SERVER_ERROR) {
                showToastMessage('서비스 측에 문제가 발생하였습니다.', 'error')
            }

            return {
                message: messageCode,
            }
        } finally {
            hideLoading()
        }
    }

    const cancelPaymentToken = async (body: CancelPaymentTokenRequestBody) => {
        try {
            showLoading()

            await USER_API.cancelPaymentToken(body)

            await invalidatePaymentTokenStatus()

            return {
                message: RES_MSG.SUCCESS,
            }
        } catch (error) {
            const {messageCode} = parseMessageCodeInAxiosError(error)

            if (messageCode === RES_MSG.INPUT_TYPE_ERROR || messageCode === RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN) {
                showToastMessage('결제 정보가 존재하지 않거나 유효하지 않습니다.', 'error')
            }

            if (messageCode === RES_MSG.SET_PAYMENT_TOKEN_STATUS_FAILURE) {
                showToastMessage('결제 정보에 문제가 있습니다. 결제 정보를 갱신 후 다시 시도해주세요.', 'error')
            }

            if (messageCode === RES_MSG.SERVER_ERROR) {
                showToastMessage('서비스 측에 문제가 발생하였습니다.', 'error')
            }

            return {
                message: messageCode,
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
        invalidatePaymentTokenStatus: avoidRepeatRequest(invalidatePaymentTokenStatus),
    }
}
