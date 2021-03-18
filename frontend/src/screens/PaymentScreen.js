import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Button, Form, Row, Col, Container, Alert } from 'react-bootstrap'
import {savePaymentMethod} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({history}) => {

    const [checkedItem, setCheckedItem] = useState('')
    const cartInfo = useSelector(state => state.cart)
    const {shipping} = cartInfo 

    const [showAlert, setShowAlert] = useState(false)

    const dispatch = useDispatch()

    if (!shipping.address) {
        history.push('/shipping')
    }

    const  handleOptionChange = (e) => {
        setCheckedItem(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (checkedItem) {
            dispatch(savePaymentMethod(checkedItem))
            history.push('/placeorder')
        } else {
            setShowAlert(true)
            window.setTimeout(()=>{
                setShowAlert(false)
            },2000)
        }
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={2}><CheckoutSteps login shipping payment/></Col>
                <Col md={7}>
                    <h4 className="mb-4">Payment Method</h4>

                    {/* wrap label outside of input so that the whole label is clickable */}
                    <Form onSubmit={onSubmitHandler}>
                        <div className="radio">
                            <label className="form-check-label">
                                <input className="mx-2" type="radio" value="PayPal" 
                                    checked={checkedItem === 'PayPal'} 
                                    onChange={handleOptionChange}
                                />
                                    PayPal    
                                <i className="mx-2 text-info fab fa-cc-paypal"></i>
                            </label>
                        </div>
                        {/* <div className="radio">

                            <label className="form-check-label">
                                <input className="mr-2" type="radio" value="card" 
                                    checked={checkedItem === 'card'} 
                                    onChange={handleOptionChange} 
                                />
                                Credit Card/ Debit Card
                                <i className="ml-2 text-primary fab fa-cc-visa"></i> 
                                <i className="ml-2 text-danger fab fa-cc-mastercard"></i> 
                                <i className="ml-2 text-info fab fa-cc-amex"></i>
                            </label>
                        </div> */}
                        <div className="radio">
                            <label className="form-check-label">
                                <input className="mx-2" type="radio" value="bitcoin" 
                                    checked={checkedItem === 'bitcoin'} 
                                    onChange={handleOptionChange}
                                    disabled
                                />
                                    Bitcoin    
                                <i className="mx-2 text-warning fab fa-bitcoin"></i>
                            </label>
                        </div>

                        <Button className="mt-3" variant="primary" type="submit">
                            save and next
                        </Button>
                    </Form> 
                    <Alert variant='warning' show={showAlert}>Please select a payment method.</Alert> 
                </Col>
            </Row>
        </Container>
    )
}

export default PaymentScreen
