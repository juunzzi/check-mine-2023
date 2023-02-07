import {Global, ThemeProvider} from '@emotion/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {BrowserRouter} from 'react-router-dom'
import Router from 'src/Router'
import globalStyle from 'src/styles/globalStyle'
import theme from 'src/styles/theme'

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
                    <Global styles={globalStyle} />
                    <Router />
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
