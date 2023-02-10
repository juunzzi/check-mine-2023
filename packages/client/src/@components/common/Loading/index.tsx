import ReactDOM from 'react-dom'
import Dimmed from 'src/@components/common/Dimmed'
import Icon, {LogoIcon} from 'src/@components/common/Icon'

import * as Styled from './style'

const Loading = () => {
    return ReactDOM.createPortal(
        <Dimmed>
            <Styled.Root>
                <Icon icon={LogoIcon} />
            </Styled.Root>
        </Dimmed>,
        document.querySelector('#root') as Element,
    )
}

export default Loading
