import {client} from 'src/@domain/module/api'
import {Product} from 'src/@domain/product/types'

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
