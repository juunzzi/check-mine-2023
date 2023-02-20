import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import LoginRedirectIfNotLoggedIn from 'src/@components/common/LoginRedirectIfNotLoggedIn'
import PageTemplate from 'src/@components/common/PageTemplate'
import UserPayment from 'src/@components/user/UserPayment'
import {useFetchMe} from 'src/@domain/hooks/user'
import {PATH} from 'src/Router'

import * as Styled from './style'

const UnwrappedMainPage = () => {
    const navigate = useNavigate()

    const {me} = useFetchMe({refetchInterval: 3000})

    useEffect(() => {
        if (me && me.payment.status === 'pending') {
            navigate(PATH.ORDER_PENDING_PAGE)
        }
    }, [me])

    return (
        <PageTemplate>
            <Styled.Container>
                <Styled.UserPaymentContainer>
                    <Styled.UserPaymentHeader>현장결제</Styled.UserPaymentHeader>
                    <UserPayment />
                </Styled.UserPaymentContainer>
            </Styled.Container>
        </PageTemplate>
    )
}

const MainPage = () => {
    return (
        <LoginRedirectIfNotLoggedIn>
            <UnwrappedMainPage />
        </LoginRedirectIfNotLoggedIn>
    )
}

export default MainPage
