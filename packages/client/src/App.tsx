import {Global, ThemeProvider} from '@emotion/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {BrowserRouter} from 'react-router-dom'
import ErrorBoundary from 'src/@components/common/ErrorBoundary'
import LoadingProvider from 'src/@components/common/Loading/provider'
import ToastProvider from 'src/@components/common/Toast/Provider'
import ErrorPage from 'src/@pages/error'
import globalStyle from 'src/common/styles/globalStyle'
import theme from 'src/common/styles/theme'
import Router from 'src/Router'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            retry: false,
            useErrorBoundary: true,
            staleTime: Infinity,
        },
        mutations: {
            useErrorBoundary: true,
        },
    },
})

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <LoadingProvider>
                        <ToastProvider>
                            <ErrorBoundary fallback={ErrorPage}>
                                <Global styles={globalStyle} />
                                <Router />
                            </ErrorBoundary>
                        </ToastProvider>
                    </LoadingProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
