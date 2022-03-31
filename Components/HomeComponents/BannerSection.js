import React, { useContext, useState } from 'react'
import Link from 'next/link'
import PrescriptionUpload from './PrescriptionUpload'
import { AuthContext } from '../../Context/AuthContext'

const BannerSection = () => {
    const { isMobile } = useContext(AuthContext)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    return (
        <div className="banner-section lg:grid lg:grid-cols-12 lg:gap-4 justify-between container">

            {/* POPULAR CATEGORIES */}
            <div className="hidden lg:block popular-categories bg-white shadow rounded-lg p-3 h-full text-sm col-span-2">
                <h1 className='font-semibold'>Popular Categories</h1>

                <Link href='/dog/food'>
                    <div className="popular-category-item flex items-center mt-6 gap-2 font-medium cursor-pointer">
                        <img src="/img/icons/dog.png" alt="" className='h-6' />
                        Dog Food
                    </div>
                </Link>
                <Link href='/cat/food'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/cat.png" alt="" className='h-6' />
                        Cat Food
                    </div>
                </Link>
                <Link href='/shop?slug=medicine'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/medicines.png" alt="" className='h-6' />
                        Pharmacy
                    </div>
                </Link>
                <Link href='/shop?slug=supplements'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/supplements.png" alt="" className='h-6' />
                        Supplements
                    </div>
                </Link>
                <Link href='/shop?slug=treats'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/treats.png" alt="" className='h-6' />
                        Treats
                    </div>
                </Link>
                <Link href='/shop?slug=supplies'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/toys.png" alt="" className='h-6' />
                        Supplies
                    </div>
                </Link>
            </div>

            {/* MAIN BANNER */}
            <div className="main-banner col-span-5">
                <Link href='/shop?slug=food'>
                    <div className="relative cursor-pointer">
                        <img src="/img/banner-1.png" alt="" className='h-52 xl:h-60 mb-3 xl:mb-4 rounded-lg w-full object-cover shadow' />
                        <h1 className="text-white text-3xl font-bold absolute top-10 left-5 w-7/12">Best Quality <br /> Pet Food</h1>
                        <button className='bg-red-500 font-semibold border-2 border-white px-4 py-2 text-white absolute bottom-10 left-5 rounded-lg'>shop now</button>
                    </div>
                </Link>
                <Link href='/shop?slug=veterinary supplements medicine'>
                    <div className="relative">
                        <img src="/img/banner-2.png" alt="" className='h-52 xl:h-60 mt-3 xl:mt-4 rounded-lg w-full object-cover shadow' />
                        <h1 className="text-white text-3xl font-bold absolute top-10 left-5 w-7/12">Veterinary <br /> Products</h1>
                        <button className='bg-red-500 font-semibold border-2 border-white px-4 py-2 text-white absolute bottom-10 left-5 rounded-lg'>shop now</button>
                    </div>
                </Link>
            </div>

            <div className="flex col-span-5 gap-1 lg:gap-4 lg:mt-0 mt-2">
                {/* RIGHT BANNER 1 */}
                <div className="relative h-90 lg:w-3/6 w-3/6 text-center">
                    <img src="/img/3rd.png" alt="" className='h-full object-cover rounded-lg w-full shadow' />
                    <h1 className="text-white text-xl font-bold absolute top-10 left-0 w-full px-2">Send us the prescription and we'll have it delivered</h1>
                    <button onClick={() => setIsUploadModalOpen(true)} className='bg-red-500 border-2 border-white px-4 py-2 text-white absolute bottom-10 left-16 xl:left-20 rounded-lg'>upload now</button>
                </div>

                {/* RIGHT BANNER 2 */}
                <div className="relative h-90 w-3/6 lg:w-3/6 text-center">
                    <img src="/img/4th.png" alt="" className='h-full object-cover rounded-lg w-full shadow' />
                    <h1 className="text-white text-xl font-bold absolute top-10 left-0 w-full px-2">Pathology <br /> <span className='text-3xl'>Coming Soon</span> </h1>
                </div>
            </div>
            <PrescriptionUpload isOpen={isUploadModalOpen} isMobile={isMobile} close={() => setIsUploadModalOpen(false)} />
        </div>
    )
}

export default BannerSection