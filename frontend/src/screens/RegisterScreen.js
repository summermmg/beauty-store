import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Button, Form, Container,Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {userRegister} from '../actions/userActions'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const RegisterScreen = ({location,history}) => {
   
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alert, setAlert] = useState(null)

    const dispatch = useDispatch()

    const user = useSelector(state => state.userRegister)
    const { error, loading,userInfo } = user

    const redirect = location.search? location.search.split('=')[1] :'/'

    useEffect(() => {
        userInfo && history.push(redirect)
    }, [history,redirect,userInfo])

    
    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setAlert('Passwords not match')
        } else {
            dispatch(userRegister(name,email,password))
        }
    }


    return (    
        <div style={{width: "60%", margin:"auto"}}>
            <h1  className="mb-4">Sign up with your email address</h1>
            {alert && <ErrorMessage variant={'warning'}>{alert}</ErrorMessage>}
            {loading && <Loader />}     
            {error && <ErrorMessage variant={'danger'}>{error}</ErrorMessage>}

            <Form onSubmit={onSubmitHandler}>

            <Form.Group className="my-3" controlId="email">
                <Form.Label>Email(*)</Form.Label>
                <Form.Control value={email} name='email' onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter email" required/>
            </Form.Group>

            <Form.Group className="my-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control value={name} name='name' onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group className="my-3" controlId="password">
                <Form.Label>Create a Password</Form.Label>
                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required/>
            </Form.Group>

            <Form.Group className="my-3" controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" required/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>      

            <Row className="py-3">
                <Col >Already have an account?
                <Link className="mx-2"
                    to={redirect? `/login?redirect=${redirect}` : '/login'}
                >
                    Login
                </Link>
                </Col>
            </Row>
        </div>
    )
}

export default RegisterScreen