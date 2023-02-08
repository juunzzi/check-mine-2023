import {lazy, Suspense} from 'react'
import {Routes, Route} from 'react-router-dom'
import PageLoadingFallback from 'src/@components/common/PageLoadingFallback'

export const PATH = {
    MAIN: '/',
    LOGIN: '/login',
    JOIN: '/join',
    PAYMENT: '/payment',
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
                <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default Router
