import React from 'react'
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md'

const Rating = () => {
    return (
        <div className="rating flex">
            <MdOutlineStarPurple500 className='text-theme' />
            <MdOutlineStarPurple500 className='text-theme' />
            <MdOutlineStarPurple500 className='text-theme' />
            <MdOutlineStarPurple500 className='text-theme' />
            <MdOutlineStarOutline className='text-theme' />
        </div>
    )
}

export default Rating