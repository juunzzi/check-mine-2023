import axios, {AxiosError, AxiosResponse} from 'axios'
import {USER_ATHORIZATION_TOKEN_KEY} from 'src/@domain/api/user'

export const API_URL = `${process.env.REACT_APP_API_URL}/api`

export const client = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem(USER_ATHORIZATION_TOKEN_KEY)}`,
    },
})

export const hasAxiosResponseAxiosErrorType = (error: any): error is AxiosError => {
    return Boolean(error.response)
}

export const hasErrorMessageAxiosResponseType = (
    errorResponse: AxiosResponse | undefined,
): errorResponse is AxiosResponse<{message: string}> => {
    return Boolean(errorResponse && errorResponse?.data?.message)
}
