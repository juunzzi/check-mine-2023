import {lazy, Suspense} from 'react'
import {Routes, Route, Outlet, Navigate} from 'react-router-dom'
import PageLoadingFallback from 'src/@components/common/PageLoadingFallback'
import {useFetchMe} from 'src/@domain/hooks/user'
import AccountCreatePage from 'src/@pages/account/create'
import ProfilePage from 'src/@pages/profile'

console.log()

export const PATH = {
    MAIN: '/',
    LOGIN: '/login',
    JOIN: '/join',
    ORDER: '/order',
    PROFILE: '/profile',
    ACCOUNT_CREATE: '/account/create',
    NOT_FOUND: '/*',
} as const

const MainPage = lazy(() => import('src/@pages/main'))
const LoginPage = lazy(() => import('src/@pages/login'))
const JoinPage = lazy(() => import('src/@pages/join'))
const OrderPage = lazy(() => import('src/@pages/order'))
const NotFoundPage = lazy(() => import('src/@pages/not-found'))

export const LoginRedirectIfNotLoggedIn = () => {
    const {me, isInitialLoading} = useFetchMe()

    if (!me && !isInitialLoading) {
        return <Navigate to={PATH.LOGIN} replace />
    }

    return <Outlet />
}

export const MainRedirectIfLoggedIn = () => {
    const {me, isInitialLoading} = useFetchMe()

    if (me && !isInitialLoading) {
        return <Navigate to={PATH.MAIN} replace />
    }

    return <Outlet />
}

export const MainRedirectIfNotCustomer = () => {
    if (prompt('비밀번호를 입력해주세요') !== process.env.REACT_APP_CUSTOMER_KEY) {
        return <Navigate to={PATH.MAIN} replace />
    }

    return <Outlet />
}

const Router = () => {
    return (
        <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
                <Route element={<MainRedirectIfLoggedIn />}>
                    <Route path={PATH.LOGIN} element={<LoginPage />} />
                    <Route path={PATH.JOIN} element={<JoinPage />} />
                </Route>
                <Route element={<MainRedirectIfNotCustomer />}>
                    <Route path={PATH.ORDER} element={<OrderPage />} />
                </Route>
                <Route element={<LoginRedirectIfNotLoggedIn />}>
                    <Route path={PATH.MAIN} element={<MainPage />} />
                    <Route path={PATH.PROFILE} element={<ProfilePage />} />
                    <Route path={PATH.ACCOUNT_CREATE} element={<AccountCreatePage />} />
                </Route>
                <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default Router
