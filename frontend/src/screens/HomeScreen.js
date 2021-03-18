import React, {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product' 
import {fetchProducts} from '../actions/productActions'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const HomeScreen = ({history}) => {
    
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {products,loading,error} = productList

    //returns path params after ? (includes ?)
    let keyword = history.location.search
    
    useEffect(() => {
        dispatch(fetchProducts(keyword))       
    }, [dispatch,keyword])

    let content
    if (loading) {
        content = <Loader />
    } else if (error) {
        content = <ErrorMessage variant={'danger'}>{error}</ErrorMessage>        
    } else if (products) {
        content = products.map(product => (
            <Col key={product._id} sm={9} md={6} lg={3}>
                <Product product={product} />
            </Col>
        ))
    }

    return (
        <div>
            <h1 className="text-dark">Latest Products</h1>
            <Row>
                {content}
            </Row>
        </div>
    )
}

export default HomeScreen
