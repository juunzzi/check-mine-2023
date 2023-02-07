import {Routes, Route} from 'react-router-dom'
import JoinPage from 'src/@pages/join'
import LoginPage from 'src/@pages/login'
import MainPage from 'src/@pages/main'
import NotFoundPage from 'src/@pages/not-found'
import PaymentPage from 'src/@pages/payment'

export const PATH = {
    MAIN: '/',
    LOGIN: '/login',
    JOIN: '/join',
    PAYMENT: '/payment',
    NOT_FOUND: '*',
} as const

const Router = () => {
    return (
        <Routes>
            <Route path={PATH.MAIN} element={<MainPage />} />
            <Route path={PATH.LOGIN} element={<LoginPage />} />
            <Route path={PATH.JOIN} element={<JoinPage />} />
            <Route path={PATH.PAYMENT} element={<PaymentPage />} />
            <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
    )
}

export default Router
