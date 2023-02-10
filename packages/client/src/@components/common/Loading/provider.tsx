import {createContext, useState} from 'react'
import Loading from 'src/@components/common/Loading'

export const LoadingContext = createContext({
    showLoading: () => {},
    hideLoading: () => {},
})

const LoadingProvider = (props: React.PropsWithChildren) => {
    const {children} = props

    const [isLoading, setIsLoading] = useState(false)

    const showLoading = () => {
        setIsLoading(true)
    }

    const hideLoading = () => {
        setIsLoading(false)
    }

    return (
        <LoadingContext.Provider value={{showLoading, hideLoading}}>
            {children}
            {isLoading && <Loading />}
        </LoadingContext.Provider>
    )
}

export default LoadingProvider
