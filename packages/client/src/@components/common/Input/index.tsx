import {InputHTMLAttributes} from 'react'

import * as Styled from './style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorText: string
    isError: boolean
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

export default Input
