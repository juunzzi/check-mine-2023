import PageTemplate from 'src/@components/common/PageTemplate'
import UserPayment from 'src/@components/user/UserPayment'

import * as Styled from './style'

const MainPage = () => {
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

export default MainPage
