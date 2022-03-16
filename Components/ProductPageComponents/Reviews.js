import React from 'react'
import ReviewBox from './ReviewBox'

const Reviews = () => {
    return (
        <div className='container mt-10'>
            <h1 className="text-base mb-4">450 Reviews</h1>
            <ReviewBox />
            <ReviewBox />
            <ReviewBox />
            <ReviewBox />
        </div>
    )
}

export default Reviews