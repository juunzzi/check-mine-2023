import {RES_MSG} from 'payment_common/module/constant'
import {useEffect, useMemo, useState} from 'react'
import {useToast} from 'src/@components/common/Toast/hooks'
import {useMutateOrderDomain} from 'src/@domain/hooks/order'
import {useFetchPaymentTokenStatus, useMutateUserDomain} from 'src/@domain/hooks/user'
import {OrderProduct} from 'src/@domain/types/order'
import useSearchParams from 'src/common/hooks/useSearchParams'

export type OrderProductMapState = Record<number, OrderProduct>

export const useOrderPage = () => {
    const {showToastMessage} = useToast()

    const token = useSearchParams('qrcode')

    const {status, refetchPaymentTokenStatus} = useFetchPaymentTokenStatus({token, refetchInterval: 3000})

    const [orderProductsMap, setOrderProductsMap] = useState<OrderProductMapState>({})

    const {createOrder} = useMutateOrderDomain()

    const {startPaymentToken} = useMutateUserDomain()

    useEffect(() => {
        startPaymentToken({paymentToken: token}).then(({message}) => {
            if (message === RES_MSG.FAILURE) {
                refetchPaymentTokenStatus()
            }
        })
    }, [])

    useEffect(() => {
        if (status === 'failure') {
            refetchPaymentTokenStatus()
        }
    }, [status])

    const totalAmount = useMemo(
        () =>
            Object.values(orderProductsMap)?.reduce((prev, {amount}) => {
                return prev + amount
            }, 0),
        [orderProductsMap],
    )

    const changeProductQuantity = ({id, quantity, amount}: OrderProduct) => {
        if (quantity < 0 || quantity > 100) {
            return
        }

        setOrderProductsMap((prev) => ({
            ...prev,
            [id]: {
                id,
                quantity,
                amount,
            },
        }))
    }

    const submitCreateOrder = async () => {
        if (!token) {
            showToastMessage('결제 정보를 확인해주세요', 'error')

            return
        }

        if (totalAmount === 0) {
            showToastMessage('결제할 상품을 선택해주세요', 'error')

            return
        }

        if (!confirm(`${totalAmount}를 결제하시겠습니까?`)) {
            return
        }

        const orderProducts = Object.values(orderProductsMap).map(({id, quantity}) => ({id, quantity}))

        await createOrder({paymentToken: token, orderProducts})
    }

    return {
        state: {
            isShowSuccessModal: status === 'success',
            isShowFailureModal: status === 'failure',
            orderProductsMap,
        },
        handler: {
            changeProductQuantity,
            submitCreateOrder,
        },
        etc: {
            totalAmount,
        },
    }
}
