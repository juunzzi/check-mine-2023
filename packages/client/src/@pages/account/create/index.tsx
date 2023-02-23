import AccountCreateForm from 'src/@components/account/AccountCreateForm'
import PageTemplate from 'src/@components/common/PageTemplate'
import {useAccountCreatePage} from 'src/@pages/account/create/hooks'

import * as Styled from './style'

const AccountCreatePage = () => {
    const {
        state: {accountCreateInput, accountCreateInputError},
        handler: {changeAccountCreateInput, changeAccountCreateInputError, submitAccountCreateForm},
    } = useAccountCreatePage()

    return (
        <PageTemplate>
            <Styled.Container>
                <Styled.FormLabel>계좌 생성</Styled.FormLabel>
                <Styled.Warning>계좌를 생성하시면 연동 계좌가 변경됩니다.</Styled.Warning>
                <AccountCreateForm
                    changeAccountCreateInput={changeAccountCreateInput}
                    changeAccountCreateInputError={changeAccountCreateInputError}
                    submitAccountCreateForm={submitAccountCreateForm}
                    {...accountCreateInput}
                    {...accountCreateInputError}
                />
            </Styled.Container>
        </PageTemplate>
    )
}

export default AccountCreatePage
