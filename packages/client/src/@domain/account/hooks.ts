import {useQuery, useQueryClient} from '@tanstack/react-query'
import {RES_MSG} from 'payment_common/module/constant'
import {useNavigate} from 'react-router-dom'
import {useLoading} from 'src/@components/common/Loading/hooks'
import {useToast} from 'src/@components/common/Toast/hooks'
import ACCOUNT_API, {AccountCreateRequestBody} from 'src/@domain/account/api'
import {parseMessageCodeInAxiosError} from 'src/@domain/module/api'
import {useFetchMe} from 'src/@domain/user/hooks'
import {avoidRepeatRequest} from 'src/common/util/func'
import {PATH} from 'src/Router'

const QUERY_KEY = {
    getAccount: 'getAccount',
}

export const useFetchAccount = () => {
    const {me} = useFetchMe()

    const {data: response} = useQuery([QUERY_KEY.getAccount], ACCOUNT_API.get, {
        staleTime: 10000,
        enabled: Boolean(me?.accountId),
    })

    return {
        account: response?.data?.account,
    }
}

export const useMutateAccountDomain = () => {
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const {showLoading, hideLoading} = useLoading()

    const {showToastMessage} = useToast()

    const createAccount = async (args: AccountCreateRequestBody) => {
        try {
            showLoading()

            await ACCOUNT_API.create(args)

            showToastMessage('계좌 생성에 성공하였습니다', 'success')

            queryClient.invalidateQueries([QUERY_KEY.getAccount])

            return {
                message: RES_MSG.SUCCESS,
            }
        } catch (error) {
            const {messageCode} = parseMessageCodeInAxiosError(error)

            if (messageCode === RES_MSG.INPUT_TYPE_ERROR || messageCode === RES_MSG.CREATE_ACCOUNT_INPUT_ERROR) {
                showToastMessage('입력 값이 올바르지 않습니다.', 'error')
            }

            if (messageCode === RES_MSG.CREATE_ACCOUNT_FAILURE || messageCode === RES_MSG.SERVER_ERROR) {
                showToastMessage('서비스 측에 문제가 발생하였습니다.', 'error')
            }

            if (messageCode === RES_MSG.AUTHORIZATION_ERROR) {
                showToastMessage('인증 정보가 갱신되었습니다. 다시 로그인 해주세요', 'error')

                navigate(PATH.LOGIN)
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
