import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row,Col,Image,ListGroup,Button,Card, Form,ListGroupItem } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {addItemToCart, removeItemFromCart} from '../actions/cartActions'
import ErrorMessage from '../components/ErrorMessage'

const CartScreen = ({history}) => {
    const cart = useSelector(state => state.cart.cart)
    const login = useSelector(state => state.userLogin)
    const {userInfo} = login
    
    const dispatch=useDispatch()

    const onRemoveClicked = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const onClickHandler = () => {
        if (userInfo===null) {
            history.push('/login')
        } else {
            history.push('/shipping')
        }
    }

    const content = cart.length !== 0 
                    ? <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                {cart.map(cartItem => (
                                    <ListGroupItem key={cartItem._id}>
                                        <Row className="mt-3">
                                            <Col sm={5} md={4} lg={2}>
                                                <LinkContainer to={`/Product/${cartItem._id}`}>
                                                    <Image src={`/static${cartItem.image}`} alt={cartItem.name} fluid />
                                                </LinkContainer> 
                                            </Col>
                                            <Col sm={3} md={4} lg={3}><Row className="cartItem-brand">{cartItem.brand}</Row><Row>{cartItem.name}</Row></Col>
                                            <Col sm={3} md={4} lg={2} className="cartItem-brand"><strong>${cartItem.price}</strong></Col>
                                            <Col sm={6} md={6} lg={4}>
                                                <Row className="mx-5">
                                                <Form.Control
                                                className="mb-2"
                                                    as="select"
                                                    value={cartItem.qty}
                                                    onChange={e => dispatch(addItemToCart(cartItem._id,parseInt(e.target.value)))}
                                                >
                                                    
                                                {                                        
                                                    [...Array(cartItem.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }              
                                                </Form.Control>    
                                                </Row>

                                                <Row className="mt-3">
                                                    <Col sm={4} md={6}><button type="button" className="btn btn-light mb-2" data-mdb-ripple-color="dark">LIKE</button></Col>
                                                    <Col className="verticalLine" sm={4} md={6}><button type="button" className="btn btn-light mb-2" data-mdb-ripple-color="dark" onClick={() => {onRemoveClicked(cartItem._id)}}>REMOVE</button></Col>
                                                </Row>                     
                                            </Col> 
                                        </Row>
                                    </ListGroupItem>

                                ))}
                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card className="text-dark">
                                <ListGroup>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Merchandise Subtotal:</Col>
                                            <Col className="placeorder-name">${cart.reduce((acc,curr)=> acc + curr.qty*parseFloat(curr.price),0).toFixed(2)}</Col>
                                        </Row> 
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Shipping & Handling:</Col>
                                            <Col className="placeorder-name">TBD</Col>
                                        </Row> 
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>GST/HST</Col>
                                            <Col className="placeorder-name">TBD</Col>
                                        </Row> 
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col><strong>Estimate Total:</strong></Col>
                                            <Col className="placeorder-name"><h5>${cart.reduce((acc,curr)=> acc + curr.qty*parseFloat(curr.price),0).toFixed(2)}</h5></Col>
                                        </Row> 
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Button
                                            type="button"
                                            className="btn-block my-2"
                                            disabled={cart.length === 0 ? true : false}
                                            onClick={onClickHandler}>
                                            Proceed to checkout
                                        </Button>                            
                                    </ListGroupItem>        
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    : <ErrorMessage variant={"info"}>No item in cart</ErrorMessage>
    
    return (
        <div>
            <h1 className="text-dark mb-4">SHOPPING CART</h1>
            {content}
        </div>
    )
}

export default CartScreen
