import React from 'react'
import {Col, Spinner} from 'react-bootstrap'

const Loader = () => {
    return (
        <Col className="loader text-center">
            <Spinner animation="border" role="status" style={{height:"100px",width:"100px"}}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </Col> 
    )
}

export default Loader