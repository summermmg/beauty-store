import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,

    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
    CART_CLEAR,
} from '../constants/cartConstants'

const shippingAddressFromStorage = localStorage.getItem('shippingDetail') ?
    JSON.parse(localStorage.getItem('shippingDetail')) : {} 

export const cartReducer = (state={ },action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const found = state.cart.find(item => item._id === action.payload._id) 
            if (found) {
                return {
                    ...state,
                    cart: state.cart.map(itm => {
                        if (itm._id === found._id) {
                            //the action.payload.qty has been updated in component
                            return action.payload
                        } else {
                            return itm
                        }
                    })
                }
            } else {
                return {
                    ...state,
                    cart: [
                        ...state.cart,
                        action.payload
                    ]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cart: state.cart.filter(item => item._id !== action.payload._id)
            }

        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shipping: action.payload,
                //action payload is an object contains shipping address
            }    

        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }    
            
        case CART_CLEAR:
            return {                
                cart: [],
                shipping: shippingAddressFromStorage,
            }    

        default:
            return state    
    }

}