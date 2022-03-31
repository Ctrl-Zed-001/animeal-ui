import React from 'react'

const AnimalBanner = (props) => {
    return (
        <div className='animal-banner container'>
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URI}/category-banner/${props.image}`} alt="" className='w-full rounded-xl' />
        </div>
    )
}

export default AnimalBanner