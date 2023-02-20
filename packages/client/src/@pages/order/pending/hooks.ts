import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useToast} from 'src/@components/common/Toast/hooks'
import {useMutateOrderDomain} from 'src/@domain/hooks/order'
import {useFetchMe} from 'src/@domain/hooks/user'
import {PATH} from 'src/Router'

export const useOrderPendingPage = () => {
    const navigate = useNavigate()

    const {me} = useFetchMe({refetchInterval: 3000})

    const {cancelOrder} = useMutateOrderDomain()

    const {showToastMessage} = useToast()

    useEffect(() => {
        if (me && me.payment.status === 'success') {
            showToastMessage('결제에 성공했어요!', 'success')
        }

        if (me && me.payment.status === 'failure') {
            showToastMessage('결제 정보가 변경되었어요. 다시 시도해주세요!', 'error')
        }

        if (me && me.payment.status !== 'pending') {
            navigate(PATH.MAIN)
        }
    }, [me])

    const onClickCancelButton = async () => {
        if (!me || !me?.payment.token) {
            showToastMessage('유저 정보가 존재하지 않습니다.', 'error')

            return
        }

        await cancelOrder({paymentToken: me.payment.token})
    }

    return {
        handler: {
            onClickCancelButton,
        },
    }
}
