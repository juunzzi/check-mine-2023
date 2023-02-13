import PageTemplate from 'src/@components/common/PageTemplate'
import UserPaymentInfo from 'src/@components/user/UserPaymentInfo'

import * as Styled from './style'

const MainPage = () => {
    return (
        <PageTemplate>
            <Styled.Container>
                <Styled.UserPaymentInfoContainer>
                    <UserPaymentInfo />
                </Styled.UserPaymentInfoContainer>
            </Styled.Container>
        </PageTemplate>
    )
}

export default MainPage
