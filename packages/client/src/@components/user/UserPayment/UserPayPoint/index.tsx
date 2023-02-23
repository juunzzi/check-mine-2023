import {Suspense} from 'react'
import UserPayPointLoadingFallback from 'src/@components/user/UserPayment/UserPayPoint/loading-fallback'
import {useFetchMe} from 'src/@domain/hooks/user'

import * as Styled from './style'

const NakedUserPayPoint = () => {
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

const UserPayPoint = () => {
    return (
        <Suspense fallback={<UserPayPointLoadingFallback />}>
            <NakedUserPayPoint />
        </Suspense>
    )
}

export default UserPayPoint
