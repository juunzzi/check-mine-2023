import {useQueryClient} from '@tanstack/react-query'
import {AxiosError} from 'axios'
import {RES_MSG} from 'payment_common/module/constant'
import {Component, PropsWithChildren} from 'react'
import {NavigateFunction, useNavigate} from 'react-router-dom'
import {parseMessageCodeInAxiosError} from 'src/@domain/module/api'
import {PATH} from 'src/Router'

export interface ErrorBoundaryFallbackProps {
    error?: Error | AxiosError | null
    resetErrorState: () => void
}
export type ErrorBoundaryWithoutHooksProps = PropsWithChildren<{
    navigate: NavigateFunction
    clearQueryClient: () => void
    fallback: React.FC<ErrorBoundaryFallbackProps>
}>

export type ErrorBoundaryProps = PropsWithChildren<{
    fallback: React.FC<ErrorBoundaryFallbackProps>
}>

interface ErrorBoundaryState {
    error: Error | null
}

class ErrorBoundaryWithoutHooks extends Component<ErrorBoundaryWithoutHooksProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        error: null,
    }

    resetErrorState = () => {
        this.setState({error: null})
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {error}
    }

    componentDidCatch(error: Error): void {
        if (!error) {
            return
        }

        const {messageCode} = parseMessageCodeInAxiosError(error)

        if (messageCode === RES_MSG.AUTHORIZATION_ERROR) {
            this.props.navigate(PATH.LOGIN)
            this.props.clearQueryClient()

            this.setState({error: null})
        }
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

const ErrorBoundary = (props: ErrorBoundaryProps) => {
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const clearQueryClient = () => {
        queryClient.clear()
    }

    return <ErrorBoundaryWithoutHooks navigate={navigate} clearQueryClient={clearQueryClient} {...props} />
}

export default ErrorBoundary
