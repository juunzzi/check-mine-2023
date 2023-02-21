import {QRCodeSVG} from 'qrcode.react'
import {Suspense, useEffect} from 'react'
import ErrorBoundary from 'src/@components/common/ErrorBoundary'
import Icon, {ReloadIcon} from 'src/@components/common/Icon'
import UserPaymentTokenQRCodeErrorFallback from 'src/@components/user/UserPayment/UserPaymentTokenQRCode/error-fallback'
import UserPaymentTokenQRCodeLoadingFallback from 'src/@components/user/UserPayment/UserPaymentTokenQRCode/loading-fallback'
import {useFetchStatus} from 'src/@domain/hooks/order'
import {useFetchPaymentToken} from 'src/@domain/hooks/user'

import * as Styled from './style'

const CLIENT_URL = process.env.REACT_APP_URL

const UserPaymentTokenQRCodeNaked = () => {
    const {paymentToken, reloadPaymentToken} = useFetchPaymentToken()

    const {status} = useFetchStatus({token: paymentToken})

    const paymentTokenValue = `${CLIENT_URL}/order?qrcode=${paymentToken}`

    useEffect(() => {
        if (status && status !== 'initialize' && status !== 'pending') {
            throw new Error('유효하지 않은 바코드 토큰')
        }
    }, [status])

    const onClickReloadButton = async () => {
        await reloadPaymentToken()
    }

    return (
        <Styled.Container>
            <Styled.FloatButton>
                <Icon icon={ReloadIcon} size={18} onClick={onClickReloadButton} />
            </Styled.FloatButton>
            {paymentToken && <QRCodeSVG value={paymentTokenValue} />}
            <Styled.HelpMessage>바코드를 리더기에 인식해보세요</Styled.HelpMessage>
        </Styled.Container>
    )
}

const UserPaymentTokenQRCode = () => {
    return (
        <ErrorBoundary fallback={UserPaymentTokenQRCodeErrorFallback}>
            <Suspense fallback={<UserPaymentTokenQRCodeLoadingFallback />}>
                <UserPaymentTokenQRCodeNaked />
            </Suspense>
        </ErrorBoundary>
    )
}

export default UserPaymentTokenQRCode
