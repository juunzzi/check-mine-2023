const BarcodeTokenStore = (() => {
    const store = {} as Record<number, string>

    return {
        setToken: (id: number, token: string) => {
            store[id] = token
        },
        breakToken: (id: number) => {
            delete store[id]
        },
        hasValidToken: (id: number) => {
            return Boolean(store[id])
        },
        isValidToken: (id: number, token: string) => {
            return store[id] === token
        },
    }
})()

export default BarcodeTokenStore
