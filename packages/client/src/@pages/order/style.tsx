import styled from '@emotion/styled'

export const Container = styled.div`
    position: relative;

    width: 100%;

    padding: 10px;
`

export const OrderProductItemWrapper = styled.div`
    padding: 20px;

    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const OrderButtonWrapper = styled.div`
    width: 100%;

    max-width: 700px;

    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    padding: 10px;
`
