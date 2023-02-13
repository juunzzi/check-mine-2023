import UserAccount from 'src/@components/user/UserPayment/UserAccount'
import UserPaymentBarcode from 'src/@components/user/UserPayment/UserPaymentBarcode'
import UserPayPoint from 'src/@components/user/UserPayment/UserPayPoint'

import * as Styled from './style'

const UserPayment = () => {
    return (
        <Styled.Container>
            <UserPaymentBarcode />
            <Styled.UserPointAndAccountContainer>
                <Styled.UserPointAndAccountLabel>포인트 & 머니</Styled.UserPointAndAccountLabel>
                <UserPayPoint />
                <UserAccount />
            </Styled.UserPointAndAccountContainer>
        </Styled.Container>
    )
}

export default UserPayment
