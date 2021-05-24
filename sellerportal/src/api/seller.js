import axios from 'axios';

const info = localStorage.getItem('info')

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

/**
It contains all the api related to seller i.e. login, details etc.
 */
export const SellerAPI = {
    login: function(seller) {
        return axiosInstance.request({
            method:"POST",
            url:`/api/auth/sellerlogin/`,
            data: seller,
            headers: { 
                'Content-Type':'application/json'
                }
        })
    }
}