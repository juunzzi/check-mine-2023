import {BANK} from 'payment_common/module/constant'
import {FormEventHandler} from 'react'
import {useAccountCreateForm} from 'src/@components/account/AccountCreateForm/hooks'
import Button from 'src/@components/common/Button'
import {EncryptionInput, Input, SelectInput} from 'src/@components/common/Input'
import {
    AccountCreateInputStatus,
    ChangeAccountCreateInputArgs,
    ChangeAccountCreateInputErrorArgs,
} from 'src/@pages/account/create/hooks'

import * as Styled from './style'

export interface AccountCreateFormProps extends AccountCreateInputStatus {
    changeAccountCreateInput: (args: ChangeAccountCreateInputArgs) => void
    changeAccountCreateInputError: (args: ChangeAccountCreateInputErrorArgs) => void
    submitAccountCreateForm: FormEventHandler<HTMLFormElement>
}

const AccountCreateForm = (props: AccountCreateFormProps) => {
    const {number, amount, bankName, isAmountError, isNumberError, submitAccountCreateForm} = props

    const {
        handler: {onChangeBankName, onChangeAccountNumber, onChangeAmount},
    } = useAccountCreateForm(props)

    return (
        <Styled.FormConainer onSubmit={submitAccountCreateForm}>
            <SelectInput
                id="account-create-bank-select"
                value={bankName}
                onChange={onChangeBankName}
                label="은행 선택"
                optionList={BANK}
            />
            <EncryptionInput
                id="account-create-number-input"
                value={number}
                onChange={onChangeAccountNumber}
                placeholder="계좌 번호를 입력해주세요 ( - 포함 )"
                label="계좌 번호"
                isError={isNumberError}
                errorText="계좌 번호 형식을 맞춰주세요"
                maxLength={20}
                required
            />
            <Input
                id="account-create-amount-input"
                value={amount.toLocaleString('ko-kr')}
                onChange={onChangeAmount}
                placeholder="계좌 금액를 입력해주세요"
                label="계좌 금액 (최대 200만원까지)"
                isError={isAmountError}
                errorText="200만원까지 가능합니다."
                maxLength={10}
                required
            />
            <Button>계좌생성</Button>
        </Styled.FormConainer>
    )
}

export default AccountCreateForm
