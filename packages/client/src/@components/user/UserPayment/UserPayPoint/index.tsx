import {Suspense} from 'react'
import UserPayPointLoadingFallback from 'src/@components/user/UserPayment/UserPayPoint/loading-fallback'
import {useFetchMe} from 'src/@domain/hooks/user'

import * as Styled from './style'

const UserPayPoint = () => {
    const {me} = useFetchMe()

    return (
        <Styled.Container>
            {me && (
                <Styled.PayPointWrapper>
                    <Styled.PayPointLabel>보유잔액</Styled.PayPointLabel>
                    <Styled.PayPoint>{me.payPoint.toLocaleString('ko-kr')}원</Styled.PayPoint>
                </Styled.PayPointWrapper>
            )}
        </Styled.Container>
    )
}

export default () => {
    return (
        <Suspense fallback={<UserPayPointLoadingFallback />}>
            <UserPayPoint />
        </Suspense>
    )
}
