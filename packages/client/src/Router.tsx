import {lazy, Suspense} from 'react'
import {Routes, Route} from 'react-router-dom'
import PageLoadingFallback from 'src/@components/common/PageLoadingFallback'
import AccountCreatePage from 'src/@pages/account/create'
import ProfilePage from 'src/@pages/profile'

export const PATH = {
    MAIN: '/',
    LOGIN: '/login',
    JOIN: '/join',
    PAYMENT: '/payment',
    PROFILE: '/profile',
    ACCOUNT_CREATE: '/account/create',
    NOT_FOUND: '/*',
} as const

const MainPage = lazy(() => import('src/@pages/main'))
const LoginPage = lazy(() => import('src/@pages/login'))
const JoinPage = lazy(() => import('src/@pages/join'))
const PaymentPage = lazy(() => import('src/@pages/payment'))
const NotFoundPage = lazy(() => import('src/@pages/not-found'))

const Router = () => {
    return (
        <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
                <Route path={PATH.MAIN} element={<MainPage />} />
                <Route path={PATH.LOGIN} element={<LoginPage />} />
                <Route path={PATH.JOIN} element={<JoinPage />} />
                <Route path={PATH.PAYMENT} element={<PaymentPage />} />
                <Route path={PATH.PROFILE} element={<ProfilePage />} />
                <Route path={PATH.ACCOUNT_CREATE} element={<AccountCreatePage />} />
                <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default Router
