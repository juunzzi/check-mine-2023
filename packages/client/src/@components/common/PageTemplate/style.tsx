import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div`
    ${({theme}) => css`
        background-color: ${theme.colors.background_3};
    `}
`

export const Inner = styled.div`
    width: 100%;
    min-width: 340px;
    max-width: 700px;
    min-height: 100vh;

    margin: 0 auto;

    ${({theme}) => css`
        background-color: ${theme.colors.white_100};
    `}
`
