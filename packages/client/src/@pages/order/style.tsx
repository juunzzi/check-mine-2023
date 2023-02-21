import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'

export const Container = styled.div`
    width: 100%;
    min-height: 80vh;

    position: relative;

    padding: 10px;
`

export const OrderButtonWrapper = styled.div`
    width: 100%;

    max-width: 700px;

    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    padding: 10px;
`

export const ErrorContainer = styled.div`
    min-height: 80vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
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
