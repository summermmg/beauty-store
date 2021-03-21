import React, {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Row,Col,Image,ListGroup,Button,Card, ListGroupItem } from 'react-bootstrap'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import CheckoutSteps from '../components/CheckoutSteps'
import {LinkContainer} from 'react-router-bootstrap'
import {createOrder} from '../actions/orderActions'
import { PayPalButton } from "react-paypal-button-v2"
import {ORDER_CREATE_RESET} from '../constants/orderConstants'

const PlaceOrderScreen = ({history}) => {
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, loading, error, success } = orderCreate
    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const cartInfo = useSelector(state => state.cart)
    const shippingInfo = cartInfo.shipping
    const {paymentMethod,cart} = cartInfo

    const login = useSelector(state => state.userLogin)
    const {userInfo} = login
    
    //toFixed() returns a string. 
    //update state 
    cartInfo.itemsPrice = cart.reduce((acc,curr)=> acc + curr.qty*parseFloat(curr.price),0).toFixed(2)
    cartInfo.shippingPrice = (cartInfo.itemsPrice >= 100 ? 0 : 10).toFixed(2)
    cartInfo.taxPrice = Number(cartInfo.itemsPrice * 0.13).toFixed(2)

    cartInfo.totalPrice = (Number(cartInfo.itemsPrice) + Number(cartInfo.shippingPrice) + Number(cartInfo.taxPrice)).toFixed(2)

    if (!paymentMethod) {
        history.push('/payment')
    }

    if (userInfo===null) {
        history.push('/login')
    }

    //PayPal button disabled for live demo
    // const addPayPalScript = () => {
    //     const script = document.createElement('script')
    //     script.type = 'text/javascript'
    //     script.id = 'paypalButtons'
    //     script.src =  "https://www.paypal.com/sdk/js?client-id=test"
    //     script.async = true
    //     document.body.appendChild(script)
    //     script.onload = () => {
    //         //the local state SdkReady is like a toggle of showing the third party PayPal button. 
    //         setSdkReady(true) 
    //     }        
    // }

    // useEffect(() => {
    //     const paypalScript = document.getElementById('paypalButtons')
    //     if (!paypalScript) {
    //         addPayPalScript()
    //     } else if (success) {
    //         history.push(`/order/${order._id}`)
    //         dispatch({ type: ORDER_CREATE_RESET })
    //     } else {
    //         setSdkReady(true)
    //     } 
    // }, [success, history,order])

    //place order function for live demo
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, history,order])

    const createOrderWithoutPayHandler = () => {
        dispatch(createOrder({
            orderItems: cart,
            shipping: shippingInfo,
            paymentMethod: paymentMethod,
            itemsPrice: cartInfo.itemsPrice,
            taxPrice: cartInfo.taxPrice,
            shippingPrice: cartInfo.shippingPrice,
            totalPrice: cartInfo.totalPrice,
            ispaid: false,
        }))
    }


    // const createOrderPaidHandler = (paypalResponseName) => {
    //     dispatch(createOrder({
    //         orderItems: cart,
    //         shipping: shippingInfo,
    //         paymentMethod: paymentMethod,
    //         itemsPrice: cartInfo.itemsPrice,
    //         taxPrice: cartInfo.taxPrice,
    //         shippingPrice: cartInfo.shippingPrice,
    //         totalPrice: cartInfo.totalPrice,
    //         ispaid: 'now', 
    //     }))
    // }

    return (
        <div className="mt-4">
            <Row>
                <Col md={2}><CheckoutSteps login shipping payment placeorder/></Col>
                <Col className="mb-4" md={6} lg={6}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2 className="mb-2"><strong>Shipping Address</strong></h2>
                            <h5>{`Shipping: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.province} ${shippingInfo.postcode}`}</h5>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2><strong>Payment Method</strong></h2>
                            <h5>Method: {paymentMethod}</h5>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2 className="mb-2"><strong>Order Detail</strong></h2>
                            <ListGroup variant="flush">
                                    {cart.map(cartItem => (
                                        <ListGroupItem key={cartItem._id}>
                                            <Row>
                                                <Col sm={4} md={4}>
                                                    <LinkContainer to={`/Product/${cartItem._id}`}>
                                                        {/* Image get from frontend */}
                                                        <Image src={`/static${cartItem.image}`} alt={cartItem.name} fluid />
                                                    </LinkContainer> 
                                                </Col>
                                                <Col className="placeorder-name" md={4}>{cartItem.name}</Col>
                                                <Col md={4}>{cartItem.qty} X ${cartItem.price} = ${(parseFloat(cartItem.price)*cartItem.qty).toFixed(2)}</Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                            </ListGroup>
                        </ListGroupItem>
                    </ListGroup>                    
                </Col>

                <Col className="mx-auto" md={4} lg={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <Row>
                                    <h2 className="m-auto"><strong>Order Summary</strong></h2>          
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cartInfo.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
        
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cartInfo.shippingPrice}</Col>
                                </Row> 
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cartInfo.taxPrice}</Col>
                                </Row> 
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col className="placeorder-name">${cartInfo.totalPrice}</Col>
                                </Row> 
                            </ListGroupItem>
                            
                            {/* {sdkReady ? 
                            <ListGroupItem> 
                                <PayPalButton                                    
                                    amount={cartInfo.totalPrice}
                                    onSuccess={(details) => createOrderPaidHandler(details.payer.name.given_name)}
                                />
                            </ListGroupItem>
                           
                            : <Loader /> 
                            } */}
                            
                            <ListGroupItem>
                                <ErrorMessage variant='warning'>PayPal buttons are disabled for live demo.</ErrorMessage>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        <Button className="btn my-2" variant="primary" type="button" block onClick={createOrderWithoutPayHandler}>
                                            order now and pay later
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>                        
                    </Card>
                    {loading && <Loader />}
                    {error && <ErrorMessage variant={'danger'}>{error}</ErrorMessage>}        
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
