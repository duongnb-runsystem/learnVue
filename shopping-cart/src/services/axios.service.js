import { ENV_CONFIG } from '@/core/constants/app'
import axios from 'axios'

const instance = axios.create({
  headers: {
    'x-foody-client-type': '1',
    'x-foody-client-id': '',
    'x-foody-client-language': 'vi',
    'x-foody-client-version': '3.0.0',
    'x-foody-access-token': '',
    'x-foody-api-version': '1',
    'x-foody-app-type': '1004',
  }
})

// instance.interceptors.request.use(
//   async (config) => {
//     const token = 'your token'
//     if (token) {
//       config.headers = {
//         Authorization: `Bearer ${token}`
//       }
//     }
//     return config
//   },
//   (error) => {
//     Promise.reject(error)
//   }
// )

// instance.interceptors.response.use(
//   (response) => {
//     const statusCode = response?.data?.status_code

//     switch (statusCode) {
//       case 400:
//         return
//       case 401:
//         return

//       case 500:
//         return

//       default:
//       // return
//     }

//     return response?.data
//   },
//   (error) => {
//     return error
//   }
// )

const api = {
  get: (url, config = {}) => {
    return instance(url, { method: 'get', url, ...config })
  },
  post: (url, data, config) => {
    return instance(url, { method: 'post', url, data, ...config })
  }
}

export default api
