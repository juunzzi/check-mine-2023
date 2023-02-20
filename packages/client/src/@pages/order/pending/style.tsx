import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'

export const Container = styled.div`
    min-height: 80vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: 20px;
`

export const OrderStatus = styled.div`
    font-size: 1.5rem;

    ${({theme}) => css`
        color: ${theme.colors.primary_300};
    `}

    -webkit-animation: bounce-top 1.2s infinite alternate-reverse both;
    animation: bounce-top 1.2s infinite alternate-reverse both;
`

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

export const Button = styled(Link)`
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
