import {useQuery, useQueryClient} from '@tanstack/react-query'
import {RES_MSG} from 'payment_common/module/constant'
import {useLoading} from 'src/@components/common/Loading/hooks'
import {useToast} from 'src/@components/common/Toast/hooks'
import {parseMessageCodeInAxiosError} from 'src/@domain/api'
import ACCOUNT_API, {AccountCreateRequestBody} from 'src/@domain/api/account'
import {useFetchMe} from 'src/@domain/hooks/user'
import {avoidRepeatRequest} from 'src/common/util/func'

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
