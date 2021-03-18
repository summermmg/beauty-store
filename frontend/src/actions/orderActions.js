import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_RESET,
    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_LIST_ADMIN_RESET ,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import {CART_CLEAR} from '../constants/cartConstants'

import axios from 'axios'

export const createOrder = (order) => async (dispatch,getState) => {

    try {
        dispatch({
            type:ORDER_CREATE_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.post(`/api/orders/add`, 
        order,       
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: ORDER_LIST_RESET
        })
        dispatch({
            type: ORDER_LIST_ADMIN_RESET
        })

        dispatch({
            type: CART_CLEAR,
        })

        localStorage.removeItem('cart')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const getOrderDetail = (orderId) => async (dispatch,getState) => {

    try {
        dispatch({
            type:ORDER_DETAIL_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.get(`/api/orders/${orderId}/`,               
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const payOrder = (orderId, paypalResponseName) => async (dispatch,getState) => {

    try {
        dispatch({
            type:ORDER_PAY_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.put(`/api/orders/${orderId}/pay/`,
        paypalResponseName,               
        {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        dispatch({
            type: ORDER_PAY_RESET,
        })
        dispatch({
            type: ORDER_LIST_ADMIN_RESET
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const getOrderList = () => async (dispatch,getState) => {
    try {
        dispatch({
            type:ORDER_LIST_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.get(`/api/orders/list`,               
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

//Admin
export const getOrderListAdmin = () => async (dispatch,getState) => {
    try {
        dispatch({
            type:ORDER_LIST_ADMIN_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.get(`/api/orders/admin/list`,               
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type: ORDER_LIST_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_ADMIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const deliverOrder = (orderId) => async (dispatch,getState) => {

    try {
        dispatch({
            type:ORDER_DELIVER_REQUEST
        })
        const deliver = true

        const {userInfo} = getState().userLogin
        const {data} = await axios.put(`/api/orders/${orderId}/deliver/`,      
        deliver,     
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })
        dispatch({
            type: ORDER_DELIVER_RESET,
        })

    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}
