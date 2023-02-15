import {css} from '@emotion/react'
import styled from '@emotion/styled'

export const Container = styled.div`
    width: 80px;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const CounterValue = styled.div`
    flex: 1;

    text-align: center;
`

export const CounterButton = styled.button`
    font-size: 1rem;
    text-align: center;

    cursor: pointer;

    padding: 2px 6px;

    border-radius: 4px;

    transition: 0.2s background-color;

    ${({theme}) => css`
        box-shadow: ${theme.shadow.type_3};

        &:hover {
            background-color: ${theme.colors.primary_300};
            color: ${theme.colors.white_100};
        }
    `}
`

export const PlusCounterButton = styled(CounterButton)``

export const MinusCounterButton = styled(CounterButton)``
