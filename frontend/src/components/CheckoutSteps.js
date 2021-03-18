import React from 'react'
import { Nav } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckoutSteps = ({login, shipping, payment, placeorder}) => {
    return (
        <Nav className="flex-column mr-5">
            {login ? (
                <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>  
                </LinkContainer>
            ) : (
                <LinkContainer to="/login">
                    <Nav.Link disabled>Login</Nav.Link>  
                </LinkContainer>
            )}

            {shipping ? (
                <LinkContainer to="/shipping">
                    <Nav.Link>Shipping</Nav.Link>  
                </LinkContainer>
            ) : (
                <LinkContainer to="/shipping">
                    <Nav.Link disabled>Shipping</Nav.Link>  
                </LinkContainer>
            )}

            {payment ? (
                <LinkContainer to="/payment">
                    <Nav.Link>Payment</Nav.Link>  
                </LinkContainer>
            ) : (
                <LinkContainer to="/payment">
                    <Nav.Link disabled>Payment</Nav.Link>  
                </LinkContainer>
            )}

            {placeorder ? (
                <LinkContainer to="/placeorder">
                    <Nav.Link>Place Order</Nav.Link>  
                </LinkContainer>
            ) : (
                <LinkContainer to="/placeorder">
                    <Nav.Link disabled>Place Order</Nav.Link>  
                </LinkContainer>
            )}
        </Nav>
    )
}

export default CheckoutSteps
