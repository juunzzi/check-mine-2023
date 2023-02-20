import {QRCodeSVG} from 'qrcode.react'
import Placeholder from 'src/@components/common/Placeholder'

import * as Styled from './style'

const UserPaymentTokenQRCodeLoadingFallback = () => {
    return (
        <Styled.Container>
            <QRCodeSVG value="" opacity={0.1} />
            <Placeholder width="100%" height="20px" />
        </Styled.Container>
    )
}

export default UserPaymentTokenQRCodeLoadingFallback
