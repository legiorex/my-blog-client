import axios, { AxiosError } from 'axios'
import { baseURL } from 'config'

const instance = axios.create({
  baseURL,
})
export type ErrorApi = AxiosError

export default instance
