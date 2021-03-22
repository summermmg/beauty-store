import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Button,Card, ListGroupItem, Alert,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import {fetchProduct,createProductReview} from '../actions/productActions'
import {addItemToCart} from '../actions/cartActions'
import ErrorMessage from '../components/ErrorMessage'

const ProductScreen = ({ match }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch=useDispatch()
    const productId = parseInt(match.params.id)
    const login = useSelector(state => state.userLogin)
    const {userInfo} = login
    const productDetails = useSelector(state => state.productDetails)
    const {product,loading,error} = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        if (!product || product._id !== productId || successProductReview) {
            dispatch(fetchProduct(productId))
        } 
    }, [productId,dispatch,product,successProductReview])

    const onAddCartClicked = () => {
        const cartItems = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : []
        const found = cartItems.find(item => item._id === productId)
        const cartQty = found? found.qty : 0

        setShowAlert(true)
        window.setTimeout(()=>{
            setShowAlert(false)
        },1500)

        dispatch(addItemToCart(productId,cartQty+1))
    }

    const submitReviewHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            productId, {
            rating,
            comment
        }
        ))
        setRating(0)
        setComment('')
    }
    
    let content
    if (loading) {
        content = <Loader />
    } else if (error) {
        content = <ErrorMessage variant={'danger'}>{error}</ErrorMessage>  
    } else if (product) {
        content = <div>
        <Link to="/" className="btn btn-light my-3">Go Back</Link> 
        <Row>
            <Col sm={8} md={4}>
                <Image src={product.image} alt={product.name} fluid thumbnail />
                {/* <Image src={`/static${product.image}`} alt={product.name} fluid thumbnail /> */}
            </Col>
            <Col md={4}>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <h5><strong>{product.brand}</strong></h5>
                        <h5>{product.name}</h5>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col><Rating value={product.rating} text={`${product.numReviews} reviews`} color="#C39BD3" /></Col>
                        </Row>
                        
                    </ListGroupItem>
                    <ListGroupItem>
                        Price: <strong>${product.price}</strong>
                    </ListGroupItem>
                    <ListGroupItem>
                        Description: {product.description} 
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <Row>
                                <Col>Price:</Col>
                                <Col>${product.price}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Status:</Col>
                                <Col>{product.countInStock >0?
                                    "In Stock" : "Out of Stock"}
                                </Col>
                            </Row>
                        </ListGroupItem>

                        {product.countInStock?            
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    <Button className="my-2 btn" variant="dark" type="button" disabled={product.countInStock===0} block onClick={()=> onAddCartClicked()}>
                                        Add to Cart
                                    </Button>
                                </Col>
                                
                            </Row>
                            {/* <Row>
                                <Col sm={5} md={5}>Qty:</Col>
                                <Col sm={7} md={7}>
                                <Button size="sm" className="mx-3" variant="light" onClick={() => {qty>1?setQty(qty-1):setQty(qty)}}><i className="fas fa-minus"></i></Button>
                                {qty}
                                <Button size="sm" className="mx-3" variant="light" onClick={() => {qty===product.countInStock?setQty(qty):setQty(qty+1)}}><i className="fas fa-plus"></i></Button>
                                </Col>
                            </Row> */}
                        </ListGroupItem>
                        :""
                        }
{/* 
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    <Button className="btn" variant="primary" type="button" disabled={product.countInStock===0} block onClick={()=> onAddCartClicked()}>
                                        Add to Cart
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroupItem> */}
                    </ListGroup>
                </Card>
                <Alert variant='success' show={showAlert}>Item added to cart!</Alert>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col md={6}>
                <h5>Reviews</h5>
                {product.reviews.length === 0 && <ErrorMessage variant={'info'}>No Reviews</ErrorMessage>}

                <ListGroup variant='flush'>
                    {product.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} color="#C39BD3" />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}

                    <ListGroup.Item>
                        <h5>Write a review</h5>
                        {loadingProductReview && <Loader />}
                        {successProductReview && <ErrorMessage variant={'success'}>Review submitted successfully</ErrorMessage>}
                        {errorProductReview && <ErrorMessage variant={'danger'}>{errorProductReview}</ErrorMessage>}

                        {userInfo ? (
                            <Form onSubmit={submitReviewHandler}>
                                <Form.Group className="my-2" controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="my-2" controlId='comment'>
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row='4'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button
                                    type='submit'
                                    variant='dark'
                                >
                                    Submit
                                </Button>
                            </Form>
                        )
                        : <ErrorMessage variant={'info'}>Please <Link to='/login'>login</Link> to write a review</ErrorMessage>
                        }    
                    </ListGroup.Item>
                </ListGroup>

            </Col>
        </Row>
        </div>
    }
   
    return ( 
        <div>{content}</div>
    )    
}

export default ProductScreen
