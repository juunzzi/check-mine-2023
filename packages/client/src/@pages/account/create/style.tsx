import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div`
    height: 80vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 20px;
`

export const FormLabel = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
`

export const Warning = styled.div`
    font-size: 0.95rem;

    ${({theme}) => css`
        color: ${theme.colors.grey_100};
    `}
`
