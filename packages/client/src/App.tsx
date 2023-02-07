import {Global, ThemeProvider} from '@emotion/react'
import {BrowserRouter} from 'react-router-dom'
import Router from 'src/Router'
import globalStyle from 'src/styles/globalStyle'
import theme from 'src/styles/theme'

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Global styles={globalStyle} />
                <Router />
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
