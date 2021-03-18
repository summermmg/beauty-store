import axios from 'axios'

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_RESET,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_BY_ID_REQUEST,
    PRODUCT_UPDATE_BY_ID_SUCCESS,
    PRODUCT_UPDATE_BY_ID_FAIL,
    PRODUCT_UPDATE_BY_ID_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants'


export const fetchProducts = (keyword='') => async (dispatch) => {
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const response = await axios.get(`/api/products/${keyword}`)

        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload: response.data
        })
    } 
    catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


export const fetchProduct = (productId) => async (dispatch) => {
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const response = await axios.get(`/api/products/${productId}/`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:response.data
        })

    } catch(error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


//Admin
export const deleteProduct = (productId) => async (dispatch,getState) => {

    try {
        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.delete(`/api/products/delete/${productId}/`,            
        {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
        })
        dispatch({
            type: PRODUCT_DELETE_RESET
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const createProduct = (formData) => async (dispatch,getState) => {

    try {
        dispatch({
            type:PRODUCT_CREATE_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.post(`/api/products/add`, 
        formData,       
        {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: PRODUCT_CREATE_RESET
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const updateProductById = (formData,productId) => async (dispatch,getState) => {

    try {
        dispatch({
            type:PRODUCT_UPDATE_BY_ID_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.put(`/api/products/${productId}/update/`, 
        formData,       
        {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type:PRODUCT_UPDATE_BY_ID_SUCCESS,
            payload: data
        })
        dispatch({
            type: PRODUCT_UPDATE_BY_ID_RESET
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_BY_ID_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.post(`/api/products/${productId}/review/`, 
        review,       
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })
        dispatch({
            type: PRODUCT_CREATE_REVIEW_RESET,
        })        
        dispatch({
            type: PRODUCT_LIST_RESET
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

