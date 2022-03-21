import React from 'react'
import { HiStar } from 'react-icons/hi'

const Rating = ({ value }) => {

    return (
        <div className="rating flex">
            {
                Array.apply(null, Array(value)).map((star, index) => {
                    return <HiStar key={index} className='text-theme' />
                })
            }
            {
                Array.apply(null, Array(5 - parseInt(value))).map((star, index) => {
                    return <HiStar key={index} className='text-gray-400' />
                })
            }
        </div>
    )
}

export default Rating