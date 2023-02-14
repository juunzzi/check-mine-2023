const BarcodeSessionStore = (() => {
    const store = {} as Record<number, string>

    return {
        setUserBarcode: (id: number, token: string) => {
            store[id] = token
        },
        breakUserBarcode: (id: number) => {
            delete store[id]
        },
        hasUserBarcode: (id: number) => {
            return Boolean(store[id])
        },
        isValidBarcode: (id: number, token: string) => {
            return store[id] === token
        },
    }
})()

export default BarcodeSessionStore
