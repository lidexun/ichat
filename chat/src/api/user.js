import http from '../utils/axios.js'

export function login(params) {
  return http.post('/login', params)
}

export function register(params) {
  return http.post('/register', params)
}

export function search(params) {
  return http.get('/search', { params })
}

export function message(params) {
  return http.post('/message', params)
}
export function getMessage(params) {
  return http.get('/message')
}
