import {RES_MSG} from 'payment_common/module/constant'
import {ErrorBoundaryFallbackProps} from 'src/@components/common/ErrorBoundary'
import Icon, {MainIcon} from 'src/@components/common/Icon'
import PageTemplate from 'src/@components/common/PageTemplate'
import {parseMessageCodeInAxiosError} from 'src/@domain/api'
import {PATH} from 'src/Router'

import * as Styled from './style'

const OrderPageErrorFallback = (props: ErrorBoundaryFallbackProps) => {
    const {error} = props

    const {messageCode} = parseMessageCodeInAxiosError(error)

    return (
        <PageTemplate>
            <Styled.ErrorContainer>
                <Styled.ErrorMessage>
                    {messageCode === RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN && <p>결제 정보가 갱신되었습니다.</p>}
                    {messageCode === RES_MSG.LOAD_PRODUCT_FAILURE && <p>상품 정보를 불러오는데 실패했습니다.</p>}
                    {!messageCode && <p>결제에 문제가 발생했어요.</p>}
                    <p>메인 화면으로 이동해주세요</p>
                </Styled.ErrorMessage>
                <Styled.ButtonWrapper>
                    <Styled.Button to={PATH.MAIN}>
                        <Icon icon={MainIcon} size={28} />
                        <span>메인으로</span>
                    </Styled.Button>
                </Styled.ButtonWrapper>
            </Styled.ErrorContainer>
        </PageTemplate>
    )
}

export default OrderPageErrorFallback
