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
                <img src="https://cdn.dribbble.com/users/5590116/screenshots/15427322/dog-food.jpg" alt="" className='h-52 mb-3 rounded-lg w-full object-cover shadow' />
                <img src="https://i.pinimg.com/originals/21/0a/8d/210a8da7ee8b250440a2de22d855ce6d.jpg" alt="" className='h-52 mt-3 rounded-lg w-full object-cover shadow' />
            </div>

            <div className="flex col-span-5 gap-1 lg:gap-4 lg:mt-0 mt-2">
                {/* RIGHT BANNER 1 */}
                <img src="https://image.shutterstock.com/shutterstock/photos/1436774582/display_1500/stock-vector-pet-shop-poster-or-banner-design-template-vector-cartoon-illustration-of-cats-dogs-aquarium-fish-1436774582.jpg" alt="" className='h-90 object-cover rounded-lg w-3/6 lg:w-3/6 shadow' />

                {/* RIGHT BANNER 2 */}
                <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/pet-shop-store-flyer-ad-template-design-765af2c561fd5ada1e11fd4cffa96d6c_screen.jpg?ts=1637009118" alt="" className='h-90 object-cover rounded-lg w-3/6 lg:w-3/6 shadow' />
            </div>
        </div>
    )
}

export default BannerSection