import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 8px;
`

export const HelpMessage = styled.div`
    font-size: 0.9rem;

    ${({theme}) => css`
        color: ${theme.colors.grey_200};
    `}
`

export const FloatButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`

export const ErrorReloadButton = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    cursor: pointer;

    z-index: 1;
`
