import React from 'react'
import Capitalize from '../../Helpers/Capitalize'

const AnimalBanner = (props) => {
    return (
        <div className='animal-banner container relative'>
            <h1 className='text-base xl:text-6xl font-bold text-white absolute flex xl:w-11/12 left-16 justify-center top-6 xl:top-24 uppercase right'>{props.title}</h1>
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URI}/category-banner/${props.image}`} alt="" className='w-full rounded-xl' />
        </div>
    )
}

export default AnimalBanner