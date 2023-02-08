import styled from '@emotion/styled'

export const ToastListContainer = styled.div`
    position: fixed;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);

    max-height: 100vh;

    padding: 10px;

    display: flex;
    flex-direction: column-reverse;
    gap: 5px;

    z-index: 1;
`
