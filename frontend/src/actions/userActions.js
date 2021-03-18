import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_RESET,

    USER_DETAIL_BY_ID_REQUEST,
    USER_DETAIL_BY_ID_SUCCESS,
    USER_DETAIL_BY_ID_FAIL,
    USER_UPDATE_BY_ID_REQUEST,
    USER_UPDATE_BY_ID_SUCCESS,
    USER_UPDATE_BY_ID_FAIL,
    USER_UPDATE_BY_ID_RESET,
} from '../constants/userConstants'
import {ORDER_DETAIL_RESET,ORDER_LIST_RESET} from '../constants/orderConstants'

import axios from 'axios'

export const userLogin = (email,password) => async (dispatch) => {

    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        const {data} = await axios.post('/api/users/login',
        { 'username': email, 'password': password },
        {
            headers: {
                'Content-type': 'application/json'
            }
        }
        )

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

//logout action creator
export const userLogout = () => (dispatch) => {

    localStorage.removeItem('userInfo')

    dispatch({
        type: USER_LOGOUT
    })

    dispatch({
        type: USER_PROFILE_RESET
    })
    dispatch({
        type: USER_LIST_RESET
    })
    dispatch({
        type: ORDER_DETAIL_RESET
    })
    dispatch({
        type: ORDER_LIST_RESET
    })
}


export const userRegister = (name,email,password) => async (dispatch) => {

    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })

        const {data} = await axios.post('/api/users/register',
        { 'username': email, 'email': email, 'password': password,'first_name':name },
        {
            headers: {
                'Content-type': 'application/json'
            }
        }
        )

        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload: data
        })

        //Once register successfully, dispatch an action to update userLogin state with register response dataset. 
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const getUserProfile = () => async (dispatch,getState) => {

    try {
        dispatch({
            type:USER_PROFILE_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.get(`/api/users/profile`,        
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        )

        dispatch({
            type:USER_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const updateUserProfile = (userObj) => async (dispatch,getState) => {

    try {
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.put(`/api/users/profile/update`, 
        userObj,       
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        //update userLogin state with updated userInfo as well as localStorage
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

//Admin
export const getUserList = () => async (dispatch,getState) => {
    try {
        dispatch({
            type:USER_LIST_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.get(`/api/users/`,               
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const deleteUser = (userId) => async (dispatch,getState) => {

    try {
        dispatch({
            type:USER_DELETE_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.delete(`/api/users/delete/${userId}/`,            
        {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data,
        })
        dispatch({
            type: USER_DELETE_RESET
        })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const getUserDetailById = (userId) => async (dispatch,getState) => {

    try {
        dispatch({
            type:USER_DETAIL_BY_ID_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.get(`/api/users/${userId}/`,        
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        )

        dispatch({
            type:USER_DETAIL_BY_ID_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAIL_BY_ID_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}

export const updateUserById = (userObj,userId) => async (dispatch,getState) => {

    try {
        dispatch({
            type:USER_UPDATE_BY_ID_REQUEST
        })

        const {userInfo} = getState().userLogin
        const {data} = await axios.put(`/api/users/${userId}/update/`, 
        userObj,       
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        },
        )

        dispatch({
            type:USER_UPDATE_BY_ID_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_UPDATE_BY_ID_RESET
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_BY_ID_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    } 
}