import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import LoginRedirectIfNotLoggedIn from 'src/@components/common/LoginRedirectIfNotLoggedIn'
import PageTemplate from 'src/@components/common/PageTemplate'
import UserPayment from 'src/@components/user/UserPayment'
import {useFetchPaymentToken, useFetchPaymentTokenStatus} from 'src/@domain/hooks/user'
import {PATH} from 'src/Router'

import * as Styled from './style'

const UnwrappedMainPage = () => {
    const navigate = useNavigate()

    const {paymentToken} = useFetchPaymentToken()

    const {status} = useFetchPaymentTokenStatus({token: paymentToken, refetchInterval: 3000, useErrorBoundary: false})

    useEffect(() => {
        if (status && status === 'pending') {
            navigate(PATH.ORDER_PENDING_PAGE)
        }
    }, [status])

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
