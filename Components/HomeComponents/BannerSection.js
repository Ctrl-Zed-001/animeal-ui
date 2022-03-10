import React from 'react'

const BannerSection = () => {
    return (
        <div className="banner-section flex justify-between container">

            {/* POPULAR CATEGORIES */}
            <div className="popular-categories bg-white shadow rounded-lg p-4 h-fit w-2/12 text-sm">
                <h1 className='font-medium'>Popular Categories</h1>

                <div className="popular-category-item flex items-center mt-6">
                    <img src="https://www.pngall.com/wp-content/uploads/4/Dry-Dog-Food-PNG-Free-Download.png" alt="" className='h-6' />
                    Dog Food
                </div>
                <div className="popular-category-item flex items-center mt-6">
                    <img src="https://www.pngall.com/wp-content/uploads/4/Dry-Dog-Food-PNG-Free-Download.png" alt="" className='h-6' />
                    Dog Food
                </div>
                <div className="popular-category-item flex items-center mt-6">
                    <img src="https://www.pngall.com/wp-content/uploads/4/Dry-Dog-Food-PNG-Free-Download.png" alt="" className='h-6' />
                    Dog Food
                </div>


            </div>

            {/* MAIN BANNER */}
            <div className="main-banner mx-4 w-6/12">
                <img src="https://i.pinimg.com/originals/21/0a/8d/210a8da7ee8b250440a2de22d855ce6d.jpg" alt="" className='h-44 mb-2 rounded-lg w-full object-cover' />
                <img src="https://i.pinimg.com/originals/21/0a/8d/210a8da7ee8b250440a2de22d855ce6d.jpg" alt="" className='h-44 mt-2 rounded-lg w-full object-cover' />
            </div>

            {/* RIGHT BANNER 1 */}
            <img src="https://i.pinimg.com/originals/21/0a/8d/210a8da7ee8b250440a2de22d855ce6d.jpg" alt="" className='h-90 object-cover rounded-lg mr-2 w-3/12' />

            {/* RIGHT BANNER 2 */}
            <img src="https://i.pinimg.com/originals/21/0a/8d/210a8da7ee8b250440a2de22d855ce6d.jpg" alt="" className='h-90 object-cover rounded-lg ml-2 w-3/12' />
        </div>
    )
}

export default BannerSection