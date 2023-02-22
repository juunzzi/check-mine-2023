import {MouseEvent, PropsWithChildren} from 'react'
import ReactDOM from 'react-dom'
import Dimmed from 'src/@components/common/Dimmed'

import * as Styled from './style'

export interface ModalProps {
    closeModal?: () => void
}

function Modal(props: PropsWithChildren<ModalProps>) {
    const {closeModal, children} = props

    const onClickDimmed = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal?.()
        }
    }

    return ReactDOM.createPortal(
        <Dimmed role="dialog" onClick={onClickDimmed}>
            <Styled.Root>{children}</Styled.Root>
        </Dimmed>,
        document.getElementById('root') as Element,
    )
}

export default Modal
