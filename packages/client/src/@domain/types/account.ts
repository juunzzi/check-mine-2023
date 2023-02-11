import {Bank} from 'payment_common/module/constant'

export interface Account {
    id: number
    bankName: Bank
    number: string
    amount: number
}
