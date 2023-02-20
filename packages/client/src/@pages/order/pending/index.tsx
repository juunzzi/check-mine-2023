import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import PageTemplate from 'src/@components/common/PageTemplate'
import {useToast} from 'src/@components/common/Toast/hooks'
import {useFetchMe} from 'src/@domain/hooks/user'
import {PATH} from 'src/Router'

import * as Styled from './style'

const OrderPendingPage = () => {
    const navigate = useNavigate()

    const {me} = useFetchMe({refetchInterval: 3000})

    const {showToastMessage} = useToast()

    useEffect(() => {
        if (me && me.payment.status === 'success') {
            showToastMessage('결제에 성공했어요!', 'success')
        }

        if (me && me.payment.status === 'failure') {
            showToastMessage('결제에 실패했어요. 다시 시도해주세요!', 'error')
        }

        if (me && me.payment.status !== 'pending') {
            navigate(PATH.MAIN)
        }
    }, [me])

    return (
        <PageTemplate>
            <Styled.Container>
                <Styled.OrderStatus>결제 진행 중</Styled.OrderStatus>
            </Styled.Container>
        </PageTemplate>
    )
}

export default OrderPendingPage
