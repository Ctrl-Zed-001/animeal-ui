import React, { useState, useEffect } from 'react'
import { MdCall } from 'react-icons/md'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { useRouter } from 'next/router'

const Footer = () => {

    const router = useRouter()
    const [show, setShow] = useState(true)
    const [showWhatsappText, setShowWhatsappText] = useState(false)


    useEffect(() => {
        if (router) {
            if (router.pathname == '/checkout' || router.pathname == '/cart' || router.pathname == '/wishlist') {
                setShow(false)
            } else {
                setShow(true)
            }
        }
    }, [router])

    return (
        <div className={`${show ? 'block' : 'hidden'} footer mt-32 pb-10 lg:pb-24 relative px-4 lg:px-0`}>
            <a target="_blank" href="https://wa.me/+919004485093">
                <img onMouseOver={() => setShowWhatsappText(true)} onMouseLeave={() => setShowWhatsappText(false)} src="/img/wp.png" alt="" className='fixed bottom-16 right-0 h-16 w-16 z-50' />
                <span className={`fixed bottom-20 right-20 text-white bg-green-500 px-3 rounded-lg text-sm ${showWhatsappText ? 'showtext' : 'hidden'}`}>Whatsapp Us</span>
            </a>
            <img src="/img/footer-bg.webp" alt="" className='hidden lg:block -z-10 lg:absolute lg:bottom-0 left-0' />
            <img src="/img/footer-mobile-bg.webp" alt="" className='lg:hidden -z-10 absolute -bottom-10 left-0 w-full' />
            <div className="container py-6 bg-white rounded-3xl ">
                <div className="top-row flex justify-between items-center lg:px-28">
                    <div className="flex items-center gap-8">
                        <img src="/img/logo.webp" alt="" className='h-10 hidden lg:block' />
                        <h1 className="text-xs lg:text-2xl font-semibold">Experts are available 24 x 7</h1>
                    </div>
                    <div className="flex justify-between gap-4 lg:gap-8">
                        <a href="https://wa.me/+919004485093" className='lg:text-base flex items-center gap-2 bg-theme px-4 py-2 rounded-lg'><AiOutlineWhatsApp />chat with us</a>
                        <a href="tel:+919004485093" className='hidden text-xs lg:text-base lg:flex items-center gap-2 border-2 text-yellow-500 border-yellow-500 px-4 py-2 rounded-lg'><MdCall />9004485093</a>
                    </div>
                </div>
                <hr className='w-full bg-gray-500 my-4 xl:my-8' />
                <div className="lg:flex justify-between items-center lg:px-28 lg:gap-10">
                    <div className="flex justify-between items-start lg:gap-6 text-xs lg:text-sm">
                        <div className="icon-text text-center">
                            <img src="/img/icons/reliable.webp" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>Reliable</p>
                        </div>
                        <div className="icon-text text-center">
                            <img src="/img/icons/delivery.webp" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>Free Shipping</p>
                        </div>
                        <div className="icon-text text-center">
                            <img src="/img/icons/return.webp" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>Easy Return</p>
                        </div>
                        <div className="icon-text text-center">
                            <img src="/img/icons/products.webp" alt="" className='mb-2 mx-auto h-10' />
                            <p className='font-semibold'>2000+ products</p>
                        </div>
                    </div>

                    <div className="payment-options-footer hidden lg:block">
                        <div className="flex items-start gap-2">
                            <img src="/img/icons/shield.webp" alt="" />
                            <p className="font-semibold text-sm text-green-500">100% payment protection, easy return policy</p>
                        </div>
                        <div className="grid grid-cols-5 gap-4 mt-4">
                            <img src="/img/icons/visa_footer.webp" alt="" className='mx-auto h-4' />
                            <img src="/img/icons/googlePay_footer.webp" alt="" className='mx-auto h-4' />
                            <img src="/img/icons/mastercard_footer.webp" alt="" className='mx-auto h-4' />
                            <img src="/img/icons/rupay.webp" alt="" className='mx-auto h-4' />
                            <img src="/img/icons/upi.webp" alt="" className='mx-auto h-4' />
                        </div>
                    </div>
                    <hr className='lg:hidden w-full bg-gray-500 my-4 xl:my-8' />
                    <div className="social-media-section my-6 lg:my-0">
                        <div className="flex mb-2 gap-2 lg:gap-0 items-center lg:items-start justify-center">
                            <h2 className="font-semibold text-xs lg:text-sm">Show us some love on social media.</h2>
                            <img src="/img/icons/love.webp" alt="" />
                        </div>
                        <div className="flex justify-center gap-4 lg:gap-4 text-center lg:mt-4 ">
                            <a className='' href="https://www.facebook.com/animeal.in"><img src="/img/icons/fb.webp" alt="" className='h-8' /></a>
                            <a className='' href="https://twitter.com/animeal_in/"><img src="/img/icons/twitter.webp" alt="" className='h-8' /></a>
                            <a className='' href="https://www.instagram.com/animeal.in/"><img src="/img/icons/insta.webp" alt="" className='h-8' /></a>
                            <a className='' href="https://wa.me/+919004485093"><img src="/img/icons/whatsapp.webp" alt="" className='h-8' /></a>
                        </div>
                    </div>
                    <hr className='lg:hidden w-full bg-gray-500 my-4 xl:my-8' />
                    <div className="flex lg:hidden mt-4 gap-4">
                        <img src="/img/icons/visa_footer.webp" alt="" className='mx-auto h-4' />
                        <img src="/img/icons/googlePay_footer.webp" alt="" className='mx-auto h-4' />
                        <img src="/img/icons/mastercard_footer.webp" alt="" className='mx-auto h-4' />
                        <img src="/img/icons/rupay.webp" alt="" className='mx-auto h-4' />
                        <img src="/img/icons/upi.webp" alt="" className='mx-auto h-4' />
                    </div>
                </div>
                <hr className='w-full bg-gray-500 my-4 xl:my-8' />
                <div className="lg:flex justify-between items-center lg:px-28">
                    <div className="lg:flex items-center gap-4 px-10">
                        <img src="/img/logo.webp" alt="" className='h-10 mx-auto' />
                        <h2 className='font-semibold hidden xl:block text-xs lg:text-base text-center'> is brought to you by <span className="text-theme">GOODMAN VETCARE PVT. LTD.</span>  </h2>
                        <h2 className='font-semibold block xl:hidden text-xs lg:text-base text-center'> is brought to you by <br /> <span className="text-theme">GOODMAN VETCARE PVT. LTD.</span>  </h2>
                    </div>
                    <h2 className='font-semibold text-xs lg:text-base text-center'>© 2022 Copyright Animeal.in</h2>
                </div>
            </div>

            <img src="/img/footer_dog.webp" alt="" className='absolute bottom-1 lg:-bottom-4 -left-16 lg:-left-36 h-32 lg:h-80 ' />
            <img src="/img/footer_cat.webp" alt="" className='absolute -bottom-4 lg:-bottom-6 right-0 lg:right-10 h-32 lg:h-72 ' />
        </div >
    )
}

export default Footer