import {Suspense} from 'react'
import UserAccountLoadingFallback from 'src/@components/user/UserPayment/UserAccount/loading-fallback'
import {useFetchAccount} from 'src/@domain/hooks/account'

import * as Styled from './style'

const UserAccount = () => {
    const {account} = useFetchAccount()

    return (
        <Styled.Container>
            {account && (
                <Styled.AccountWrapper>
                    <Styled.AccountAmountWrapper>
                        <Styled.AccountLabel>출금계좌</Styled.AccountLabel>
                        <Styled.AccountAmount>{account?.amount.toLocaleString('ko-kr')}원</Styled.AccountAmount>
                    </Styled.AccountAmountWrapper>
                    <Styled.AccountNumber>
                        {account.bankName}({account.number.slice(0, 4)})
                    </Styled.AccountNumber>
                </Styled.AccountWrapper>
            )}
        </Styled.Container>
    )
}

export default () => {
    return (
        <Suspense fallback={<UserAccountLoadingFallback />}>
            <UserAccount />
        </Suspense>
    )
}