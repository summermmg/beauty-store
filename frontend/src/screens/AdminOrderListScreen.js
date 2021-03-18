import React, {useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import {Link} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import {getOrderListAdmin} from '../actions/orderActions'


const AdminOrderListScreen = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const orderListAdmin = useSelector(state => state.orderListAdmin)
    const { orders, loading, error } = orderListAdmin

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            history.push('/login')
        } else if (userInfo.is_staff) {
            if (!orders)
            dispatch(getOrderListAdmin())
        }        
    }, [dispatch,history,userInfo,orders])

    return (
        <div>
            <h2 className="text-dark mb-4">Orders</h2>
            {loading ? <Loader />
                : error 
                ? <ErrorMessage variant={'danger'}>{error}</ErrorMessage>
                :  
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Create Date</th>
                        <th scope="col">Price</th>
                        <th scope="col">Is Paid</th>
                        <th scope="col">Is Shipped</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(order => (
                            <tr key={order._id}>
                                <th scope="row">{order._id}</th>
                                <td>{order.date}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? <span className="text-success">{order.paidAt.substring(0,10)}</span>
                                    : <i className="fas fa-exclamation-circle text-danger"></i>}
                                </td>
                                <td>{order.isDelivered ? <span className="text-success">{order.deliveredAt.substring(0,10)}</span>
                                    : <i className="fas fa-exclamation-circle text-danger"></i>}
                                </td>
                                <td>
                                    <Link to={`/order/${order._id}`}><i className="fas fa-angle-double-right"></i> Order Detail</Link>                         
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }            
        </div>
    )
}

export default AdminOrderListScreen
