import {AxiosError} from 'axios'
import {Component, PropsWithChildren} from 'react'

export interface ErrorBoundaryFallbackProps {
    error?: Error | AxiosError | null
    resetErrorState: () => void
}
export interface ErrorBoundaryProps {
    fallback: React.FC<ErrorBoundaryFallbackProps>
}

interface ErrorBoundaryState {
    error: Error | null
}

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        error: null,
    }

    resetErrorState = () => {
        this.setState({error: null})
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {error}
    }

    render() {
        const {children, fallback: Fallback} = this.props

        const {error} = this.state

        if (error) {
            return <Fallback error={error} resetErrorState={this.resetErrorState} />
        }

        return children
    }
}

export default ErrorBoundary
