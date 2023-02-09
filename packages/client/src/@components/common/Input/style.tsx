import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div`
    width: 280px;

    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const Label = styled.label`
    font-size: 0.8rem;
`

export const Input = styled.input`
    padding: 8px 5px;

    border-radius: 4px;

    ${({theme}) => css`
        border: 1px ${theme.colors.light_grey_200} solid;
    `}

    &::placeholder {
        font-size: 0.8rem;
    }
`

export const Error = styled.div``
