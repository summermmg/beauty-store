import axios from 'axios'

import {
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,

    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addItemToCart = (productId,qty) => async(dispatch,getState) => {

    const {data} = await axios.get(`/api/products/${productId}/`)

    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            _id: data._id,
            name: data.name,
            price: data.price,
            image : data.image,
            brand: data.brand,
            countInStock:data.countInStock,
            qty
        },        
    })
    //after dispatch the action, the cart state updated. We store the update state to localStorage 
    localStorage.setItem('cart',JSON.stringify(getState().cart.cart))
} 


export const removeItemFromCart = (id) => (dispatch,getState) => {

    dispatch({
        type:CART_REMOVE_ITEM,
        payload: {
            _id:id
        },
    })

    localStorage.setItem('cart',JSON.stringify(getState().cart.cart))
}

export const saveShippingAddress = (shippingDetail) => (dispatch,getState) => {
    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: shippingDetail,
    })

    localStorage.setItem('shippingDetail',JSON.stringify(shippingDetail))
}


export const savePaymentMethod = (paymentMethod) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: paymentMethod,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}

