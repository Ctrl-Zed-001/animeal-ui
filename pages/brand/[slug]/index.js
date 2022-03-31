import React from 'react'
import AnimalBanner from '../../../Components/AnimalPageComponents/AnimalBanner'
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductRow from '../../../Components/HomeComponents/ProductRow';

import 'swiper/css';
import 'swiper/css/autoplay';
import axios from 'axios';

const Brand = (props) => {
    return (
        <div className='main-brand-page mt-4'>
            {/* Banner */}
            <AnimalBanner image={props.banner} />

            <div className="container my-10">
                {/* <Swiper
                    modules={[Autoplay]}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    autoplay={{ delay: 2000 }}
                >
                    {
                        props.categorylevels && props.categorylevels.map((category, index) => {
                            return <SwiperSlide key={index}><CategoryBox animal={props.slug} category={category} /></SwiperSlide>
                        })

                    }
                </Swiper> */}

            </div>

            {/* CATEGORY */}
            {/* {
                categoryWiseProducts && categoryWiseProducts.map((products, index) => {
                    if (products.products.categoryLevel2WiseProduct && products.products.categoryLevel2WiseProduct.length !== null) {
                        return <ProductRow key={index} title={products.category} products={products.products.categoryLevel2WiseProduct} />
                    }
                })

            } */}


        </div>
    )
}

export async function getServerSideProps({ query }) {

    let endpoints = [
        `${process.env.NEXT_PUBLIC_API_URI}/brand/branddetails/post/data`, { brand_slug: query.slug, category: 'food' },
        `${process.env.NEXT_PUBLIC_API_URI}/brand/branddetails/post/data`, { brand_slug: query.slug, category: 'food' },
        `${process.env.NEXT_PUBLIC_API_URI}/brand/branddetails/post/data`, { brand_slug: query.slug, category: 'food' },
        `${process.env.NEXT_PUBLIC_API_URI}/brand/branddetails/post/data`, { brand_slug: query.slug, category: 'food' },
        `${process.env.NEXT_PUBLIC_API_URI}/brand/branddetails/post/data`, { brand_slug: query.slug, category: 'food' }
    ];

    let allResponse = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
    console.log("🚀 ~ file: index.js ~ line 71 ~ getServerSideProps ~ allResponse", allResponse)




    return {
        props: {
            brands: []
        }
    }
}

export default Brand