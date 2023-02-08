import {createContext, PropsWithChildren, useState} from 'react'
import uuid from 'react-uuid'
import {TOAST_LIST_MAX_LENGTH} from 'src/@components/commons/Toast/constant'
import ToastItem from 'src/@components/commons/Toast/Item'
import {Toast, ToastStatus} from 'src/@components/commons/Toast/type'

import * as Styled from './style'

interface ToastContextInterface {
    showToastMessage: (message: string, status: ToastStatus) => void
}

export const ToastContext = createContext<ToastContextInterface>({} as ToastContextInterface)

const ToastProvider = (props: PropsWithChildren) => {
    const {children} = props

    const [toastList, setToastList] = useState<Toast[]>([])

    const showToastMessage = (message: string, status: ToastStatus) => {
        setToastList((prev) => {
            const next =
                prev.length > TOAST_LIST_MAX_LENGTH
                    ? [...prev.slice(1), {id: uuid(), message, status, isActive: true}]
                    : [...prev, {id: uuid(), message, status, isActive: true}]

            return next
        })
    }

    const deleteToastItem = (id: string) => {
        setToastList((prev) => prev.filter((toastItem) => toastItem.id !== id))
    }

    const deactiveToastItem = (id: string) => {
        setToastList((prev) =>
            prev.map((toastItem) => (toastItem.id === id ? {...toastItem, isActive: false} : toastItem)),
        )
    }

    return (
        <ToastContext.Provider
            value={{
                showToastMessage,
            }}>
            <Styled.ToastListContainer>
                {toastList.map((toastInformation) => (
                    <ToastItem
                        key={toastInformation.id}
                        deactiveItem={deactiveToastItem}
                        deleteItem={deleteToastItem}
                        {...toastInformation}
                    />
                ))}
            </Styled.ToastListContainer>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider
