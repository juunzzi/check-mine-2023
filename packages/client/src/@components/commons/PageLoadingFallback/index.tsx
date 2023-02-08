import {useLocation} from 'react-router-dom'
import JoinPageLoadingFallback from 'src/@pages/join/loading-fallback'
import LoginPageLoadingFallback from 'src/@pages/login/loading-fallback'
import MainPageLoadingFallback from 'src/@pages/main/loading-fallback'
import NotFoundPageLoadingFallback from 'src/@pages/not-found/loading-fallback'
import PaymentPageLoadingFallback from 'src/@pages/payment/loading-fallback'
import {PATH} from 'src/Router'

const PageLoadingFallback = () => {
    const {pathname} = useLocation()

    if (pathname === PATH.MAIN) {
        return <MainPageLoadingFallback />
    }

    if (pathname === PATH.LOGIN) {
        return <LoginPageLoadingFallback />
    }

    if (pathname === PATH.JOIN) {
        return <JoinPageLoadingFallback />
    }

    if (pathname === PATH.PAYMENT) {
        return <PaymentPageLoadingFallback />
    }

    return <NotFoundPageLoadingFallback />
}

export default PageLoadingFallback
