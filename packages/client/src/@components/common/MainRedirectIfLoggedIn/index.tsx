import {PropsWithChildren} from 'react'
import {Navigate} from 'react-router-dom'
import {useFetchMe} from 'src/@domain/hooks/user'
import {PATH} from 'src/Router'

const MainRedirectIfLoggedIn = (props: PropsWithChildren) => {
    const {me, isInitialLoading} = useFetchMe()

    if (me && !isInitialLoading) {
        return <Navigate to={PATH.MAIN} replace />
    }

    return <>{props.children}</>
}

export default MainRedirectIfLoggedIn
