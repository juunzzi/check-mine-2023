import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div`
    width: 320px;

    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 28px;

    border-radius: 12px;

    ${({theme}) => css`
        box-shadow: ${theme.shadow.type_6};
    `}
`

export const UserPointAndAccountContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 28px;

    padding: 12px;
    border-radius: 12px;

    ${({theme}) => css`
        color: ${theme.colors.white_100};
        background-color: ${theme.colors.primary_200};
    `}
`

export const UserPointAndAccountLabel = styled.div`
    padding: 4px 0;

    font-size: 1.1rem;
`
