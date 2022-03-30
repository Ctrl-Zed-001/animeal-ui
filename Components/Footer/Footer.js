import React from 'react'
import { MdCall } from 'react-icons/md'
import { AiOutlineWhatsApp } from 'react-icons/ai'

const Footer = () => {
    return (
        <div className="footer mt-32 pb-10 lg:pb-24 relative px-4 lg:px-0">
            <img src="/img/footer-bg.png" alt="" className='hidden lg:block -z-10 lg:absolute lg:bottom-0 left-0' />
            <img src="/img/footer-mobile-bg.png" alt="" className='lg:hidden -z-10 absolute -bottom-10 left-0' />
            <div className="container py-6 bg-white rounded-3xl ">
                <div className="top-row flex justify-between items-center lg:px-28">
                    <div className="flex items-center gap-8">
                        <img src="/img/logo.png" alt="" className='h-10 hidden lg:block' />
                        <h1 className="text-xs lg:text-2xl font-semibold">Experts are available 24 x 7</h1>
                    </div>
                    <div className="flex justify-between gap-4 lg:gap-8">
                        <a href="https://wa.me/+919004485093" className='lg:text-base flex items-center gap-2 bg-theme px-4 py-2 rounded-lg'><AiOutlineWhatsApp />chat with us</a>
                        <a href="tel:+919004485093" className='hidden text-xs lg:text-base lg:flex items-center gap-2 border-2 text-yellow-500 border-yellow-500 px-4 py-2 rounded-lg'><MdCall />9004485093</a>
                    </div>
                </div>
                <hr className='w-full bg-gray-500 my-8' />
                <div className="lg:flex justify-between items-center lg:px-28 lg:gap-10">
                    <div className="flex justify-between items-start lg:gap-6 text-xs lg:text-sm">
                        <div className="icon-text text-center">
                            <img src="/img/icons/reliable.png" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>Reliable</p>
                        </div>
                        <div className="icon-text text-center">
                            <img src="/img/icons/delivery.png" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>Free Shipping</p>
                        </div>
                        <div className="icon-text text-center">
                            <img src="/img/icons/return.png" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>Easy Return</p>
                        </div>
                        <div className="icon-text text-center">
                            <img src="/img/icons/products.png" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>2000+ products</p>
                        </div>
                    </div>

                    <div className="payment-options-footer hidden lg:block">
                        <div className="flex items-start gap-2">
                            <img src="/img/icons/shield.png" alt="" />
                            <p className="font-semibold text-sm text-green-500">100% payment protection, easy return policy</p>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            <img src="/img/icons/visa_footer.png" alt="" className='mx-auto h-4' />
                            <img src="/img/icons/googlePay_footer.png" alt="" className='mx-auto h-4' />
                            <img src="/img/icons/mastercard_footer.png" alt="" className='mx-auto h-4' />
                        </div>
                    </div>
                    <hr className='lg:hidden w-full bg-gray-500 my-8' />
                    <div className="social-media-section my-6 lg:my-0">
                        <div className="flex mb-2 gap-2 lg:gap-0 items-center lg:items-start justify-center">
                            <h1 className="font-semibold text-xs lg:text-sm">Show us some love on social media.</h1>
                            <img src="/img/icons/love.png" alt="" />
                        </div>
                        <div className="flex justify-center gap-4 lg:gap-4 text-center lg:mt-4">
                            <img src="/img/icons/fb.png" alt="" className='h-8' />
                            <img src="/img/icons/twitter.png" alt="" className='h-8' />
                            <img src="/img/icons/insta.png" alt="" className='h-8' />
                            <img src="/img/icons/whatsapp.png" alt="" className='h-8' />
                        </div>
                    </div>
                    <hr className='lg:hidden w-full bg-gray-500 my-8' />
                    <div className="flex lg:hidden mt-4 gap-4">
                        <img src="/img/icons/visa_footer.png" alt="" className='mx-auto h-4' />
                        <img src="/img/icons/googlePay_footer.png" alt="" className='mx-auto h-4' />
                        <img src="/img/icons/mastercard_footer.png" alt="" className='mx-auto h-4' />
                    </div>
                </div>
                <hr className='w-full bg-gray-500 my-8' />
                <div className="lg:flex justify-between items-center lg:px-28">
                    <div className="lg:flex items-center gap-4 px-10">
                        <img src="/img/logo.png" alt="" className='h-10 mx-auto' />
                        <h1 className='font-semibold text-xs lg:text-base text-center'> is brought to you by <span className="text-theme">GOODMAN VETCARE PVT. LTD.</span>  </h1>
                    </div>
                    <h1 className='font-semibold text-xs lg:text-base text-center'>© 2022 Copyright Animeal.in</h1>
                </div>
            </div>

            <img src="/img/footer_dog.png" alt="" className='absolute bottom-1 lg:-bottom-4 -left-16 lg:-left-36 h-32 lg:h-80 ' />
            <img src="/img/footer_cat.png" alt="" className='absolute -bottom-4 lg:-bottom-6 right-0 lg:right-10 h-32 lg:h-72' />
        </div >
    )
}

export default Footer