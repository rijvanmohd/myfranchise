import axios from 'axios';

const info = JSON.parse(localStorage.getItem('info'))

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

/**
It contains all the api related to products such as add product and product list
 */

export const ProductAPI = {
    getAll: function(seller_id) {
        return axiosInstance.request({
            method:"GET",
            url:`/api/product/${seller_id}/`,
            headers: { 
                'Content-Type':'application/json',
                'Authorization':`Token ${info.token}`
                }
        })
    },
    sell: function(product_id) {
        return axiosInstance.request({
            method:"PUT",
            url:`/api/product/${product_id}/`,
            headers: { 
                'Content-Type':'application/json',
                'Authorization':`Token ${info.token}`
                }
        })
    },
    create: function(product) {
        return axiosInstance.request({
            method:"POST",
            url:`/api/product/`,
            data: product,
            headers: { 
                'Content-Type':'application/json',
                'Authorization':`Token ${info.token}`
                }
        })
    },
    delete: function(product_id) {
        return axiosInstance.request({
            method:"DELETE",
            url:`/api/product/${product_id}/`,
            headers: { 
                'Content-Type':'application/json',
                'Authorization':`Token ${info.token}`
                }
        })
    },

}


