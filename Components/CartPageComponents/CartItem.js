import React from 'react'
import { BiRupee } from 'react-icons/bi';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa'
import config from '../../config.json'

const CartItem = (props) => {
    console.log("🚀 ~ file: CartItem.js ~ line 7 ~ CartItem ~ props", props)
    return (
        <div className="cart-item bg-slate-100 p-3 rounded-lg grid grid-cols-6 my-4 relative gap-3">
            <div className='flex items-start col-span-3'>
                <img src={props.item.product_image ? `${config.image_uri}/${props.item.product_id}/${props.item.product_image}` : "/img/product-placeholder.png"} alt="" className='h-32' />

                <div className="description ml-6 pt-4">
                    <h1 className='font-semibold'>{props.item.product_name}</h1>
                    <p className="text-base text-slate-500 my-1">1 Kg</p>
                </div>
            </div>

            <div className="pt-4 ">
                <div className="border-2 rounded-xl flex items-center w-fit py-2 px-4">
                    <HiMinusSm className='bg-slate-300 text-slate-800 rounded-lg text-2xl' />
                    <span className='mx-5 text-lg'>1</span>
                    <HiPlusSm className='bg-slate-300 text-slate-800 rounded-lg text-2xl' />
                </div>
            </div>

            <div className="flex font-semibold mt-6 text-lg mx-auto">
                <BiRupee className='mt-1' /> 500
            </div>

            <FaTrash className='text-red-400 mt-4 mx-auto text-lg' />

        </div>
    )
}

export default CartItem