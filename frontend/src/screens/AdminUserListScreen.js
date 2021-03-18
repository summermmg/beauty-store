import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Button,Alert } from 'react-bootstrap'
import Loader from '../components/Loader'
import {Link} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { getUserList,deleteUser } from '../actions/userActions'

const AdminUserListScreen = ({history}) => {
    const [showDeleteUserWarning,setDeleteUserWarning] = useState([false,null, null])
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userList = useSelector(state => state.userList)
    const { users, loading, error: userListError } = userList
    const userDelete = useSelector(state => state.userDelete)
    const {success, error: deleteUserError} = userDelete

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            history.push('/login')
        } else if (userInfo.is_staff) {
            if (!users || success)
            dispatch(getUserList())
        }        
    }, [dispatch,history,userInfo,users,success])

    const userDeleteHandler = (id) => {
        dispatch(deleteUser(id))
        
        setDeleteUserWarning([false,null,null])
    }

    return (
        <div>
            <h2 className="text-dark mb-4">Users</h2>
            {loading ? <Loader />
                : userListError 
                ? <ErrorMessage variant={'danger'}>{userListError}</ErrorMessage>
                :  <>
                <Alert show={showDeleteUserWarning[0]} variant="warning">
                    <Alert.Heading>Are you sure to remove user {showDeleteUserWarning[1]}</Alert.Heading>
                    <div className="d-flex justify-content-center">
                        <Button className="mx-3" onClick={() => setDeleteUserWarning([false,null,null])} variant="outline-success">
                            No
                        </Button>
                        <Button className="mx-3" onClick={() => userDeleteHandler(showDeleteUserWarning[2])} variant="outline-danger">
                            Yes
                        </Button>
                    </div>
                </Alert> 
                {deleteUserError && <ErrorMessage variant={'danger'}>{deleteUserError}</ErrorMessage>}
                <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Staff</th>
                    <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user._id}>
                            <th scope="row">{user._id}</th>
                            <td>{user.first_name}</td>
                            <td>{user.email}</td>
                            <td>{user.is_staff ? <i className="fas fa-user-check text-success"></i>
                                : <i className="fas fa-user"></i>}
                            </td>
                            <td>
                                <Link to={`/admin/user/${user._id}/edit`} className="btn btn-primary btn-sm"><i className="fas fa-edit"></i></Link>
                                <Button className="mx-2" variant="danger" size="sm" onClick={() => setDeleteUserWarning([true,user.email,user._id]) }><i className="fas fa-trash-alt"></i></Button>                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>}            
        </div>
    )
}

export default AdminUserListScreen