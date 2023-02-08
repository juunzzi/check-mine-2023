import axios from 'axios'

export const API_URL = `${process.env.REACT_APP_API_URL}/api`

export const client = axios.create({
    baseURL: API_URL,
})
