export interface User {
    id: number
    email: string
    name: string
    payPoint: number
    password: string
    accountId: number | null
    hasValidBarcodeToken: boolean
}

export interface Barcode {
    barcodeToken: string
}
