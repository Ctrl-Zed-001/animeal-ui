import React from 'react'
import { BiRupee } from 'react-icons/bi'
import Rating from './Rating'


const ProductBox = (props) => {

    return (
        <a target="__blank" rel="noopener noreferrer" href={`/product/${props.product.slug}`}>
            <div className="productbox rounded-3xl border-2 border-white shadow cursor-pointer relative">
                <img src={props.product.display_image ? `${process.env.NEXT_PUBLIC_IMAGE_URI}/${props.product.id}/${props.product.display_image}` : "/img/product-placeholder.webp"} alt="" className='rounded-lg lg:h-48 mx-auto transform z-10' />

                <div className="product-info rounded-b-xl p-4 relative pt-14 -mt-12 -z-10">

                    <div className="discount-badge absolute top-10 right-0 bg-theme text-xs px-2 py-1 rounded-l-lg">
                        {props.product.product_offer}% off
                    </div>

                    <h2 className="animal text-slate-700 text-xs product-box-name">{props.product.animal[0]?.name}</h2>
                    <h1 className='text-sm font-medium product-box-name'>{props.product.name}</h1>
                    <h1 className="text-xs text-slate-700">{props.product.variant_identifier}</h1>
                    <Rating value={props.product.rating} />
                    <div className="flex ">
                        {
                            props.product.selling_price == props.product.mrp ?
                                <></> :
                                <div className="strike-price relative">
                                    <h1 className='text-sm mt-1 flex items-center text-gray-500 mr-2'><BiRupee /> {props.product.mrp}</h1>
                                    <hr className='absolute top-3 z-10 border-1 w-11/12 border-gray-500' />
                                </div>
                        }
                        <h1 className='text-xl flex items-center'><BiRupee /> {props.product.selling_price}</h1>
                    </div>
                </div>

                <div className="whiteslide bg-white w-full h-3/5 ease-in duration-300 transition absolute bottom-0 left-0 -z-20 rounded-2xl"></div>

            </div>
        </a>
    )
}

export default ProductBox