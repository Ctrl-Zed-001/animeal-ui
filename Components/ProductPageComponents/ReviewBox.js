import React from 'react'
import Rating from '../ProductBox/Rating'

const ReviewBox = () => {
    return (
        <div className='review-box bg-slate-100 p-3 rounded my-4'>
            <h1 className="text-sm font-semibold flex items-center gap-4">Really sorry I switched <Rating value={0} /></h1>
            <p className="text-justify text-xs mt-1 leading-5 text-slate-800">
                By Manish Mhaskar on Mar 10 2022
            </p>
            <p className="text-justify text-xs mt-3 leading-5 text-slate-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste praesentium aspernatur quia. Accusamus, dicta, sit animi dolores dignissimos voluptate quod distinctio harum sapiente quibusdam commodi ab corrupti, repellendus in saepe?
            </p>
        </div>
    )
}

export default ReviewBox