import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_RESET,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_RESET,

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

export const productListReducer = (state = {},action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true}

        case PRODUCT_LIST_SUCCESS:
            return {
                loading:false,
                products: action.payload,                
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case PRODUCT_LIST_RESET:
            return {

            }
        default:
            return state
    }
}

export const productDetailsReducer = (state = {},action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                error: action.payload,
            }
        case PRODUCT_DETAILS_RESET:
            return {

            }
        default:
            return state    
    }
}

//ADMIN
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                loading:true,                   
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading:false,
                success: true,
            }
        case PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_DELETE_RESET:
            return {

            }    
        default :
            return state    
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {
                loading:true,                   
            }
        case PRODUCT_CREATE_SUCCESS:
            return {
                loading:false,
                success: true,
            }
        case PRODUCT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case PRODUCT_CREATE_RESET:
            return { }    

        default :
            return state    
    }
}

export const productUpdateByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_BY_ID_REQUEST:
            return {
                loading:true,                   
            }
        case PRODUCT_UPDATE_BY_ID_SUCCESS:
            return {
                loading:false,
                success: true,
            }
        case PRODUCT_UPDATE_BY_ID_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_UPDATE_BY_ID_RESET:
            return {}

        default :
            return state    
    }
}

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}
