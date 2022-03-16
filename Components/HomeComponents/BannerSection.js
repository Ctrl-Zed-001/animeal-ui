import React from 'react'

const BannerSection = () => {
    return (
        <div className="banner-section lg:grid lg:grid-cols-12 lg:gap-4 justify-between container">

            {/* POPULAR CATEGORIES */}
            <div className="hidden lg:block popular-categories bg-white shadow rounded-lg p-3 h-fit text-sm col-span-2">
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
            <div className="main-banner col-span-5">
                <img src="https://wpbingosite.com/wordpress/petio/wp-content/webp-express/webp-images/uploads/2021/03/banner-21.jpg.webp" alt="" className='h-44 mb-2 rounded-lg w-full object-cover' />
                <img src="https://wpbingosite.com/wordpress/petio/wp-content/webp-express/webp-images/uploads/2021/03/banner-22.jpg.webp" alt="" className='h-44 mt-2 rounded-lg w-full object-cover' />
            </div>

            <div className="flex col-span-5 gap-1 lg:gap-4 lg:mt-0 mt-2">
                {/* RIGHT BANNER 1 */}
                <img src="https://i.pinimg.com/originals/21/0a/8d/210a8da7ee8b250440a2de22d855ce6d.jpg" alt="" className='h-90 object-cover rounded-lg w-3/6 lg:w-3/6' />

                {/* RIGHT BANNER 2 */}
                <img src="https://i.pinimg.com/originals/21/0a/8d/210a8da7ee8b250440a2de22d855ce6d.jpg" alt="" className='h-90 object-cover rounded-lg w-3/6 lg:w-3/6' />
            </div>
        </div>
    )
}

export default BannerSection