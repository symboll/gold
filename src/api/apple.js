import axios from './index'

export const loginApi = data => {
  return axios.request({
    url: '/users/login',
    method: 'post',
    data
  })
}

// export const getUserList = () => {
//   return axios.request({
//     url: '/users',
//     method: 'get'
//   })
// }
export const userList = (data) => {
  return axios.request({
    url: '/users/list',
    method: 'post',
    data
  })
}

export const createUser = (data) => {
  return axios.request({
    url: '/users',
    method: 'post',
    data
  })
}

export const getUserInfo = (id, fields) => {
  return axios.request({
    url: '/users/' + id,
    method: 'get',
    params: {
      fields
    }
  })
}

export const updateUser = (id, data) => {
  return axios.request({
    url: '/users/' + id,
    method: 'put',
    data
  })
}
