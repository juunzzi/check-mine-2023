import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div<{isError: boolean}>`
    width: 330px;

    display: flex;
    flex-direction: column;
    gap: 2px;

    ${({isError, theme}) => css`
        color: ${isError ? theme.colors.red_800 : 'inherit'};

        & > input {
            border: 1px ${isError ? theme.colors.red_800 : theme.colors.light_grey_200} solid;
        }
    `}
`

export const Label = styled.label`
    font-size: 0.95rem;
`

export const Input = styled.input`
    padding: 8px 5px;

    border-radius: 4px;

    &::placeholder {
        font-size: 0.8rem;
    }
`

export const Error = styled.div<{isError: boolean}>`
    font-size: 0.7rem;

    ${({isError}) => css`
        visibility: ${isError ? 'none' : 'hidden'};
    `}
`
