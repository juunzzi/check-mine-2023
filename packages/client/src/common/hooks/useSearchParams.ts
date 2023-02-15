import {useLocation} from 'react-router-dom'

const useSearchParams = (key: string) => {
    const {search} = useLocation()

    const param = new URLSearchParams(search).get(key)

    return param
}

export default useSearchParams
