import {client} from 'src/@domain/api'
import {Product} from 'src/@domain/types/product'

export type GetProductsResponse = {
    data: {
        products: Product[]
    }
}

const PRODUCT_API = {
    getAll: async () => {
        const {data} = await client.get<GetProductsResponse>('/products')

        return data
    },
}

export default PRODUCT_API
