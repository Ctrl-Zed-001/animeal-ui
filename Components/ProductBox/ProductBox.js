import React from 'react'
import { BiRupee } from 'react-icons/bi'
import Rating from './Rating'


const ProductBox = (props) => {
    return (
        <a target="__blank" rel="noopener noreferrer" href={`/product/${props.product.attributes.slug}`}>
            <div className="productbox rounded-3xl border-2 border-white shadow cursor-pointer relative">
                <img src={props.product.attributes.display_image?.data ? props.product.attributes.display_image.data.attributes.url : "/img/product-placeholder.webp"} alt="" className='rounded-lg lg:h-48 mx-auto transform z-10' />

                <div className="product-info rounded-b-xl p-4 relative pt-14 -mt-12 -z-10">

                    <div className="discount-badge absolute top-10 right-0 bg-theme text-xs px-2 py-1 rounded-l-lg">
                        {(((props.product.attributes.mrp - props.product.attributes.selling_price) * 100) / 55).toFixed(1)}% off
                    </div>

                    <h2 className="animal text-slate-700 text-xs product-box-name">{props.product.attributes.animal.data?.attributes?.name}</h2>
                    <h1 className='text-sm font-medium product-box-name'>{props.product.attributes.name}</h1>
                    <h2 className="text-xs text-slate-700">{props.product.attributes.product_size}</h2>
                    {/* <Rating value={props.product.attributes.rating_average} /> */}
                    <div className="flex ">
                        {
                            props.product.attributes.selling_price == props.product.attributes.mrp ?
                                <></> :
                                <div className="strike-price relative">
                                    <h2 className='text-sm mt-1 flex items-center text-gray-500 mr-2'><BiRupee /> {props.product.attributes.mrp}</h2>
                                    <hr className='absolute top-3 z-10 border-1 w-11/12 border-gray-500' />
                                </div>
                        }
                        <h2 className='text-xl flex items-center'><BiRupee /> {props.product.attributes.selling_price}</h2>
                    </div>
                </div>

                <div className="whiteslide bg-white w-full h-3/5 ease-in duration-300 transition absolute bottom-0 left-0 -z-20 rounded-2xl"></div>

            </div>
        </a>
    )
}

export default ProductBox