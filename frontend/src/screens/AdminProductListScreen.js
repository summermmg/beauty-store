import React, {useState,useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Button,Alert,Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import {Link} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import {fetchProducts, deleteProduct,createProduct} from '../actions/productActions'

const AdminProductListScreen = ({history}) => {
    const [showDeleteProductWarning,setDeleteProductWarning] = useState([false,null, null])
    const [showCreateForm,setShowCreateForm] = useState(false)
    //state for create form
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

    const productList = useSelector(state => state.productList)
    const {products,loading: productListLoading,error: productListError} = productList
    const productDelete = useSelector(state => state.productDelete)
    const {success: deleteProductSuccess, error: deleteProductLoading} = productDelete
    const productCreate = useSelector(state => state.productCreate)
    const {success: createProductSuccess, loading: createProductLoading, error: createProductError} = productCreate

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            history.push('/login')
        } else if (userInfo.is_staff) {
            if (!products || deleteProductSuccess || createProductSuccess)
            dispatch(fetchProducts())
        }        
    }, [dispatch,history,userInfo,products,createProductSuccess,deleteProductSuccess])

    const productDeleteHandler = (id) => {
        dispatch(deleteProduct(id))        
        setDeleteProductWarning([false,null,null])
    }
    const createProductHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('user',userInfo.email)
        formData.append('name',name)
        formData.append('brand',brand)
        formData.append('category',category)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('countInStock',countInStock)
        formData.append('image',imageFile)
        formData.append('rating',0)

        dispatch(createProduct(formData))
        setShowCreateForm(false)
    }
    const clearFormHandler = () => {
        setName('')
        setBrand('')
        setCategory('')
        setDescription('')
        setPrice(0)
        setCountInStock(0)
        setImageFile(null)
    }

    const onImageChange =(e) => {
        setImageFile(e.target.files[0])
    }
    return (
            !showCreateForm ? (
                <div>
                <h2 className="text-dark mb-4">Products</h2>
                {productListLoading ? <Loader />
                    : productListError 
                    ? <ErrorMessage variant={'danger'}>{productListError}</ErrorMessage>
                    :  <div>
                        <Alert show={showDeleteProductWarning[0]} variant="warning">
                            <Alert.Heading>Are you sure to remove product {showDeleteProductWarning[1]}</Alert.Heading>
                            <div className="d-flex justify-content-center">
                                <Button className="mx-3" onClick={() => setDeleteProductWarning([false,null,null])} variant="outline-success">
                                    No
                                </Button>
                                <Button className="mx-3" onClick={() => productDeleteHandler(showDeleteProductWarning[2])} variant="outline-danger">
                                    Yes
                                </Button>
                            </div>
                        </Alert> 
                        <Button variant="primary" size="md" className="float-right mb-3" onClick={() => setShowCreateForm(true)}><i className="fas fa-plus"></i> add new product</Button>
                        {deleteProductLoading && <ErrorMessage variant={'danger'}>{deleteProductLoading}</ErrorMessage>}
                        <table className="table table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Brand</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">In Stock</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map(product => (
                                    <tr key={product._id}>
                                        <th scope="row">{product._id}</th>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>${product.price}</td>
                                        <td>{product.countInStock}</td>
                                        <td>
                                            <Link to={`/admin/product/${product._id}/edit`} className="btn btn-primary btn-sm"><i className="fas fa-edit"></i></Link>
                                            <Button className="mx-2" variant="danger" size="sm" onClick={() => setDeleteProductWarning([true,product.name,product._id]) }><i className="fas fa-trash-alt"></i></Button>                                
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>      
                }
                </div>                     
            )
            
            : (
                <div>
                    <h2 className="text-dark mb-4">Create Product</h2>
                    {createProductLoading && <Loader />}
                    {createProductError && <ErrorMessage variant={'danger'}>{createProductError}</ErrorMessage>}
                    <Form onSubmit={(e) => createProductHandler(e)}>
                        <Form.Group className="my-2" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name} name='name' onChange={(e) => setName(e.target.value)} type="text" required/>
                        </Form.Group>
                        <Form.Group className="my-2" controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control value={brand} name='brand' onChange={(e) => setBrand(e.target.value)} type="text" required/>
                        </Form.Group>
                        <Form.Group className="my-2" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control value={category} name='category' onChange={(e) => setCategory(e.target.value)} type="text" required/>
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label>Please upload product image</Form.Label>
                            <Form.File id="image" onChange={onImageChange} required/>
                        </Form.Group>
                        <Form.Group className="my-2" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={description} name='description' onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} required/>
                        </Form.Group>
                        <Form.Group className="my-2" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control value={price} name='price' onChange={(e) => setPrice(e.target.value)} type="number" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" required/>
                        </Form.Group>
                        <Form.Group className="my-2" controlId="countInStock">
                            <Form.Label>Number In Stock</Form.Label>
                            <Form.Control value={countInStock} name='countInStock' onChange={(e) => setCountInStock(e.target.value)}  min="0" type="number" required/>
                        </Form.Group>
                        <Button className="my-4 mx-3" variant="primary" type="submit">
                            Create
                        </Button>
                        <Button className="my-4 mx-3" variant="primary" onClick={() => setShowCreateForm(false)}>
                            Cancel
                        </Button>
                        <Button className="my-4 mx-3" variant="primary" onClick={clearFormHandler}>
                            Clear Form
                        </Button>
                    </Form>
                </div>
            )


    )
}

export default AdminProductListScreen
