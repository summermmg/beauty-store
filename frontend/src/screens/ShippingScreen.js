import React, {useState} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart) 
    const {shipping} = cart 

    const login = useSelector(state => state.userLogin)
    const {userInfo} = login

    const [address,setAddress] = useState(shipping.address)
    const [city,setCity] = useState(shipping.city)
    const [province,setProvince] = useState(shipping.province)
    const [postcode, setPostcode] = useState(shipping.postcode)

    const dispatch=useDispatch()

    if (userInfo===null) {
        history.push('/login')
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({
            address,
            city,
            province,
            postcode,
        }))

        history.push('/payment')
    }

    return (
        <div className="mt-4">
            <Row  className="justify-content-md-center">
                <Col md={2}><CheckoutSteps login shipping/></Col>
                <Col md={7}>
                    <h4>Shipping</h4>

                    <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="my-3">
                        <Form.Label>street address</Form.Label>
                        <Form.Control value={address} name='address' onChange={(e) => setAddress(e.target.value)} type="text" required/>
                    </Form.Group>

                    <Form.Group className="my-3">
                        <Form.Label>city</Form.Label>
                        <Form.Control value={city} name='city' onChange={(e) => setCity(e.target.value)} type="text" required/>
                    </Form.Group>

                    <Form.Group className="my-3">
                        <Form.Label>province</Form.Label>
                        <br/>
                        <Form.Control
                            as="select"
                            onChange = {(e) => setProvince(e.target.value)}
                            className="my-1 mr-sm-2"
                            id="inlineFormCustomSelectProvince"
                            custom
                            required
                            value={province}
                        >
                            <option value=''>Choose...</option>
                            <option value="Alberta">Alberta</option>
                            <option value="British Columbia">British Columbia</option>
                            <option value="Manitoba">Manitoba</option>
                            <option value="New Brunswick">New Brunswick</option>
                            <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                            <option value="Northwest Territories">Northwest Territories</option>
                            <option value="Nova Scotia">Nova Scotia</option>
                            <option value="Nunavut">Nunavut</option>
                            <option value="Ontario">Ontario</option>
                            <option value="Prince Edward Island">Prince Edward Island</option>
                            <option value="Quebec">Quebec</option>
                            <option value="Saskatchewan">Saskatchewan</option>
                            <option value="Yukon">Yukon</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="my-3">
                        <Form.Label>postalcode</Form.Label>
                        <Form.Control value={postcode} onChange={(e) => setPostcode(e.target.value)} type="text" required/>
                    </Form.Group>

                    <Button className="my-3" variant="primary" type="submit">
                        save and next
                    </Button>
                    </Form>      
                </Col>
            </Row>
        </div>
    )
}

export default ShippingScreen
