import {css} from '@emotion/react'
import styled from '@emotion/styled'

const Button = styled.button`
    width: 100%;
    padding: 10px;

    border: none;
    border-radius: 4px;

    transition: 0.5s opacity;

    &:hover {
        opacity: 0.7;
    }

    ${({theme}) => css`
        background-color: ${theme.colors.primary_400};
        color: ${theme.colors.white_100};
    `}
`

export default Button
