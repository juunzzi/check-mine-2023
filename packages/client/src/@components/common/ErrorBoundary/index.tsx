import {useQueryClient} from '@tanstack/react-query'
import {Component, PropsWithChildren} from 'react'
import {useNavigate} from 'react-router-dom'
import Icon, {MainIcon, ReloadIcon} from 'src/@components/common/Icon'
import PageTemplate from 'src/@components/common/PageTemplate'
import {PATH} from 'src/Router'

import * as Styled from './style'

export interface ErrorBoundaryProps {
    onReset?: () => void
    onEscape?: () => void
}

interface ErrorBoundaryState {
    error: Error | null
}

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        error: null,
    }

    onClickReset = () => {
        this.props.onReset?.()
        this.setState({error: null})
    }

    onClickMain = () => {
        this.props.onEscape?.()
        this.setState({error: null})
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {error}
    }

    render() {
        const {children} = this.props

        const {error} = this.state

        if (error) {
            return (
                <PageTemplate>
                    <Styled.Containter>
                        <Styled.ErrorMessage>
                            <p>서비스에 문제가 발생했어요!</p>
                            <p>다시 시도하시거나 메인 화면으로 이동해주세요</p>
                        </Styled.ErrorMessage>
                        <Styled.ButtonWrapper>
                            <Styled.Button onClick={this.onClickReset}>
                                <Icon icon={ReloadIcon} size="28" />
                                <span>다시 시도하기</span>
                            </Styled.Button>
                            <Styled.Button onClick={this.onClickMain}>
                                <Icon icon={MainIcon} size="28" />
                                <span>메인으로</span>
                            </Styled.Button>
                        </Styled.ButtonWrapper>
                    </Styled.Containter>
                </PageTemplate>
            )
        }

        return children
    }
}

const ErrorBoundaryWithHooks = (props: PropsWithChildren) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const resetError = () => {
        queryClient.clear()
    }

    const routeMain = () => {
        navigate(PATH.MAIN)
    }

    return <ErrorBoundary onReset={resetError} onEscape={routeMain} {...props} />
}

export default ErrorBoundaryWithHooks
