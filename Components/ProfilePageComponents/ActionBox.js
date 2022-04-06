import React from 'react'
import Link from 'next/link'

const ActionBox = (props) => {
    return (
        <Link href={props.link}>
            <div className="bg-white rounded-lg p-4 text-center shadow-none hover:shadow-lg  transition duration-500 ease-in  cursor-pointer">
                <img src={`/img/icons/${props.icon}.webp`} className='h-16 mx-auto' alt="" />
                <h1 className='font-medium text-lg mt-4'>{props.title}</h1>
            </div>
        </Link>
    )
}

export default ActionBox