import {InputHTMLAttributes, useState} from 'react'
import Icon, {EyeCloseIcon, EyeIcon} from 'src/@components/common/Icon'

import * as Styled from './style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorText?: string
    isError?: boolean
}

export const Input = (props: InputProps) => {
    const {id, label, errorText, isError, ...inputAttribute} = props

    return (
        <Styled.Container isError={isError}>
            <Styled.Label htmlFor={id}>{label}</Styled.Label>
            <Styled.Input id={id} {...inputAttribute} />
            <Styled.Error isError={isError}>{errorText}</Styled.Error>
        </Styled.Container>
    )
}

export const EncryptionInput = (props: InputProps) => {
    const {id, label, errorText, isError, type = 'password', ...inputAttribute} = props

    const [isEncryption, setIsEncryption] = useState(true)

    const onClickEncryptionButton = () => {
        setIsEncryption((prev) => !prev)
    }

    return (
        <Styled.Container isError={isError}>
            <Styled.Label htmlFor={id}>{label}</Styled.Label>
            <Styled.EncrytionInputWrapper>
                <Styled.Input id={id} type={isEncryption ? type : 'text'} {...inputAttribute} />
                <Styled.EncryptionButton onClick={onClickEncryptionButton}>
                    {isEncryption ? <Icon icon={EyeIcon} size="18" /> : <Icon icon={EyeCloseIcon} size="18" />}
                </Styled.EncryptionButton>
            </Styled.EncrytionInputWrapper>
            <Styled.Error isError={isError}>{errorText}</Styled.Error>
        </Styled.Container>
    )
}

interface SelectInputProps extends InputHTMLAttributes<HTMLSelectElement> {
    label: string
    optionList: any[] | readonly any[]
    errorText?: string
    isError?: boolean
}

export const SelectInput = (props: SelectInputProps) => {
    const {id, value, onChange, label, optionList, ...inputAttribute} = props

    return (
        <Styled.Container>
            <Styled.Label htmlFor={id}>{label}</Styled.Label>
            <Styled.SelectInput id={id} value={value} onChange={onChange} {...inputAttribute}>
                {optionList.map((optionValue) => (
                    <option key={optionValue} value={optionValue}>
                        {optionValue}
                    </option>
                ))}
            </Styled.SelectInput>
        </Styled.Container>
    )
}
