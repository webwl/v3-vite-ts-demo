import axios from 'axios'
axios.defaults.baseURL = 'http://124.220.34.251:5250'

export const login = {
    $apiLogin: ({ nickName, password }) => {
        return axios.post('/auth/login', {
            nickName,
            password,
        })
    },
}
