import Link from 'next/link'
import React from 'react'

const SubCategoryBox = () => {
    return (
        <Link href='/shop'>
            <div className='subcategory-box flex items-center justify-between p-3 rounded-lg cursor-pointer'>
                <img src="https://www.bigbasket.com/media/uploads/p/xxl/40181185_1-whiskas-dry-cat-food-adult-1-year-mackerel-flavour.jpg" alt="" className='h-20' />
                <h1 className='text-xl'>Dry Food</h1>
            </div>
        </Link>
    )
}

export default SubCategoryBox