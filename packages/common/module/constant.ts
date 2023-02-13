export const RES_MSG = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    INPUT_TYPE_ERROR: 'INPUT_TYPE_ERROR',

    CREATE_ACCOUNT_INPUT_ERROR: 'CREATE_ACCOUNT_INPUT_ERROR',

    EDIT_USER_INPUT_ERROR: 'EDIT_USER_INPUT_ERROR',
    CREATE_USER_INPUT_ERROR: 'CREATE_USER_INPUT_ERROR',
    DUPLICATE_EMAIL: 'DUPLICATE_EMAIL',
} as const

export type RES_MSG_TYPE = (typeof RES_MSG)[keyof typeof RES_MSG]

export const isResMsgType = (resMsg: any): resMsg is RES_MSG_TYPE => {
    return Object.values(RES_MSG).includes(resMsg)
}

export const BANK = ['국민은행', '신한은행', '토스뱅크'] as const

export type Bank = (typeof BANK)[number]

export const BARCODE_TOKEN_EXPIRATION = 15 * 60 * 1000
