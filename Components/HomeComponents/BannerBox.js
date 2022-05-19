import React from 'react'
import Link from 'next/link'

const BannerBox = (props) => {
    return (
        <Link href={props.link}>
            <div className="relative cursor-pointer">
                <img src={props.image} alt="" className=' my-1 xl:my-2 rounded-lg w-full object-cover shadow' />
                {
                    props.heading && <h1 className="text-white xl:text-3xl font-bold absolute top-10 left-5 w-7/12" dangerouslySetInnerHTML={{ __html: props.heading }} ></h1>
                }
                {
                    props.button && <button className='bg-red-500 hover:bg-transparent transition-all font-semibold border-2 px-2 py-1 border-white xl:px-4 xl:py-2 text-white text-xs xl:text-base absolute bottom-3 xl:bottom-10 left-5 rounded-lg'>{props.button}</button>
                }
            </div>
        </Link>
    )
}

export default BannerBox