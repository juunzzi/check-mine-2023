import {useEffect, useRef} from 'react'
import {TOAST_DELAY} from 'src/@components/common/Toast/constant'
import {useProgress} from 'src/@components/common/Toast/hooks'
import {Toast} from 'src/@components/common/Toast/type'

import * as Styled from './style'

interface ToastItemProps extends Toast {
    deleteItem: (id: string) => void
    deactiveItem: (id: string) => void
}

const ToastItem = (props: ToastItemProps) => {
    const {id, message, status, isActive, deleteItem, deactiveItem} = props

    const toastElement = useRef<HTMLDivElement>(null)

    const progress = useProgress(TOAST_DELAY)

    const onClickToastItem = () => {
        deactiveItem(id)
    }

    useEffect(() => {
        if (progress < 100) {
            return
        }

        deactiveItem(id)
    }, [progress])

    useEffect(() => {
        if (isActive || !toastElement.current) {
            return
        }

        toastElement.current.getAnimations().forEach((animation) => {
            animation.onfinish = () => {
                deleteItem(id)
            }
        })
    }, [isActive])

    return (
        <Styled.Container ref={toastElement} status={status} isActive={isActive}>
            <Styled.Close onClick={onClickToastItem}>x</Styled.Close>
            <Styled.Message>{message}</Styled.Message>
            <Styled.ProgressContainer>
                <Styled.Progress progress={progress} />
            </Styled.ProgressContainer>
        </Styled.Container>
    )
}

export default ToastItem
