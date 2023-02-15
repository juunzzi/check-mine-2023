import {css, Theme} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div`
    min-height: 80vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    text-align: center;

    ${({theme}) => css`
        color: ${theme.colors.grey_200};
    `}
`

export const Link = (theme: Theme) => css`
    width: 100px;
    color: ${theme.colors.primary_300};
    text-align: center;
`
