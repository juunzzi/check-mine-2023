import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Root = styled.div`
    max-width: 300px;
    width: 100%;

    padding: 24px;

    display: flex;
    flex-direction: column;

    border-radius: 12px;

    ${({theme}) => css`
        background-color: ${theme.colors.white_100};
    `}
`

export const ModalTop = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
`
