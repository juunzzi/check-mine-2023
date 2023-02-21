import {Link} from 'react-router-dom'
import Icon, {MainIcon, ReloadIcon} from 'src/@components/common/Icon'
import Modal from 'src/@components/common/Modal'
import {PATH} from 'src/Router'

import * as Styled from './style'

const OrderFailureModal = () => {
    const onClickReloadButton = () => {
        window.location.reload()
    }

    return (
        <Modal>
            <Styled.Container>
                <Styled.Message>
                    <p>결제 정보가 갱신되었어요</p>
                    <p>새로운 결제 바코드를 스캔해주세요</p>
                </Styled.Message>

                <Styled.LinkButtonWrapper>
                    <Link to={PATH.MAIN} css={Styled.LinkButton}>
                        <Icon icon={MainIcon} size={24} />
                        <span>메인으로</span>
                    </Link>
                    <div onClick={onClickReloadButton} css={Styled.LinkButton}>
                        <Icon icon={ReloadIcon} size={24} />
                        <span>다시 시도</span>
                    </div>
                </Styled.LinkButtonWrapper>
            </Styled.Container>
        </Modal>
    )
}

export default OrderFailureModal
