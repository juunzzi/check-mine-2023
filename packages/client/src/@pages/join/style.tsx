import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'

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

export const LoginLink = styled(Link)`
    font-size: 0.95rem;

    ${({theme}) => css`
        color: ${theme.colors.grey_100};

        transition: 0.5s color;

        &:hover {
            color: ${theme.colors.primary_300};
        }
    `}
`
