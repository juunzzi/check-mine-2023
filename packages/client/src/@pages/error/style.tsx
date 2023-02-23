import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Containter = styled.div`
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
`

export const ErrorMessage = styled.div`
    text-align: center;

    ${({theme}) => css`
        color: ${theme.colors.grey_200};
        font-size: 0.95rem;

        & > p:first-child {
            color: ${theme.colors.grey_400};
            font-weight: bold;
            font-size: 1.4rem;
        }
    `}
`

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;

    border: none;

    cursor: pointer;

    font-size: 1rem;

    ${({theme}) => css`
        background-color: ${theme.colors.background_0};
        color: ${theme.colors.primary_300};
    `};
`
