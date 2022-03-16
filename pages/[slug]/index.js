import React, { useEffect, useState } from 'react'
import AnimalBanner from '../../Components/AnimalPageComponents/AnimalBanner'
import CategoryBox from '../../Components/AnimalPageComponents/CategoryBox'
import ProductRow from '../../Components/HomeComponents/ProductRow'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import axios from 'axios'
import config from '../../config.json'

import 'swiper/css';
import 'swiper/css/autoplay';

const index = (props) => {

    return (
        <div className='main-animal-page mt-4'>
            {/* Banner */}
            <AnimalBanner />

            <div className="container my-10">
                <Swiper
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
                </Swiper>

            </div>

            {/* CATEGORY */}
            {
                props.categorylevels && props.categoryWiseProducts && props.categoryWiseProducts.map((products, index) => {
                    return products.length > 0 ?
                        <ProductRow key={index} title={props.categorylevels[index].category_name} products={products} /> :
                        <></>
                })

            }
        </div>
    )
}

export async function getServerSideProps({ query }) {

    let res = await axios.get(`${config.api_uri}/category/${query.slug}`)
    let categoryWiseProducts = res.data.categoryWiseProduct
    let categoryLevels = res.data.categorylevels


    return {
        props: {
            categoryWiseProducts: categoryWiseProducts,
            categorylevels: categoryLevels,
            slug: query.slug
        }
    }
}

export default index