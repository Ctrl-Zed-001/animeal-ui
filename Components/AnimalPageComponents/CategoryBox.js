import React from 'react'
import { BsChevronRight } from 'react-icons/bs'
import Link from 'next/link';

const CategoryBox = (props) => {

    return (
        <Link href={`/${props.animal}/${props.category?.category_name.toLowerCase()}`}>
            <div className='category-box text-center relative cursor-pointer'>
                <img src={props.category.category_icon == null ? '/img/category-placeholder.png' : props.category.category_icon} alt="" className='h-36 mx-auto' />
                <h1 className=''>{props.category?.category_name}</h1>
                <button className='bg-theme rounded-full p-2 mt-4'><BsChevronRight /></button>
                <div className="floating-bg absolute -z-10 top-14 h-36 w-full rounded-xl"></div>
            </div>
        </Link>
    )
}

export default CategoryBox