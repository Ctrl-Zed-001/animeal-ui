import React, { useContext } from 'react'
import { BiRupee } from 'react-icons/bi'
import Rating from '../ProductBox/Rating'
import getPercent from '../../Helpers/GetOff'
import { FaTrash } from 'react-icons/fa'

const WishlistBox = (props) => {
    return (
        <div className='relative'>
            <a target="__blank" rel="noopener noreferrer" href={`/product/${props.product.slug}`}>
                <div className="productbox rounded-xl border-2 border-white shadow cursor-pointer">
                    <img src={props.product.display_image ? `${process.env.NEXT_PUBLIC_IMAGE_URI}/${props.product.display_image}` : "/img/product-placeholder.webp"} alt="" className='rounded-lg lg:h-48 mx-auto transform z-10' />

                    <div className="product-info rounded-b-xl p-4 relative bg-white pt-14 -mt-12 -z-10">

                        <div className="discount-badge absolute top-10 right-0 bg-theme text-xs px-2 py-1 rounded-l-lg">
                            {getPercent(props.product.mrp, props.product.selling_price)}% off
                        </div>
                        {/* 
                        <h2 className="animal text-slate-700 text-xs">{props.product.animal.toString()}</h2> */}
                        <h1 className='text-sm font-medium product-box-name'>{props.product.name}</h1>
                        <h1 className="text-xs text-slate-700">{props.product.variant}</h1>
                        {/* <Rating value={parseInt(props.product.rating)} /> */}
                        <div className="flex ">
                            <div className="strike-price relative">
                                <h1 className='text-sm mt-1 flex items-center text-gray-500 mr-2'><BiRupee /> {props.product.mrp}</h1>
                                <hr className='absolute top-3 z-10 border-1 w-11/12 border-gray-500' />
                            </div>
                            <h1 className='text-xl flex items-center'><BiRupee /> {props.product.selling_price}</h1>
                        </div>
                    </div>



                </div>
            </a>
            <FaTrash onClick={() => props.remove(props.item.id)} className='absolute top-2 right-2 text-sm text-red-400 cursor-pointer' />
        </div>
    )
}

export default WishlistBox