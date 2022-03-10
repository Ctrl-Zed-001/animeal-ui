import React from 'react'
import ProductBox from '../ProductBox/ProductBox'

const ProductRow = (props) => {
    return (
        <div className="container top-products my-8">
            <h1>{props.title}</h1>

            <div className="grid grid-cols-4 gap-8 mt-6">
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
            </div>
        </div>
    )
}

export default ProductRow