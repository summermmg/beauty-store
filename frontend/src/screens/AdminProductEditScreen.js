import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Button, Form,Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import {Link} from 'react-router-dom'
import {fetchProduct,updateProductById} from '../actions/productActions'
import {PRODUCT_DETAILS_RESET,PRODUCT_LIST_RESET} from '../constants/productConstants'

const AdminProductEditScreen = ({match,history}) => {
    const productId = parseInt(match.params.id)

    const [name,setName] = useState('')
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    const [countInStock,setCountInStock] = useState(0)
    const [imageFile,setImageFile] = useState(null)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDetail = useSelector(state => state.productDetails)
    const { product,loading, error: productDetailError } = productDetail
    const productUpdateById = useSelector(state => state.productUpdateById)
    const {success: productUpdateSuccess, error: productUpdateError} = productUpdateById

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            history.push('/login')
        } else {
            if (!product || product._id !== productId) {
                dispatch(fetchProduct(productId))
            } else if (productUpdateSuccess) {
                history.push('/admin/products')
                dispatch({
                    type: PRODUCT_DETAILS_RESET
                })
                //in order for list screen re-dispatch and get the updated list info.
                dispatch({
                    type: PRODUCT_LIST_RESET
                })
            } 
            else {
                setName(product.name)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
                setPrice(product.price)
                setImageFile(product.image)
                setCountInStock(product.countInStock)
            }
        }
    }, [product,productId,dispatch,history,userInfo,productUpdateSuccess])

    const onImageChange =(e) => {
        setImageFile(e.target.files[0])
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('user',userInfo.email)
        formData.append('name',name)
        formData.append('brand',brand)
        formData.append('category',category)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('countInStock',countInStock)
        if (imageFile !== null) {
            formData.append('image',imageFile)
        }       

        dispatch(updateProductById(formData,productId))
    }

    return (
        <Container className="mt-4">
        <h4>Edit Product</h4>          
        {productUpdateError && <ErrorMessage variant={'danger'}>{productUpdateError}</ErrorMessage>}
        {loading 
            ? <Loader />
            : productDetailError
            ? <ErrorMessage variant={'danger'}>{productDetailError}</ErrorMessage>
            : product ?                 
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} name='name' onChange={(e) => setName(e.target.value)} type="text" />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control value={brand} name='brand' onChange={(e) => setBrand(e.target.value)} type="text" />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control value={category} name='category' onChange={(e) => setCategory(e.target.value)} type="text" />
                    </Form.Group>
                    <Form.Group className="my-2" className="my-4">
                        <Form.Label>{`Currently: ${product.image}`}</Form.Label>
                        <Form.File id="image" onChange={onImageChange} />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={description} name='description' onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control value={price} name='price' onChange={(e) => setPrice(e.target.value)} type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="countInStock">
                        <Form.Label>Number In Stock</Form.Label>
                        <Form.Control value={countInStock} name='countInStock' onChange={(e) => setCountInStock(e.target.value)}  min="0" type="number" />
                    </Form.Group>
                    <Button className="my-3 mx-5" variant="primary" type="submit">
                        Update
                    </Button>
                    <Link to={`/admin/products`} className="btn btn-primary btn-md my-3 mx-5">cancel & go back</Link>
                </Form>   
            : null   
        }            
        </Container>
    )
}

export default AdminProductEditScreen
