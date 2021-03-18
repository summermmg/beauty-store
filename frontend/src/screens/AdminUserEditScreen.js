import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Button, Form,Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import {Link} from 'react-router-dom'
import {getUserDetailById, updateUserById} from '../actions/userActions'
import {USER_DETAIL_BY_ID_RESET,USER_LIST_RESET} from '../constants/userConstants'

const AdminUserEditScreen = ({history,match}) => {
    const userId = parseInt(match.params.id)
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [staff,setStaff] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userDetail = useSelector(state => state.userDetailById)
    const { user,loading, error: userDetailError } = userDetail 
    const userUpdateById = useSelector(state => state.userUpdateById)
    const {success:userUpdateSuccess, error: userUpdateError} = userUpdateById

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            history.push('/login')
        } else {
            if (!user || user.id !== userId) {
                dispatch(getUserDetailById(userId))
                
            } else if (userUpdateSuccess) {
                history.push('/admin/users')
                dispatch({
                    type: USER_DETAIL_BY_ID_RESET
                })
                dispatch({
                    type: USER_LIST_RESET
                })
            } 
            else {
                setName(user.first_name)
                setEmail(user.email)
                setStaff(user.is_staff)
            }
        }
    }, [user,dispatch,history,userId,userInfo,userUpdateSuccess])
    
    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserById({
            name,
            email,
            username:email,
            is_staff:staff,
        },userId))
    }

    return (
        <Container className="mt-4">
            <h4>Edit User</h4>       
            {userUpdateError && <ErrorMessage variant={'danger'}>{userUpdateError}</ErrorMessage>}     
            {loading 
                ? <Loader />
                : userDetailError
                ? <ErrorMessage variant={'danger'}>{userDetailError}</ErrorMessage>
                : <Form onSubmit={onSubmitHandler}>

                <Form.Group className="my-2" controlId="email">
                    <Form.Label>email</Form.Label>
                    <Form.Control value={email} name='email' onChange={(e) => setEmail(e.target.value)} type="text"/>
                </Form.Group>

                <Form.Group className="my-2" controlId="name">
                    <Form.Label>name</Form.Label>
                    <Form.Control value={name} name='name' onChange={(e) => setName(e.target.value)} type="text"/>
                </Form.Group>
                <Form.Group className="mx-2 my-4" controlId="is_staff">
                    <Form.Check checked={staff} onChange={()=> setStaff(!staff)} type="checkbox" label="staff member" />
                </Form.Group>

                <Button className="my-3 mx-3" variant="primary" type="submit">
                    Update
                </Button>
                <Link to={`/admin/users`} className="btn btn-primary btn-md my-3 mx-5">cancel & go back</Link>
                </Form>      
                }            
        </Container>
    )
}

export default AdminUserEditScreen
