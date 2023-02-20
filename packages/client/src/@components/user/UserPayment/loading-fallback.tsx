import Placeholder from 'src/@components/common/Placeholder'
import UserAccountLoadingFallback from 'src/@components/user/UserPayment/UserAccount/loading-fallback'
import UserPaymentTokenQRCodeLoadingFallback from 'src/@components/user/UserPayment/UserPaymentTokenQRCode/loading-fallback'
import UserPayPointLoadingFallback from 'src/@components/user/UserPayment/UserPayPoint/loading-fallback'

import * as Styled from './style'

const UserPaymentLoadingFallback = () => {
    return (
        <Styled.Container>
            <UserPaymentTokenQRCodeLoadingFallback />
            <Styled.UserPointAndAccountContainer>
                <Placeholder width="50%" height="30px" />
                <UserPayPointLoadingFallback />
                <UserAccountLoadingFallback />
            </Styled.UserPointAndAccountContainer>
        </Styled.Container>
    )
}

export default UserPaymentLoadingFallback
