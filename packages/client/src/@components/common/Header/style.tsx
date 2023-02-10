import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'

export const Container = styled.div`
    padding: 10px 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Main = styled(Link)`
    cursor: pointer;
`

export const User = styled(Link)`
    cursor: pointer;
`

export const Profile = styled.div`
    font-weight: bold;
    font-size: 1.2rem;

    ${({theme}) => css`
        color: ${theme.colors.primary_300};
    `};
`
