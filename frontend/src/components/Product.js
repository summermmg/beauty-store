import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import {data} from '../data.js'


const Product = ({ product }) => {

    return (
        <Card className="my-3 p-3 rounded" >
            <Link to={`/product/${product._id}`}>
                {/* get image from backend */}
                {/* <Card.Img src={product.image} /> */}
                {/* get image url from frontend */}
                <Card.Img src={data[product._id-5].image} />
            </Link>
            <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title className="text-dark" as="div"><strong>{product.name}</strong></Card.Title>
            </Link>
            <Card.Text className="text-dark" as="div">
                <div className="">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#C39BD3"}/>
                </div>
            </Card.Text>
            <Card.Text className="text-dark" as="h3">
                ${product.price}
            </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
