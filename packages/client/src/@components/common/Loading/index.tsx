import ReactDOM from 'react-dom'
import Dimmed from 'src/@components/common/Dimmed'
import logoImg from 'src/common/assets/img/logo-img.png'

import * as Styled from './style'

const Loading = () => {
    return ReactDOM.createPortal(
        <Dimmed>
            <Styled.Root>
                <img src={logoImg} alt="로고" width="120" />
            </Styled.Root>
        </Dimmed>,
        document.querySelector('#root') as Element,
    )
}

export default Loading
