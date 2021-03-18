import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Button, Form, Container,Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {userLogin} from '../actions/userActions'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

//All route props (match, location and history) are available to LoginScreen
const LoginScreen = ({location,history}) => {
    const dispatch = useDispatch()
    
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const user = useSelector(state => state.userLogin)
    const { error, loading,userInfo } = user

    const redirect = location.search? location.search.split('=')[1] :'/'

    useEffect(() => {
        userInfo && history.push(redirect)
    }, [history,redirect,userInfo])


    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin(email,password))
    }


    return (    
        <div style={{width: "60%", margin:"auto"}}>
            <h1 className="mb-4">Sign In</h1>
            {loading && <Loader />}     
            {error && <ErrorMessage variant={'danger'}>{error}</ErrorMessage>}

            <Form onSubmit={onSubmitHandler}>
            <Form.Group className="my-3" controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control value={email} name='email' onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter email" required/>
            </Form.Group>
            <Form.Group className="my-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>      

            <Row className="py-3">
                <Col >New User?
                <Link className="mx-2"
                    to={redirect? `/register?redirect=${redirect}` : '/register'}
                >
                    Register
                </Link>
                </Col>
            </Row>
        </div>
    )
}

export default LoginScreen