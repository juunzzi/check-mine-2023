import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useToast} from 'src/@components/common/Toast/hooks'
import {useMutateOrderDomain} from 'src/@domain/hooks/order'
import {useFetchProducts} from 'src/@domain/hooks/product'
import {OrderProduct} from 'src/@domain/types/order'
import useSearchParams from 'src/common/hooks/useSearchParams'
import {PATH} from 'src/Router'

export type OrderProductMapState = Record<number, OrderProduct>

export const useOrderPage = () => {
    const navigate = useNavigate()

    const {showToastMessage} = useToast()

    const token = useSearchParams('qrcode')

    const [orderProductsMap, setOrderProductsMap] = useState<OrderProductMapState>({})

    const {products} = useFetchProducts()

    const {createOrder} = useMutateOrderDomain()

    const amount = useMemo(
        () =>
            products?.reduce((prev, {id, price}) => {
                return orderProductsMap[id] ? prev + price * orderProductsMap[id].quantity : prev
            }, 0),
        [products, orderProductsMap],
    )

    const changeProductQuantity = ({id, quantity}: OrderProduct) => {
        if (quantity < 0 || quantity > 100) {
            return
        }

        setOrderProductsMap((prev) => ({
            ...prev,
            [id]: {
                id,
                quantity,
            },
        }))
    }

    const submitCreateOrder = async () => {
        if (!token) {
            showToastMessage('결제 정보를 확인해주세요', 'error')

            return
        }

        if (amount === 0) {
            showToastMessage('결제할 상품을 선택해주세요', 'error')

            return
        }

        if (!confirm(`${amount}를 결제하시겠습니까?`)) {
            return
        }

        await createOrder({barcode: token, orderProducts: Object.values(orderProductsMap)})

        navigate(PATH.MAIN)
    }

    return {
        state: {
            orderProductsMap,
            products,
        },
        handler: {
            changeProductQuantity,
            submitCreateOrder,
        },
        etc: {
            amount,
        },
    }
}
