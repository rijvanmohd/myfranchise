import axios from 'axios';

const info = JSON.parse(localStorage.getItem('info'))

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

/**
It contains all the api related to seller and products such as seller details and products list
 */

export const SellerAPI = {
    getAll: function() {
        return axiosInstance.request({
            method:"GET",
            url:`/api/seller/`,
            headers: { 
                'Content-Type':'application/json',
                'Authorization':`Token ${info.token}`
                }
        })
    },
    create: function(seller) {
        return axiosInstance.request({
            method:"POST",
            url:`/api/seller/`,
            data: seller,
            headers: { 
                'Content-Type':'application/json',
                'Authorization':`Token ${info.token}`
                }
        })
    },
    delete: function(seller_id) {
        return axiosInstance.request({
            method:"DELETE",
            url:`/api/seller/${seller_id}/`,
            headers: { 
                'Content-Type':'application/json',
                'Authorization':`Token ${info.token}`
                }
        })
    },

}

export const ProductAPI = {
    getBySeller: function(sellerId) {
        return axiosInstance.request({
            method:"GET",
            url:`/api/product/${sellerId}/`,
            headers: { 
                'Content-Type':'application/json',
                'Authorization':`Token ${info.token}`
                }
        })
    }
}

