import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { BiRupee } from 'react-icons/bi';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

const CartItem = (props) => {
    return (
        <div className="cart-item bg-slate-100 p-3 rounded-lg flex items-center my-4 relative">
            <img src="/img/product-placeholder.png" alt="" className='h-14' />
            <div className="description ml-6">
                <h1>Arden Grande Adult</h1>
                <p className="text-xs text-slate-500 my-1">1 Kg</p>
                <div className="flex items-center mt-4">
                    <HiMinusSm className='bg-slate-300 text-slate-600 rounded-lg text-lg text-xl' />
                    <span className='mx-3'>1</span>
                    <HiPlusSm className='bg-slate-300 text-slate-600 rounded-lg text-lg text-xl' />
                </div>
            </div>
            <MdOutlineClose className='absolute top-2 right-2 text-red-400' />
            <div className="flex items-center absolute bottom-3 right-3 font-semibold">
                <BiRupee /> 500
            </div>
        </div>
    )
}

export default CartItem