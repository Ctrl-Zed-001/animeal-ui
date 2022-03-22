import React from 'react'
import { MdCall } from 'react-icons/md'
import { BsChatDots } from 'react-icons/bs'

const Footer = () => {
    return (
        <div className="footer mt-32 pb-10 md:pb-44 relative px-4 md:px-0">
            <img src="/img/footer-bg.png" alt="" className='hidden md:block -z-10 md:absolute md:top-8 left-0' />
            <img src="/img/footer-mobile-bg.png" alt="" className='md:hidden -z-10 absolute -bottom-10 left-0' />
            <div className="container p-10 bg-white rounded-3xl ">
                <div className="top-row flex justify-between items-center md:px-32">
                    <div className="flex items-center gap-8">
                        <img src="/img/logo.png" alt="" className='h-10 hidden md:block' />
                        <h1 className="text-xs md:text-2xl font-semibold">Our Experts are available 24 x 7</h1>
                    </div>
                    <div className="flex justify-between gap-4 md:gap-8">
                        <button className='md:text-base flex items-center gap-2 bg-theme px-4 py-2 rounded-lg'><BsChatDots />contact us</button>
                        <button className='hidden text-xs md:text-base md:flex items-center gap-2 border-2 text-yellow-500 border-yellow-500 px-4 py-2 rounded-lg'><MdCall />contact us</button>
                    </div>
                </div>
                <hr className='w-full bg-gray-500 my-8' />
                <div className="md:flex justify-between items-center md:px-32">
                    <div className="flex justify-between items-center md:gap-6 text-xs md:text-sm">
                        <div className="icon-text">
                            <img src="/img/icons/reliable.png" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>Reliable</p>
                        </div>
                        <div className="icon-text">
                            <img src="/img/icons/delivery.png" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>Free Shipping</p>
                        </div>
                        <div className="icon-text">
                            <img src="/img/icons/return.png" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>Easy Return</p>
                        </div>
                        <div className="icon-text">
                            <img src="/img/icons/products.png" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>2000+ products</p>
                        </div>
                    </div>

                    <div className="payment-options-footer hidden md:block">
                        <div className="flex items-center gap-2">
                            <img src="/img/icons/shield.png" alt="" />
                            <p className="font-semibold text-sm text-green-500">100% payment protection, easy return policy</p>
                        </div>
                        <div className="flex justify-center mt-4">
                            <img src="/img/icons/visa_footer.png" alt="" className='mx-auto h-4' />
                            <img src="/img/icons/googlePay_footer.png" alt="" className='mx-auto h-4' />
                            <img src="/img/icons/mastercard_footer.png" alt="" className='mx-auto h-4' />
                            <img src="/img/icons/visa_footer.png" alt="" className='mx-auto h-4' />
                        </div>
                    </div>
                    <hr className='md:hidden w-full bg-gray-500 my-8' />
                    <div className="social-media-section my-6 md:my-0">
                        <div className="flex gap-6 items-center justify-center">
                            <h1 className="font-semibold text-xs md:text-sm">Show us some love on social media.</h1>
                            <img src="/img/icons/love.png" alt="" />
                        </div>
                        <div className="flex justify-center gap-4 md:gap-4 text-center">
                            <img src="/img/icons/fb.png" alt="" className='h-8' />
                            <img src="/img/icons/twitter.png" alt="" className='h-8' />
                            <img src="/img/icons/insta.png" alt="" className='h-8' />
                            <img src="/img/icons/whatsapp.png" alt="" className='h-8' />
                        </div>
                    </div>
                    <hr className='md:hidden w-full bg-gray-500 my-8' />
                    <div className="flex md:hidden mt-4 gap-4">
                        <img src="/img/icons/visa_footer.png" alt="" className='mx-auto h-4' />
                        <img src="/img/icons/googlePay_footer.png" alt="" className='mx-auto h-4' />
                        <img src="/img/icons/mastercard_footer.png" alt="" className='mx-auto h-4' />
                        <img src="/img/icons/visa_footer.png" alt="" className='mx-auto h-4' />
                    </div>
                </div>
                <hr className='w-full bg-gray-500 my-8' />
                <div className="md:flex justify-between items-center md:px-32">
                    <div className="flex items-center gap-4">
                        <img src="/img/goodman.png" alt="" />
                        <h1 className='font-semibold text-xs md:text-base'>animeal.in, is brought to you by <span className="text-theme">GOODMAN VETCARE PVT. LTD.</span>  </h1>
                    </div>
                    <h1 className='font-semibold text-xs md:text-base text-center'>© 2020 Copyright Animeal.in</h1>
                </div>
            </div>

            <img src="/img/footer_dog.png" alt="" className='absolute bottom-1 md:-bottom-4 -left-16 md:-left-20 h-32 md:h-96 ' />
            <img src="/img/footer_cat.png" alt="" className='absolute -bottom-4 md:-bottom-6 right-0 md:right-32 h-32 md:h-96' />
        </div >
    )
}

export default Footer