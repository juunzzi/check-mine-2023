import {QRCodeSVG} from 'qrcode.react'
import {Suspense} from 'react'
import UserPaymentBarcodeErrorFallback from 'src/@components/user/UserPayment/UserPaymentBarcode/error-fallback'
import UserPaymentBarcodeLoadingFallback from 'src/@components/user/UserPayment/UserPaymentBarcode/loading-fallback'
import {useFetchBarcode} from 'src/@domain/hooks/user'

import * as Styled from './style'

const CLIENT_URL = process.env.REACT_APP_URL

const UserPaymentBarcode = () => {
    const {barcodeToken} = useFetchBarcode()

    const barcodeValue = `${CLIENT_URL}/order?qrcode=${barcodeToken}`

    return (
        <Styled.Container>
            {barcodeToken && <QRCodeSVG value={barcodeValue} />}
            <Styled.HelpMessage>바코드를 리더기에 인식해보세요</Styled.HelpMessage>
        </Styled.Container>
    )
}

export const UserPaymentBarcodeWrappedInSuspense = () => {
    return (
        <Suspense fallback={<UserPaymentBarcodeLoadingFallback />}>
            <UserPaymentBarcode />
            <UserPaymentBarcodeErrorFallback />
        </Suspense>
    )
}

export default UserPaymentBarcode
