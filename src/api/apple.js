import axios from './index'

export const login = params => {
  return axios.request({
    url: '/auth/login',
    method: 'post',
    params
  })
}

export const getUserList = () => {
  return axios.request({
    url: '/users',
    method: 'GET'
  })
}
