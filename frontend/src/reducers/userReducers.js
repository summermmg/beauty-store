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
    USER_UPDATE_PROFILE_RESET,

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
    USER_DETAIL_BY_ID_RESET,
    USER_UPDATE_BY_ID_REQUEST,
    USER_UPDATE_BY_ID_SUCCESS,
    USER_UPDATE_BY_ID_FAIL,
    USER_UPDATE_BY_ID_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading:true,                   
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading:false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {
                userInfo: null,
            }

        default :
            return state    
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading:true,                   
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading:false,
                userInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {
                
            }

        default :
            return state    
    }
}

export const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {
                loading:true,                   
            }
        case USER_PROFILE_SUCCESS:
            return {
                loading:false,
                user: action.payload
            }
        case USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_PROFILE_RESET:
            return {

            }    

        default :
            return state    
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading:true,                   
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading:false,
                userInfo: action.payload,
                success: true,
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_UPDATE_PROFILE_RESET:
            return {}

        default :
            return state    
    }
}

//ADMIN
export const userListReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {
                loading:true,                   
            }
        case USER_LIST_SUCCESS:
            return {
                loading:false,
                users: action.payload
            }
        case USER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LIST_RESET:
            return {
            } 
        default :
            return state    
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {
                loading:true,                   
            }
        case USER_DELETE_SUCCESS:
            return {
                loading:false,
                success: true,
            }
        case USER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_DELETE_RESET:
            return {

            }    
        default :
            return state    
    }
}

export const userDetailByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAIL_BY_ID_REQUEST:
            return {
                loading:true,                   
            }
        case USER_DETAIL_BY_ID_SUCCESS:
            return {
                loading:false,
                user: action.payload
            }
        case USER_DETAIL_BY_ID_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_DETAIL_BY_ID_RESET:
            return {

            }    

        default :
            return state    
    }
}

export const userUpdateByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_BY_ID_REQUEST:
            return {
                loading:true,                   
            }
        case USER_UPDATE_BY_ID_SUCCESS:
            return {
                loading:false,
                success: true,
            }
        case USER_UPDATE_BY_ID_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_UPDATE_BY_ID_RESET:
            return {}

        default :
            return state    
    }
}