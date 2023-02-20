import {Link} from 'react-router-dom'
import Icon, {MainIcon} from 'src/@components/common/Icon'
import Modal from 'src/@components/common/Modal'
import {PATH} from 'src/Router'

import * as Styled from './style'

const OrderSuccessModal = () => {
    return (
        <Modal>
            <Styled.Container>
                <Styled.Message>
                    <p>🎉 상품 결제에 성공했어요 🎉</p>
                </Styled.Message>

                <Styled.LinkButtonWrapper>
                    <Link to={PATH.MAIN} css={Styled.LinkButton}>
                        <Icon icon={MainIcon} size={24} />
                        <span>메인으로</span>
                    </Link>
                </Styled.LinkButtonWrapper>
            </Styled.Container>
        </Modal>
    )
}

export default OrderSuccessModal
