import React, { useState, useEffect } from 'react';
import Rating from '../../Components/ProductBox/Rating';
import Breadcrumb from '../../Components/ProductPageComponents/Breadcrumb';
import { BiRupee } from 'react-icons/bi';
import { RiShoppingCartLine, RiHeart3Line } from 'react-icons/ri';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { Input } from '@nextui-org/react';
import ProductRow from '../../Components/HomeComponents/ProductRow'
import Reviews from '../../Components/ProductPageComponents/Reviews';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import config from '../../config.json'


import 'swiper/css';
import 'swiper/css/autoplay';


const Product = (props) => {

    const [count, setCount] = useState(1)

    return (

        <div className='product-page my-10'>

            <div className="md:flex container gap-20 mb-20">
                {/* PRODUCT IMAGE SLIDER */}
                <div className='bg-white rounded-lg md:w-5/12 h-fit'>
                    <Swiper
                        slidesPerView={1}
                        className='mx-auto'
                    >
                        {
                            props.product.productimages.map((image, index) => {
                                return <SwiperSlide className=''><img src={`${config.image_uri}/${image.product_id}/${image.product_image}`} alt="" className='rounded-lg' /></SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>


                {/* DATA */}
                <div className="product-data flex-1">
                    {/* <Breadcrumb className="hidden md:block" /> */}
                    <h3 className="text-theme font-semibold">{props.product.products.animal}</h3>
                    <h1 className="text-3xl font-semibold mb-2 text-slate-900">
                        {props.product.products.website_pro_name}
                        <span className='text-xs text-slate-600 font-light ml-3'>by : whiskers</span>
                    </h1>
                    <div className="flex">
                        <Rating />
                        <p className='text-xs text-slate-600 font-light ml-3'>143 customer reviews</p>
                    </div>

                    <div className="flex mt-4 items-center">
                        <h3 className="text-sm text-gray-500 flex items-center mr-2 line-through"><BiRupee /> {props.product.products.mrp}</h3>
                        <h1 className="text-2xl flex items-center font-semibold"><BiRupee /> {props.product.productPriceApi}</h1>
                    </div>
                    <p className="text-xs flex items-center mt-2 text-green-500 font-semibold">you save <BiRupee /> 1000 </p>
                    <p className='text-xs text-slate-600 font-light mt-3'>Free 1-3 day shipping on this item.</p>

                    <div className="bg-white rounded-lg p-3 mt-3">
                        <p className='text-red-500 text-xs font-medium mb-4'>Only {props.product.availableStock} left in stock</p>
                        <div className="md:flex items-center w-5/6 justify-between">
                            <Input clearable placeholder='check for delivery' type={'number'} />
                            <p className="text-xs font-semibold text-green-600 mt-3 md:mt-0 ml-2 md:ml-0 ">Delivery available for 410 206</p>
                        </div>

                        <div className="flex items-start w-full mt-4">

                            {/* <div className='counter mr-10'>
                                <p className="text-center mb-3 text-sm">Quantity</p>
                                <div className="flex items-center justify-between">
                                    <HiPlusSm className='cursor-pointer bg-slate-200 text-slate-600 text-lg rounded' />
                                    <span className="text-sm mx-4">{count}</span>
                                    <HiMinusSm className='cursor-pointer bg-slate-200 text-slate-600 text-lg rounded' />
                                </div>
                            </div> */}

                            {
                                props.product.similarproduct ?
                                    <div className="variations">
                                        <p className="mb-3 text-sm">Variations</p>
                                        <div className="flex">
                                            {
                                                props.product.similarproduct.map((prod, index) => {
                                                    return <Link key={index} href={`/product/${prod.website_slug_name}`}><div className="size cursor-pointer bg-slate-100 p-2 text-xs rounded mr-4">{prod.product_weight}</div></Link>
                                                })
                                            }

                                        </div>
                                    </div> :
                                    <></>
                            }



                        </div>

                        <div className="flex">
                            <button className='bg-theme flex items-center mt-6 py-2 px-2 rounded shadow text-sm md:text-base'>
                                <RiShoppingCartLine className='md:text-sm mr-2' />
                                Add To Cart
                            </button>
                            <button className='bg-slate-100 flex items-center mt-6 py-2 px-2 rounded shadow ml-4 text-slate-600 text-sm md:text-base'>
                                <RiHeart3Line className='text-sm mr-2' />
                                Add To Wishlist
                            </button>
                        </div>

                    </div>


                    <hr className='border-1 border-gray-300 my-6' />

                    <p className="text-justify text-xs leading-5 text-slate-600 mb-10">
                        {props.product.products.shortdescription}
                    </p>

                </div>

            </div>

            {/* RELATED ITEMS */}
            <ProductRow title="Related products" />

            <div className="container">
                <hr className='border-1 border-gray-300 my-10' />
            </div>

            {/* CUSTOMER REVIEW */}
            <Reviews />

        </div>
    )
}

export async function getServerSideProps({ query }) {

    let slug = query.slug;

    let res = await axios.get(`${config.api_uri}/singleproduct/${slug}`)
    let product = await res.data

    return {
        props: {
            product: product
        }
    }
}

export default Product