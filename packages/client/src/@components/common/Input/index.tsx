import {InputHTMLAttributes} from 'react'

import * as Style from './style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorText: string
    isError: boolean
}

const Input = (props: InputProps) => {
    const {id, label, errorText, isError, ...inputAttribute} = props

    return (
        <Style.Container isError={isError}>
            <Style.Label htmlFor={id}>{label}</Style.Label>
            <Style.Input id={id} {...inputAttribute} />
            <Style.Error isError={isError}>{errorText}</Style.Error>
        </Style.Container>
    )
}

export default Input
