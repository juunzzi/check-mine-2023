import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div``

export const UserPaymentContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    -webkit-animation: slide-in-bottom 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-in-bottom 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

export const UserPaymentHeader = styled.div`
    padding: 8px;

    border-radius: 20px;

    cursor: pointer;

    ${({theme}) => css`
        color: ${theme.colors.primary_300};
        border: 1px ${theme.colors.primary_300} solid;

        &:hover {
            background-color: ${theme.colors.background_1};
        }
    `}
`
