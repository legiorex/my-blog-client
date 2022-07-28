import axios, { AxiosRequestConfig } from 'axios'
import { baseURL } from 'config'
import { getToken } from 'utils'

const instance = axios.create({
  baseURL,
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers) {
    config.headers = {}
  }

  config.headers.Authorization = getToken() || ''
  return config
})

export default instance
