import dayjs from 'dayjs'
import React from 'react'
import { BiRupee } from 'react-icons/bi'
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode, Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const CurrentOrderBox = (props) => {

    return (
        <div className="current-order-box mb-4 text-xs border rounded-lg p-3 shadow">
            <div className="lg:grid grid-cols-2 gap-20">

                <div className="left-side">
                    <h1 className=" font-semibold mb-4 ">Order Id: {props.order[0].order_id}</h1>
                    <div className="order-products">
                        <Swiper
                            breakpoints={{
                                320: {
                                    slidesPerView: 2,
                                    spaceBetween: 14,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 14,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 14,
                                },
                            }}
                            className='w-full mx-auto h-full main-img-container drop-shadow'
                            spaceBetween={26}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                        >
                            {
                                props.order[0].orders.map((product, index) => {
                                    return (

                                        <SwiperSlide key={index}>
                                            <div className="bg-slate-200 rounded-lg p-4 ">
                                                <img src="/img/product-placeholder.webp" alt="" className='h-20' />
                                                <div className="flex-1 font-medium">
                                                    <h1 className='product-box-name'>{product.product_name}</h1>
                                                    <div className="flex justify-between text-xs">
                                                        <p className='text-slate-500 text-xs my-1'><span className="font-semibold text-black">size :</span> {product.product_quantity_kg}</p>
                                                        <p className='text-slate-500 text-xs my-1'><span className="font-semibold text-black">Qty :</span> {product.buying_quantity}</p>
                                                    </div>
                                                    <p className='flex items-center'><BiRupee /> {Math.round(parseInt(product.product_total_price))}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>


                                    )
                                })
                            }
                        </Swiper>

                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {/* <button className='bg-red-400 rounded-lg p-2 px-4 text-white text-xs'>cancel order</button> */}
                        <button className='bg-slate-200 rounded-lg p-1 px-4 text-black text-xs'>Need help?</button>
                        {/* <button className='bg-slate-200 rounded-lg p-1 px-4 text-black cursor-not-allowed text-xs' disabled>Download Invoice</button> */}
                    </div>
                </div>

                <div className="right-side mt-4 lg:mt-0">
                    <h1 className=" font-semibold mb-4">Shipping Details</h1>
                    <p className="text-xs text-slate-500">{props.order[0].address1 + ', ' + props.order[0].address2 + ', ' + props.order[0].city + ', ' + props.order[0].state + ' ' + props.order[0].pincode}  </p>

                    <h1 className=" font-semibold mb-4 mt-6">Shipping Details</h1>
                    <table className='w-full lg:w-6/12 text-xs text-slate-500'>
                        <tbody>
                            <tr>
                                <td>Sub Total : </td>
                                <td>{Math.round(parseInt(props.order[0].total_amount))}</td>
                            </tr>
                            <tr>
                                <td>Delivery Charges : </td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Coupon Discount : </td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Total : </td>
                                <td>{Math.round(parseInt(props.order[0].total_amount))}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ORDER TIMELINE */}
            <div className="grid grid-cols-4 mt-12 relative text-xs order-timeline">
                <div className="milestoneline w-full h-1 bg-slate-200 absolute top-1 left-0 -z-10"></div>

                <div className="col">
                    <div className="milestone h-3 w-3 bg-green-600 rounded-full mb-2 lg:mb-4 z-10"></div>
                    <h1>Order placed</h1>
                    <p className="lg:text-xs text-slate-500">{dayjs(props.order[0].created_at).format("ddd, DD MMM YYYY")}</p>
                </div>
                <div className="col text-center">
                    <div className="milestone h-3 w-3 bg-slate-200 rounded-full mb-2 lg:mb-4 mx-auto"></div>
                    <h1>Shipped</h1>
                    <p className="lg:text-xs text-slate-500"></p>
                </div>
                <div className="col text-center">
                    <div className="milestone h-3 w-3 bg-slate-200 rounded-full mb-2 lg:mb-4 mx-auto"></div>
                    <h1>Out for delivery</h1>
                    <p className="lg:text-xs text-slate-500"></p>
                </div>
                <div className="col text-right flex flex-col items-end">
                    <div className="milestone h-3 w-3 bg-slate-200 rounded-full mb-2 lg:mb-4 "></div>
                    <h1>Delivered</h1>
                    <p className="lg:text-xs text-slate-500"></p>
                </div>
            </div>

        </div>
    )
}

export default CurrentOrderBox