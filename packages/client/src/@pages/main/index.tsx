import LoginRedirectIfNotLoggedIn from 'src/@components/common/LoginRedirectIfNotLoggedIn'
import PageTemplate from 'src/@components/common/PageTemplate'
import UserPayment from 'src/@components/user/UserPayment'

import * as Styled from './style'

const UnwrappedMainPage = () => {
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
