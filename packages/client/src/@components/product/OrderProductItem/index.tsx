import {MouseEventHandler} from 'react'
import Counter from 'src/@components/common/Counter'
import {OrderProduct} from 'src/@domain/types/order'
import {Product} from 'src/@domain/types/product'

import * as Styled from './style'

interface OrderProductItemProps extends Product {
    quantity: number
    changeProductQuantity: (args: OrderProduct) => void
}

const OrderProductItem = (props: OrderProductItemProps) => {
    const {id, name, price, stock, quantity, changeProductQuantity} = props

    const onClickMinusButton: MouseEventHandler<HTMLButtonElement> = () => {
        changeProductQuantity({id, quantity: quantity - 1})
    }

    const onClickPlusButton: MouseEventHandler<HTMLButtonElement> = () => {
        if (stock - quantity === 0) {
            return
        }

        changeProductQuantity({id, quantity: quantity + 1})
    }

    return (
        <Styled.Container>
            <Styled.Image src="http://www.bizforms.co.kr/form/image/thumb_ing.gif" />
            <Styled.Name>{name}</Styled.Name>
            <Styled.CounterWrapper>
                <Styled.PriceAndStockWrapper>
                    <p>{price.toLocaleString('ko-kr')}원</p>
                    <p>({stock - quantity}개)</p>
                </Styled.PriceAndStockWrapper>
                <Counter
                    value={quantity}
                    onClickMinusButton={onClickMinusButton}
                    onClickPlusButton={onClickPlusButton}
                />
            </Styled.CounterWrapper>
        </Styled.Container>
    )
}

export default OrderProductItem
