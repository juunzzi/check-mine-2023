import {InputHTMLAttributes} from 'react'

import * as Style from './style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorText: string
    isError: boolean
}

const Input = (props: InputProps) => {
    const {id, label, ...inputAttribute} = props

    return (
        <Style.Container>
            <Style.Label htmlFor={id}>{label}</Style.Label>
            <Style.Input id={id} {...inputAttribute} />
        </Style.Container>
    )
}

export default Input
