import {useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {ErrorBoundaryFallbackProps} from 'src/@components/common/ErrorBoundary'
import Icon, {MainIcon, ReloadIcon} from 'src/@components/common/Icon'
import PageTemplate from 'src/@components/common/PageTemplate'
import {PATH} from 'src/Router'

import * as Styled from './style'

const ErrorPage = (props: ErrorBoundaryFallbackProps) => {
    const {resetErrorState} = props

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const onClickResetButton = () => {
        resetErrorState()

        queryClient.clear()
    }

    const onClickMainButton = () => {
        resetErrorState()

        navigate(PATH.MAIN)
    }

    return (
        <PageTemplate hasHeader={false}>
            <Styled.Containter>
                <Styled.ErrorMessage>
                    <p>서비스에 문제가 발생했어요!</p>
                    <p>다시 시도하시거나 메인 화면으로 이동해주세요</p>
                </Styled.ErrorMessage>
                <Styled.ButtonWrapper>
                    <Styled.Button onClick={onClickResetButton}>
                        <Icon icon={ReloadIcon} size={28} />
                        <span>다시 시도하기</span>
                    </Styled.Button>
                    <Styled.Button onClick={onClickMainButton}>
                        <Icon icon={MainIcon} size={28} />
                        <span>메인으로</span>
                    </Styled.Button>
                </Styled.ButtonWrapper>
            </Styled.Containter>
        </PageTemplate>
    )
}

export default ErrorPage
