import React from 'react'
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md'
import { BiRupee } from 'react-icons/bi'

const ProductBox = () => {
    return (
        <div className="productbox rounded-lg border-white bg-white">
            <img src="https://staging.animeal.in/uploads/003849/1880351646329676.jpg" alt="" className='rounded-lg h-48 mx-auto' />
            <div className="product-info p-4 rounded-lg relative">

                <div className="discount-badge absolute top-0 right-0 bg-theme text-xs px-2 py-1 rounded-l-lg">
                    10% off
                </div>

                <h2 className="animal text-gray-500 text-xs">Cat</h2>
                <h1 className='text-sm'>AG ADULT CAT CHICKEN</h1>
                <h1 className="text-sm">1Kg</h1>
                <div className="rating flex">
                    <MdOutlineStarPurple500 className='text-theme' />
                    <MdOutlineStarPurple500 className='text-theme' />
                    <MdOutlineStarPurple500 className='text-theme' />
                    <MdOutlineStarPurple500 className='text-theme' />
                    <MdOutlineStarOutline className='text-theme' />
                </div>
                <div className="flex mt-3">
                    <div className="strike-price relative">
                        <h1 className='text-sm mt-1 flex items-center text-gray-500 mr-2'><BiRupee /> 500</h1>
                        <hr className='absolute top-3 z-10 border-1 w-11/12 border-gray-500' />
                    </div>
                    <h1 className='text-xl flex items-center'><BiRupee /> 500</h1>
                </div>
            </div>
        </div>
    )
}

export default ProductBox