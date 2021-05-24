import axios from 'axios';

const info = localStorage.getItem('info')

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

/**
It contains all the api related to user i.e. login, details etc.
 */
export const UserAPI = {
    login: function(user) {
        return axiosInstance.request({
            method:"POST",
            url:`/api/auth/login/`,
            data: user,
            headers: { 
                'Content-Type':'application/json'
                }
        })
    }
}