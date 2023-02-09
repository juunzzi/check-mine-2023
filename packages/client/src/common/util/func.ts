import {RES_MSG} from 'payment_common/module/constant'

export const avoidRepeatRequest = <T extends unknown[], R>(api: (...args: T) => Promise<R>) => {
    const isPending: {
        current: boolean
    } = {
        current: false,
    }

    return async (...args: T) => {
        if (isPending.current) {
            alert('요청을 중복으로 보낼 수는 없습니다.')

            return {message: RES_MSG.FAILURE}
        }

        isPending.current = true

        const data = await api(...args)

        isPending.current = false

        return data
    }
}
