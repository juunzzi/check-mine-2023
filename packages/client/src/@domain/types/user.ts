export type PaymentTokenStatus = 'initialize' | 'pending' | 'success' | 'failure' | 'nonexistent'

export interface User {
    id: number
    email: string
    name: string
    payPoint: number
    password: string
    accountId: number | null
    payment: {
        status: PaymentTokenStatus
    }
}

export interface AccessToken {
    accessToken: string
}

export interface PaymentToken {
    paymentToken: string
}
