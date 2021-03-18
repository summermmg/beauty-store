import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Button, Form, Row, Col,Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import {getUserProfile, updateUserProfile} from '../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import { getOrderList } from '../actions/orderActions'

const ProfileScreen = ({history}) => {
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alert, setAlert] = useState(null)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userProfile = useSelector(state => state.userProfile)
    const { user,loading, error } = userProfile

    const updateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = updateProfile

    const orderList = useSelector(state => state.orderList)
    const { orders, loading:loadingOrders, error: getOrdersError } = orderList

    useEffect(() => {
        //if user haven't logged in, direct user to login page
        if (!userInfo || !userInfo.token) {
            history.push('/login')
        } else {
            if (!user || user.id !== userInfo.id) {
                dispatch(getUserProfile())                
            } else if (!orders) {
                dispatch(getOrderList())
            } else if (success) {
                dispatch({
                    type: USER_UPDATE_PROFILE_RESET
                })

                dispatch(getUserProfile())
            } else {
                setName(user.first_name)
                setEmail(user.email)
            }
        }
    }, [dispatch,history,userInfo,user,success,orders])


    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setAlert('Password not match')
        } else {
            dispatch(updateUserProfile({
                name: name,
                username: email,
                email: email,
                password: password,
            }))
        }
    }


    return (
        <Container className="mt-4">
        <Row>
            <Col className="mx-5" sm={10} md={4}>
                <h4>Account Information</h4>

                {alert && <ErrorMessage variant={'warning'}>{alert}</ErrorMessage>}
                {loading && <Loader />}     
                {error && <ErrorMessage variant={'danger'}>{error}</ErrorMessage>}

                <Form onSubmit={onSubmitHandler}>

                <Form.Group className="my-2" controlId="email">
                    <Form.Label>email</Form.Label>
                    <Form.Control value={email} name='email' onChange={(e) => setEmail(e.target.value)} type="text"/>
                </Form.Group>

                <Form.Group className="my-2" controlId="name">
                    <Form.Label>name</Form.Label>
                    <Form.Control value={name} name='name' onChange={(e) => setName(e.target.value)} type="text"/>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Create a password</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
                </Form.Group>

                <Form.Group className="my-2" controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password"/>
                </Form.Group>

                <Button className="my-2" variant="primary" type="submit">
                    Update
                </Button>
                </Form>      

            </Col>
            <Col sm={10} md={6}>
                <h4>Order History</h4>
                {loadingOrders && <Loader />}
                {getOrdersError && <ErrorMessage variant={'danger'}>{getOrdersError}</ErrorMessage>}
                {orders && (
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <Row>
                                <Col className="placeorder-name">Order Date</Col>
                                <Col className="placeorder-name">Order Number</Col>
                                <Col className="placeorder-name">Status</Col>
                                <Col className="placeorder-name">Total Amount</Col>
                                <Col className="placeorder-name">Order Detail</Col>
                            </Row>
                        </ListGroupItem>
                        {orders.map(order => (
                            <ListGroupItem key={order._id}>
                                <Row>
                                    <Col>{order.date}</Col>
                                    <Col>{order._id}</Col>
                                    <Col>{order.isDelivered ? "Shipped" : "Preparing for shipping"}</Col>
                                    <Col>${order.totalPrice}</Col>
                                    <Col><Link to={`/order/${order._id}`}>View Details</Link> </Col>
                                </Row>
                            </ListGroupItem>
                        ))}    
                    </ListGroup>
                )}

            </Col>
        </Row>
        </Container>
    )
}

export default ProfileScreen
