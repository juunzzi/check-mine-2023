import Placeholder from 'src/@components/common/Placeholder'

import * as Styled from './style'

const OrderProductListLoadingFallback = () => {
    return (
        <Styled.OrderProductItemWrapper>
            <Placeholder width="100%" height="100px" />
            <Placeholder width="100%" height="100px" />
            <Placeholder width="100%" height="100px" />
            <Placeholder width="100%" height="100px" />
        </Styled.OrderProductItemWrapper>
    )
}

export default OrderProductListLoadingFallback
