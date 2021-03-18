import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateByIdReducer,
    productReviewCreateReducer,
} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {
    userLoginReducer,
    userRegisterReducer, 
    userProfileReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer, 
    userDetailByIdReducer,
    userUpdateByIdReducer, 
} from './reducers/userReducers'
import {
    orderCreateReducer,
    orderDetailReducer, 
    orderPayReducer, 
    orderListReducer, 
    orderListAdminReducer,
    orderDeliverReducer,
} from './reducers/orderReducers'

const rootReducer = combineReducers({  
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdateById: productUpdateByIdReducer,
    productReviewCreate: productReviewCreateReducer,

    cart:cartReducer,
    
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userDetailById: userDetailByIdReducer,
    userUpdateById: userUpdateByIdReducer,

    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderListAdmin: orderListAdminReducer,
    orderDeliver: orderDeliverReducer,
})
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const cartItemsFromStorage = localStorage.getItem('cart') ?
    JSON.parse(localStorage.getItem('cart')) : []    

const shippingAddressFromStorage = localStorage.getItem('shippingDetail') ?
    JSON.parse(localStorage.getItem('shippingDetail')) : {}  

const initialState = {
    cart: {
        cart: cartItemsFromStorage,
        shipping: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, initialState,composedEnhancer)

export default store