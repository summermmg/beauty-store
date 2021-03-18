import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Nav, Dropdown, DropdownButton } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Search from '../components/Search'
import {userLogout} from '../actions/userActions'

const Header = () => {
    const cart = useSelector(state => state.cart.cart)
    const userInfo = useSelector(state => state.userLogin.userInfo)

    const dispatch = useDispatch()

   
    const signoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <i className="fas fa-bars"></i>
                    </button>
                    <a className="navbar-brand mx-3" href="/">Summer Shop</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <LinkContainer to="/">
                                <Nav.Link className="mx-3">
                                   HOME             
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                        <li className="nav-item">
                            <LinkContainer to="/cart">
                                <Nav.Link className="mx-3">
                                    <span className="cart-icon badge badge-pill bg-danger">{cart.reduce((acc,curr)=> acc + curr.qty,0)}</span>
                                    <span><i className="cart-icon fas fa-shopping-cart"></i></span>
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                        <li className="nav-item">
                            {userInfo ? 
                            <DropdownButton  variant='dark' className="mx-3" id='username' title={userInfo.first_name !== '' ? userInfo.first_name: userInfo.username}>
                                <LinkContainer to="/profile">
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                </LinkContainer>

                                <Dropdown.Item onClick={signoutHandler}>Sign Out</Dropdown.Item>
                            </DropdownButton>
                            : 
                            <LinkContainer className = "mx-3" to="/login">
                                <Nav.Link><i className="fas fa-user"> Login</i></Nav.Link>
                            </LinkContainer>
                            }        
                        </li>
                        <li>
                            {userInfo && userInfo.is_staff && 
                            <DropdownButton  variant='dark' className="mx-3" id='username' title="Admin">
                                <LinkContainer to="/admin/users">
                                    <Dropdown.Item>Manage Users</Dropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/admin/products">
                                    <Dropdown.Item>Manage Products</Dropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/orders">
                                    <Dropdown.Item>Manage Orders</Dropdown.Item>
                                </LinkContainer>
                            </DropdownButton>                 
                            }   
                        </li>
                    </ul>
                    <Search />            
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header

