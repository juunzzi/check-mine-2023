import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div`
    width: 100%;
    height: 130px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    padding: 20px;

    border-radius: 8px;

    ${({theme}) => css`
        box-shadow: ${theme.shadow.type_2};
        color: ${theme.colors.grey_400};
    `}
`

export const Image = styled.img`
    max-width: 90px;
    width: 28%;

    aspect-ratio: 1/1;
    object-fit: cover;

    border-radius: 8px;
`

export const Name = styled.div`
    flex: 1;

    text-align: center;
    font-weight: bold;
    white-space: nowrap;
`

export const CounterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    font-size: 0.9rem;
`

export const PriceAndStockWrapper = styled.div`
    & > p:last-child {
        font-size: 0.8rem;
        text-align: center;

        ${({theme}) => css`
            color: ${theme.colors.grey_200};
        `}
    }
`
