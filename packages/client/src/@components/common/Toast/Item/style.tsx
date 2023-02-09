import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {ToastStatus} from 'src/@components/common/Toast/type'

export const Container = styled.div<{status: ToastStatus; isActive: boolean}>`
    position: relative;

    width: 200px;

    padding: 20px 10px;

    border-radius: 4px;

    ${({theme}) => css`
        color: ${theme.colors.white_100};
    `}

    ${({status, theme}) => {
        if (status === 'error') {
            return css`
                background-color: ${theme.colors.red_800};
            `
        }

        if (status === 'success') {
            return css`
                background-color: ${theme.colors.green_500};
            `
        }

        if (status === 'warning') {
            return css`
                background-color: ${theme.colors.orange_500};
            `
        }
    }}

    ${({isActive}) => {
        return isActive
            ? css`
                  animation: fade-in 1.2s ease-in both;
              `
            : css`
                  animation: fade-out 1.2s ease-in both;
              `
    }}
`

export const Message = styled.div`
    overflow-x: scroll;

    padding: 5px;
`

export const Close = styled.div`
    position: absolute;
    top: 2px;
    right: 5px;

    cursor: pointer;
`

export const ProgressContainer = styled.div`
    width: 190px;

    position: absolute;
    left: 50%;
    bottom: 2px;
    transform: translateX(-50%);

    ${({theme}) => css`
        background-color: ${theme.colors.white_100};
    `}
`

export const Progress = styled.div<{progress: number}>`
    ${({progress, theme}) => css`
        width: ${progress}%;

        border: 1.5px solid ${theme.colors.light_grey_200};
    `}
`
