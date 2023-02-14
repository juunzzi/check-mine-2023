export interface User {
    id: number
    email: string
    name: string
    payPoint: number
    password: string
    accountId: number | null
    isValidBarcodeToken: boolean
}

export interface Barcode {
    barcodeToken: string
}
