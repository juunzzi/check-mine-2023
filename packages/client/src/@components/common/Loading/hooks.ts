import {useContext} from 'react'
import {LoadingContext} from 'src/@components/common/Loading/provider'

export const useLoading = () => {
    return useContext(LoadingContext)
}
