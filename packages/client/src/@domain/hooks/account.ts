import {RES_MSG} from 'payment_common/module/constant'
import {useLoading} from 'src/@components/common/Loading/hooks'
import {useToast} from 'src/@components/common/Toast/hooks'
import {hasAxiosResponseAxiosErrorType, hasErrorMessageAxiosResponseType} from 'src/@domain/api'
import ACCOUNT_API, {AccountCreateRequestBody} from 'src/@domain/api/account'
import {avoidRepeatRequest} from 'src/common/util/func'

export const useMutateAccountDomain = () => {
    const {showLoading, hideLoading} = useLoading()
    const {showToastMessage} = useToast()

    const createAccount = async (args: AccountCreateRequestBody) => {
        try {
            showLoading()

            await ACCOUNT_API.create(args)

            showToastMessage('계좌 생성에 성공하였습니다', 'success')

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

            if (message === RES_MSG.INPUT_TYPE_ERROR || message === RES_MSG.CREATE_ACCOUNT_INPUT_ERROR) {
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
        createAccount: avoidRepeatRequest(createAccount),
    }
}
