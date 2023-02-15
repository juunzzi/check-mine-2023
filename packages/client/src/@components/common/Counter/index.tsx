import {MouseEventHandler} from 'react'

import * as Styled from './style'

interface CounterProps {
    value: number
    onClickPlusButton: MouseEventHandler<HTMLButtonElement>
    onClickMinusButton: MouseEventHandler<HTMLButtonElement>
}

const Counter = (props: CounterProps) => {
    const {value, onClickMinusButton, onClickPlusButton} = props

    return (
        <Styled.Container>
            <Styled.MinusCounterButton type="button" onClick={onClickMinusButton}>
                -
            </Styled.MinusCounterButton>
            <Styled.CounterValue>{value}</Styled.CounterValue>
            <Styled.PlusCounterButton type="button" onClick={onClickPlusButton}>
                +
            </Styled.PlusCounterButton>
        </Styled.Container>
    )
}

export default Counter
