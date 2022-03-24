import React from 'react'
import { BiRupee } from 'react-icons/bi';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa'
import config from '../../config.json'

const CartItem = (props) => {
    return (
        <div className="cart-item bg-slate-100 p-3 rounded-lg grid grid-cols-6 my-4 relative gap-3">
            <div className='flex items-start col-span-5 md:col-span-3'>
                <img src={props.item.product_image ? `${config.image_uri}/${props.item.product_id}/${props.item.product_image}` : "/img/product-placeholder.png"} alt="" className='h-20 md:h-32' />

                <div className="description ml-6 md:pt-4">
                    <h1 className='text-xs md:text-base font-semibold'>{props.item.product_name}</h1>
                    <p className="text-xs md:text-base text-slate-500 my-1">{props.item.product_weight}</p>
                    <div className="flex md:hidden font-semibold text-lg mx-auto">
                        <BiRupee className='mt-1' /> {props.item.product_total}
                    </div>
                    <div className="pt-2 block md:hidden">
                        <div className="border-2 rounded-xl flex items-center w-fit py-1 px-2">
                            <button disabled={parseInt(props.item.quantity) === 1 ? true : false} className='disabled:cursor-not-allowed' onClick={() => props.updateCartQuantity('sub', props.item.product_id, parseInt(props.item.quantity) - 1)}>
                                <HiMinusSm className='bg-slate-300 text-slate-800 rounded-lg text-base' />
                            </button>
                            <span className='mx-5 text-sm'>{parseInt(props.item.quantity)}</span>
                            <button className='disabled:cursor-not-allowed' onClick={() => props.updateCartQuantity('add', props.item.product_id, parseInt(props.item.quantity) + 1)}>
                                <HiPlusSm className='bg-slate-300 text-slate-800 rounded-lg text-base' />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="pt-4 hidden md:block">
                <div className="border-2 rounded-xl flex items-center w-fit py-2 px-4">
                    <button disabled={parseInt(props.item.quantity) === 1 ? true : false} className='disabled:cursor-not-allowed' onClick={() => props.updateCartQuantity('sub', props.item.product_id, parseInt(props.item.quantity) - 1)}>
                        <HiMinusSm className='bg-slate-300 text-slate-800 rounded-lg text-2xl' />
                    </button>
                    <span className='mx-5 text-lg'>{parseInt(props.item.quantity)}</span>
                    <button className='disabled:cursor-not-allowed' onClick={() => props.updateCartQuantity('add', props.item.product_id, parseInt(props.item.quantity) + 1)}>
                        <HiPlusSm className='bg-slate-300 text-slate-800 rounded-lg text-2xl' />
                    </button>
                </div>
            </div>

            <div className="hidden md:flex font-semibold mt-6 text-lg mx-auto">
                <BiRupee className='mt-1' /> {props.item.product_total}
            </div>

            <FaTrash onClick={() => props.removeCartItem(props.item.product_id)} className='text-red-400 mt-4 mx-auto text-sm md:text-lg absolute right-4 top-0 md:relative cursor-pointer' />

        </div>
    )
}

export default CartItem