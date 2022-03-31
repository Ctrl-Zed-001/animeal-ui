import React from 'react'
import ProductBox from '../ProductBox/ProductBox'

const ProductRow = (props) => {
    return (
        <div className="container top-products my-8">
            <h1 className='font-medium text-xl'>{props.title}</h1>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mt-6">
                {
                    props.products && props.products.map((product, index) => {
                        return <ProductBox key={index} product={product} />
                    })

                }
            </div>
        </div>
    )
}

export default ProductRow