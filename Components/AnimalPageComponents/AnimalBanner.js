import React from 'react'
import Capitalize from '../../Helpers/Capitalize'

const AnimalBanner = (props) => {
    return (
        <div className='animal-banner container relative'>
            <h1 className='text-base xl:text-6xl font-bold text-white absolute flex xl:w-10/12 left-40 justify-center top-6 xl:top-24 uppercase right'>{props.title}</h1>
            {
                props.hasImage ?
                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${props.image}`} alt="" className='w-full rounded-xl' /> :
                    <img src='/img/common_banner.webp' alt="" className='w-full rounded-xl' />
            }

        </div>
    )
}

export default AnimalBanner