import {useLocation} from 'react-router-dom'
import AccountCreatePageLoadingFallback from 'src/@pages/account/create/loading-fallback'
import JoinPageLoadingFallback from 'src/@pages/join/loading-fallback'
import LoginPageLoadingFallback from 'src/@pages/login/loading-fallback'
import MainPageLoadingFallback from 'src/@pages/main/loading-fallback'
import NotFoundPageLoadingFallback from 'src/@pages/not-found/loading-fallback'
import OrderPageLoadingFallback from 'src/@pages/order/loading-fallback'
import OrderPendingPageLoadingFallback from 'src/@pages/order/pending/loading-fallback'
import ProfileLoadingFallback from 'src/@pages/profile/loading-fallback'
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

    if (pathname === PATH.PROFILE) {
        return <ProfileLoadingFallback />
    }

    if (pathname === PATH.ACCOUNT_CREATE) {
        return <AccountCreatePageLoadingFallback />
    }

    if (pathname === PATH.ORDER) {
        return <OrderPageLoadingFallback />
    }

    if (pathname === PATH.ORDER_PENDING_PAGE) {
        return <OrderPendingPageLoadingFallback />
    }

    return <NotFoundPageLoadingFallback />
}

export default PageLoadingFallback
