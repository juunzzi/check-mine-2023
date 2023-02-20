import {useQueryClient} from '@tanstack/react-query'
import {QRCodeSVG} from 'qrcode.react'
import {ErrorBoundaryFallbackProps} from 'src/@components/common/ErrorBoundary'
import Icon, {ReloadIcon} from 'src/@components/common/Icon'

import * as Styled from './style'

const UserPaymentTokenQRCodeErrorFallback = (props: ErrorBoundaryFallbackProps) => {
    const {resetErrorState} = props

    const queryClient = useQueryClient()

    const onClickResetButton = () => {
        resetErrorState()

        queryClient.clear()
    }

    return (
        <Styled.Container>
            <Styled.ErrorReloadButton onClick={onClickResetButton}>
                <Icon icon={ReloadIcon} size={36} />
            </Styled.ErrorReloadButton>
            <QRCodeSVG value="" opacity={0.1} />
            <Styled.HelpMessage>아이콘 버튼을 눌러 재발급 받아보세요</Styled.HelpMessage>
        </Styled.Container>
    )
}

export default UserPaymentTokenQRCodeErrorFallback
