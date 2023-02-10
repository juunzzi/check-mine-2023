import {RES_MSG} from 'payment_common/module/constant'
import {useLoading} from 'src/@components/common/Loading/hooks'
import {useToast} from 'src/@components/common/Toast/hooks'
import {hasAxiosResponseAxiosErrorType, hasErrorMessageAxiosResponseType} from 'src/@domain/api'
import USER_API, {JoinUserRequestBody, LoginUserRequestBody} from 'src/@domain/api/user'
import {avoidRepeatRequest} from 'src/common/util/func'

export const useMutateUserDomain = () => {
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

            localStorage.setItem('user-authorization-token', accessToken)

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
    }
}
