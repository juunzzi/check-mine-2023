import {useQuery} from '@tanstack/react-query'
import PRODUCT_API from 'src/@domain/product/api'

const QUERY_KEY = {
    getProducts: 'getProducts',
}

export const useFetchProducts = () => {
    const {data: response} = useQuery([QUERY_KEY.getProducts], PRODUCT_API.getAll)

    return {
        products: response?.data?.products,
    }
}
