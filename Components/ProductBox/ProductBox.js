import React from 'react'
import { BiRupee } from 'react-icons/bi'
import Link from 'next/link'
import Rating from './Rating'
import config from '../../config.json'

const ProductBox = (props) => {
    console.log("🚀 ~ file: ProductBox.js ~ line 7 ~ ProductBox ~ props", props)

    return (
        <Link href={`/product/${props.product[0].product_slugname}`}>
            <div className="productbox rounded-lg border-2 pt-4 border-white shadow cursor-pointer">
                <img src={props.product[0].product_featured_image ? `${config.image_uri}/${props.product[0].product_id}/${props.product[0].product_featured_image}` : "/img/product-placeholder.png"} alt="" className='rounded-lg lg:h-48 mx-auto transform z-10' />

                <div className="product-info p-4 relative bg-white pt-14 -mt-12 -z-10">

                    <div className="discount-badge absolute top-10 right-0 bg-theme text-xs px-2 py-1 rounded-l-lg">
                        {props.product.offer}% off
                    </div>

                    <h2 className="animal text-slate-700 text-xs">{props.product[0].product_for_animal}</h2>
                    <h1 className='text-sm font-medium'>{props.product[0].product_name}</h1>
                    <h1 className="text-xs text-slate-700">{props.product[0].product_size}</h1>
                    <Rating />
                    <div className="flex ">
                        <div className="strike-price relative">
                            <h1 className='text-sm mt-1 flex items-center text-gray-500 mr-2'><BiRupee /> {props.product[0].product_mrp}</h1>
                            <hr className='absolute top-3 z-10 border-1 w-11/12 border-gray-500' />
                        </div>
                        <h1 className='text-xl flex items-center'><BiRupee /> {props.product[0].product_mop}</h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductBox