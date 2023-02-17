import {RES_MSG} from 'payment_common/module/constant'

export const avoidRepeatRequest = <T extends unknown[], R>(api: (...args: T) => Promise<R>) => {
    let isPending = false

    return async (...args: T) => {
        if (isPending) {
            alert('요청을 중복으로 보낼 수는 없습니다.')

            return {message: RES_MSG.FAILURE}
        }

        try {
            isPending = true

            const data = await api(...args)

            return data
        } finally {
            isPending = false
        }
    }
}
