import UserAccount from 'src/@components/user/UserPayment/UserAccount'
import UserPaymentTokenQRCode from 'src/@components/user/UserPayment/UserPaymentTokenQRCode'
import UserPayPoint from 'src/@components/user/UserPayment/UserPayPoint'

import * as Styled from './style'

const UserPayment = () => {
    return (
        <Styled.Container>
            <UserPaymentTokenQRCode />
            <Styled.UserPointAndAccountContainer>
                <Styled.UserPointAndAccountLabel>포인트 & 머니</Styled.UserPointAndAccountLabel>
                <UserPayPoint />
                <UserAccount />
            </Styled.UserPointAndAccountContainer>
        </Styled.Container>
    )
}

export default UserPayment
