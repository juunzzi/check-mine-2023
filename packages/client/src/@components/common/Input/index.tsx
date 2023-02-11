import {InputHTMLAttributes} from 'react'

import * as Styled from './style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorText?: string
    isError?: boolean
}

const Input = (props: InputProps) => {
    const {id, label, errorText, isError, ...inputAttribute} = props

    return (
        <Styled.Container isError={isError}>
            <Styled.Label htmlFor={id}>{label}</Styled.Label>
            <Styled.Input id={id} {...inputAttribute} />
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

Input.Select = (props: SelectInputProps) => {
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

export default Input
