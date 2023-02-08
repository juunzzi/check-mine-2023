export const toastStatus = ['error', 'warning', 'success'] as const

export const isToastStatus = (status: string): status is ToastStatus => {
    return toastStatus.some((value) => status === value)
}

export type ToastStatus = (typeof toastStatus)[number]

export interface Toast {
    id: string
    message: string
    isActive: boolean
    status: ToastStatus
}
