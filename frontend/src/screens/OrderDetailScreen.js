import React, {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Row,Col,Image,ListGroup,Card, ListGroupItem,Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {getOrderDetail, payOrder, deliverOrder} from '../actions/orderActions'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import { PayPalButton } from "react-paypal-button-v2"
import {ORDER_LIST_ADMIN_RESET, ORDER_DETAIL_RESET, ORDER_LIST_RESET} from '../constants/orderConstants'

const OrderDetailScreen = ({match,history}) => {

    const orderId = parseInt(match.params.id)
    //once sdkReady is true, we want to show the paypal button on browser, otherwise the sdk will be in loading status. 
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetail = useSelector(state => state.orderDetail)
    const { order, error: orderDetailError, loading: orderDetailLoading } = orderDetail
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay,error: payError } = orderPay
    const orderDeliver = useSelector(state => state.orderDeliver)
    const { success: successDelivered, error: deliverError} = orderDeliver

    const dispatch = useDispatch()

    //always make sure the user has logged in
    const login = useSelector(state => state.userLogin)
    const {userInfo} = login

    if (userInfo===null) {
        history.push('/login')
    }

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

    
    //fetch order detail by orderId only when the current state doesn't have orderDetail or doesn't match with the target order    
    // useEffect(() => {
    //     const paypalScript = document.getElementById('paypalButtons')
    //     if (!order || successPay ||successDelivered || orderId !== order._id) {
    //         dispatch(getOrderDetail(orderId))
    //     } else if (!order.isPaid) {
    //         if (!paypalScript) {
    //             addPayPalScript()
    //         } else {
    //             setSdkReady(true)
    //         }
    //     }
    // }, [order,orderId,successPay,successDelivered])

    useEffect(() => {
        if (!order || successDelivered || orderId !== order._id) {
            dispatch(getOrderDetail(orderId))
        }
    }, [order,orderId,successDelivered])

    const markDeliveredHandler = () => {
        dispatch(deliverOrder(orderId))
        dispatch({
            type: ORDER_DETAIL_RESET 
        })        
        dispatch({
            type: ORDER_LIST_ADMIN_RESET
        })
        dispatch({
            type: ORDER_LIST_RESET
        })
    }

    return orderDetailLoading ? (<Loader />)
           : orderDetailError ? (<ErrorMessage variant="danger">{orderDetailError}</ErrorMessage>)
           : order ? (
            <div className="mt-4">
                <h2 className="text-dark">Thank you for your order!</h2>
                <h3>ORDER NUMBER: {orderId}</h3>
                <Row>
                    <Col className="mb-4" md={8} lg={6}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2 className="mb-2"><strong>Shipping address</strong></h2>
                                <h5>{`${order.shipping.address}, ${order.shipping.city}, ${order.shipping.province} ${order.shipping.postalCode}`}</h5>
                                {order.isDelivered
                                    ? <ErrorMessage variant="success">{`Your order has been delivered at ${order.deliveredAt}`}</ErrorMessage>
                                    : <ErrorMessage variant='info'>Your order has not been shipped yet</ErrorMessage>
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2 className="mb-2"><strong>Customer contact</strong></h2>
                                <h5>{`Customer name: ${order.user.first_name}`}</h5>
                                <h5>{`Customer email: ${order.user.email}`}</h5>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2><strong>Payment method</strong></h2>
                                <h5>{order.paymentMethod}</h5>
                                {order.isPaid
                                    ? <ErrorMessage variant="success">{`Paid at: ${order.paidAt}`}</ErrorMessage>
                                    : <ErrorMessage variant="danger">No payment has been made</ErrorMessage> 
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2 className="mb-2"><strong>order detail</strong></h2>
                                <ListGroup variant="flush">
                                        {order.orderitems.map(orderItem => (
                                            <ListGroupItem key={orderItem._id}>
                                                <Row>
                                                    <Col md={3} sm={4}>
                                                        <LinkContainer to={`/Product/${orderItem.product}`}>
                                                            <Image src={orderItem.image} alt={orderItem.name} fluid />
                                                        </LinkContainer> 
                                                    </Col>
                                                    <Col className="placeorder-name" md={4}>{orderItem.name}</Col>
                                                    <Col md={4}>{orderItem.qty} X ${orderItem.price} = ${(parseFloat(orderItem.price)*orderItem.qty).toFixed(2)}</Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}
                                </ListGroup>
                            </ListGroupItem>
                        </ListGroup>                    
                    </Col>

                    <Col className="mx-auto" sm={10} md={10} lg={5}>
                        <Card>                    
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <Row>
                                        <h2 className="m-auto"><strong>order summary</strong></h2>          
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Items:</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroupItem>
            
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping:</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row> 
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Tax:</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row> 
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Total:</Col>
                                        <Col className="placeorder-name">${order.totalPrice}</Col>
                                    </Row> 
                                </ListGroupItem>
                                {userInfo.is_staff && !order.isDelivered && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>
                                                <Button className="btn my-2" variant="primary" type="button" block onClick={markDeliveredHandler}>
                                                    mark as delivered 
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}

                            </ListGroup>
                        </Card>
                        {deliverError && (<ErrorMessage variant="danger">{deliverError}</ErrorMessage>)}            

                        {/* If the user is not the one who created the order, Paypal buttons won't show*/}
                        {/* {!order.isPaid && (order.user.id === userInfo.id) && (
                            <div className="my-3">
                                {loadingPay && (
                                    <Loader />
                                )}
                                {payError && (<ErrorMessage variant="danger">{payError}</ErrorMessage>)}
                                {sdkReady ? <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={(details) => {
                                                    dispatch(payOrder(orderId, details.payer.name.given_name))
                                                }}
                                            />
                                        : <Loader /> }
                            </div>
                        )} */}
                        <ListGroupItem>
                            <ErrorMessage variant='warning'>PayPal buttons are disabled for live demo.</ErrorMessage>
                        </ListGroupItem>

                        <Row>                            
                            <Col><Link to="/profile" className="btn btn-dark mx-5 mt-4">my orders</Link></Col>
                            {userInfo.is_staff && (<Col><Link to="/admin/orders" className="btn btn-dark mx-5 mt-4">all orders</Link></Col>)}
                        </Row>                        
                    </Col>
                </Row>
            </div>
            )
            : null
}

export default OrderDetailScreen
