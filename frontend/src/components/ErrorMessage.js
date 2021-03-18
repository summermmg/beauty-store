import React from 'react'
import {Col, Alert} from 'react-bootstrap'

const ErrorMessage = ({children, variant}) => (
    <Col>
        <Alert variant={variant}>{children}</Alert>
    </Col>
)

export default ErrorMessage