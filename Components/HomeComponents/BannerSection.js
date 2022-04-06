import React, { useContext, useState } from 'react'
import Link from 'next/link'
import PrescriptionUpload from './PrescriptionUpload'
import { AuthContext } from '../../Context/AuthContext'
import UploadStatusModal from './UploadStatusModal'

const BannerSection = () => {
    const { isMobile } = useContext(AuthContext)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
    const [status, setStatus] = useState()

    const handleClose = (status) => {
        console.log("🚀 ~ file: BannerSection.js ~ line 14 ~ handleClose ~ status", status)
        setStatus(status)
        setIsUploadModalOpen(false)
        setIsStatusModalOpen(true)
    }

    return (
        <div className="banner-section lg:grid lg:grid-cols-12 lg:gap-4 justify-between container">

            {/* POPULAR CATEGORIES */}
            <div className="hidden lg:block popular-categories bg-white shadow rounded-lg p-3 h-full text-sm col-span-2">
                <h1 className='font-semibold'>Popular Categories</h1>

                <Link href='/dog/food'>
                    <div className="popular-category-item flex items-center mt-6 gap-2 font-medium cursor-pointer">
                        <img src="/img/icons/dog.webp" alt="" className='h-6' />
                        Dog Food
                    </div>
                </Link>
                <Link href='/cat/food'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/cat.webp" alt="" className='h-6' />
                        Cat Food
                    </div>
                </Link>
                <Link href='/dog/medicine'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/medicines.webp" alt="" className='h-6' />
                        Dog Medicine
                    </div>
                </Link>
                <Link href='/dog/treats'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/treats.webp" alt="" className='h-6' />
                        Dog Treats
                    </div>
                </Link>
                <Link href='/cat/supplies'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/toys.webp" alt="" className='h-6' />
                        Cat Supplies
                    </div>
                </Link>
                <Link href='/dog/supplements'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/supplements.webp" alt="" className='h-6' />
                        Dog Supplements
                    </div>
                </Link>
                <Link href='/cat/treats'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/premium-food.webp" alt="" className='h-6' />
                        Cat Treats
                    </div>
                </Link>
                <Link href='/dog/supplies'>
                    <div className="popular-category-item flex items-center mt-6 gap-2  font-medium cursor-pointer">
                        <img src="/img/icons/cat-wet-food.webp" alt="" className='h-6' />
                        Dog Supplies
                    </div>
                </Link>
            </div>

            {/* MAIN BANNER */}
            <div className="main-banner col-span-5">
                <Link href='/shop?slug=food'>
                    <div className="relative cursor-pointer">
                        <img src="/img/banner-1.webp" alt="" className='h-52 xl:h-60 mb-3 xl:mb-4 rounded-lg w-full object-cover shadow' />
                        <h1 className="text-white xl:text-3xl font-bold absolute top-10 left-5 w-7/12">Best Quality <br /> Pet Food <br /> 10% OFF</h1>
                        <button className='bg-red-500 hover:bg-transparent transition-all font-semibold border-2 border-white px-4 py-2 text-white text-xs xl:text-base absolute bottom-10 left-5 rounded-lg'>Shop Now</button>
                    </div>
                </Link>
                <Link href='/shop?slug=veterinary supplements medicine'>
                    <div className="relative">
                        <img src="/img/banner-2.webp" alt="" className='h-52 xl:h-60 mt-3 xl:mt-4 rounded-lg w-full object-cover shadow' />
                        <h1 className="text-white xl:text-3xl font-bold absolute top-10 left-5 w-7/12">Veterinary <br /> Products <br />10% OFF</h1>
                        <button className='bg-amber-600 hover:bg-transparent transition-all font-semibold border-2 border-white px-4 py-2 text-white text-xs xl:text-base absolute bottom-10 left-5 rounded-lg'>Shop Now</button>
                    </div>
                </Link>
            </div>

            <div className="flex col-span-5 gap-1 lg:gap-4 lg:mt-0 mt-2">
                {/* RIGHT BANNER 1 */}
                <div className="relative h-90 lg:w-3/6 w-3/6 text-center">
                    <img src="/img/3rd.webp" alt="" className='h-full object-cover rounded-lg w-full shadow' />
                    <h1 className="text-white xl:text-xl font-bold absolute top-4 xl:top-10 left-0 w-full px-2">Send us the prescription and we'll have it delivered</h1>
                    <button onClick={() => setIsUploadModalOpen(true)} className='bg-amber-900 hover:bg-transparent transition-all border-2 border-white px-4 py-2 text-white absolute top-28 xl:top-36 left-10 xl:left-16 font-semibold rounded-lg text-xs'>Upload Now</button>
                </div>

                {/* RIGHT BANNER 2 */}
                <div className="relative h-90 w-3/6 lg:w-3/6 text-center">
                    <img src="/img/4th.webp" alt="" className='h-full object-cover rounded-lg w-full shadow' />
                    <h1 className="text-white text-xl font-bold absolute bottom-10 left-0 w-full px-2">Pathology <br /> <span className='text-3xl'>Coming Soon</span> </h1>
                </div>
            </div>
            <PrescriptionUpload isOpen={isUploadModalOpen} isMobile={isMobile} close={() => setIsUploadModalOpen(false)} showStatus={handleClose} />
            <UploadStatusModal isOpen={isStatusModalOpen} close={() => setIsStatusModalOpen(false)} status={status} />
        </div>
    )
}

export default BannerSection