import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useToast} from 'src/@components/common/Toast/hooks'
import {useFetchPaymentToken, useFetchPaymentTokenStatus, useMutateUserDomain} from 'src/@domain/hooks/user'
import {PATH} from 'src/Router'

export const useOrderPendingPage = () => {
    const navigate = useNavigate()

    const {paymentToken} = useFetchPaymentToken()

    const {status} = useFetchPaymentTokenStatus({
        token: paymentToken,
        refetchInterval: 3000,
    })

    const {cancelPaymentToken} = useMutateUserDomain()

    const {showToastMessage} = useToast()

    useEffect(() => {
        if (!status) {
            return
        }

        if (status === 'success') {
            showToastMessage('결제에 성공했어요!', 'success')
        }

        if (status === 'failure') {
            showToastMessage('결제 정보가 변경되었어요. 다시 시도해주세요!', 'error')
        }

        if (status !== 'pending') {
            navigate(PATH.MAIN)
        }
    }, [status])

    const onClickCancelButton = async () => {
        if (!paymentToken) {
            showToastMessage('결제 정보가 존재하지 않습니다.', 'error')

            return
        }

        await cancelPaymentToken({paymentToken})
    }

    return {
        handler: {
            onClickCancelButton,
        },
    }
}
