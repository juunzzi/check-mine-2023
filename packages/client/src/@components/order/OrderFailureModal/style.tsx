import {css, Theme} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div`
    width: 100%;
    min-height: 200px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 24px;
`

export const Message = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;

    ${({theme}) => css`
        color: ${theme.colors.grey_400};

        & > p:last-child {
            color: ${theme.colors.grey_100};
            font-weight: normal;
            font-size: 0.9rem;
        }
    `}
`

export const SubMessage = styled.div`
    ${({theme}) => css`
        color: ${theme.colors.light_grey_200};
    `}
`

export const LinkButtonWrapper = styled.div`
    display: flex;

    gap: 20px;
`

export const LinkButton = (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    font-size: 0.9rem;

    color: ${theme.colors.primary_300};

    cursor: pointer;
`
