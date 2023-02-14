import {QRCodeSVG} from 'qrcode.react'
import {Suspense, useEffect} from 'react'
import ErrorBoundary from 'src/@components/common/ErrorBoundary'
import Icon, {ReloadIcon} from 'src/@components/common/Icon'
import UserPaymentBarcodeErrorFallback from 'src/@components/user/UserPayment/UserPaymentBarcode/error-fallback'
import UserPaymentBarcodeLoadingFallback from 'src/@components/user/UserPayment/UserPaymentBarcode/loading-fallback'
import {useFetchBarcode, useFetchMe} from 'src/@domain/hooks/user'

import * as Styled from './style'

const CLIENT_URL = process.env.REACT_APP_URL

const UserPaymentBarcodeNaked = () => {
    const {me} = useFetchMe()

    const {barcodeToken, reloadBarcodeToken} = useFetchBarcode()

    const barcodeValue = `${CLIENT_URL}/order?qrcode=${barcodeToken}`

    useEffect(() => {
        if (me && !me.hasValidBarcodeToken) {
            throw new Error('유효하지 않은 바코드 토큰')
        }
    }, [me])

    const onClickReloadButton = async () => {
        await reloadBarcodeToken()
    }

    return (
        <Styled.Container>
            <Styled.FloatButton>
                <Icon icon={ReloadIcon} size={18} onClick={onClickReloadButton} />
            </Styled.FloatButton>
            {barcodeToken && <QRCodeSVG value={barcodeValue} />}
            <Styled.HelpMessage>바코드를 리더기에 인식해보세요</Styled.HelpMessage>
        </Styled.Container>
    )
}

const UserPaymentBarcode = () => {
    return (
        <ErrorBoundary fallback={UserPaymentBarcodeErrorFallback}>
            <Suspense fallback={<UserPaymentBarcodeLoadingFallback />}>
                <UserPaymentBarcodeNaked />
            </Suspense>
        </ErrorBoundary>
    )
}

export default UserPaymentBarcode
