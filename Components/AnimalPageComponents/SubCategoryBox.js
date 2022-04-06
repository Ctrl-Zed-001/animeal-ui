import Link from 'next/link'
import React from 'react'

const SubCategoryBox = (props) => {

    return (
        <Link href={{
            pathname: '/shop',
            query: {
                animal: props.animal,
                category: props.category,
                subcategory: props.subcategory.category_name
            }
        }}>
            <div className='subcategory-box flex items-center p-3 rounded-lg cursor-pointer'>
                <img src={props.subcategory.category_icon == null ? '/img/category-placeholder.webp' : `${process.env.NEXT_PUBLIC_IMAGE_URI}/category-icon/${props.subcategory.category_icon}`} alt="" className='h-20' />
                <h1 className='text-sm font-medium ml-2'>{props.subcategory.category_name}</h1>
            </div>
        </Link>
    )
}

export default SubCategoryBox