import React, { useEffect } from 'react'
import SubCategoryBox from '../../../Components/AnimalPageComponents/SubCategoryBox'
import ProductRow from '../../../Components/HomeComponents/ProductRow'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import axios from 'axios'
import { api_uri } from '../../../config.json'
import { useRouter } from 'next/router';

const index = () => {

    const router = useRouter()
    console.log("🚀 ~ file: index.js ~ line 16 ~ index ~ router", router)

    useEffect(() => {
        if (router) {
            axios.get(`${api_uri}/category/${router.query.slug}/${router.query.category}`)
                .then(res => {
                    console.log("🚀 ~ file: index.js ~ line 20 ~ useEffect ~ res", res.data)
                })
                .catch(err => console.log(err))
        }
    }, [])

    return (
        <div className='subcategory-page my-10'>

            <div className="subcategory-row container">
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
                    <SwiperSlide><SubCategoryBox /></SwiperSlide>
                    <SwiperSlide><SubCategoryBox /></SwiperSlide>
                    <SwiperSlide><SubCategoryBox /></SwiperSlide>
                    <SwiperSlide><SubCategoryBox /></SwiperSlide>
                    <SwiperSlide><SubCategoryBox /></SwiperSlide>
                    <SwiperSlide><SubCategoryBox /></SwiperSlide>
                    <SwiperSlide><SubCategoryBox /></SwiperSlide>
                    <SwiperSlide><SubCategoryBox /></SwiperSlide>
                </Swiper>
            </div>

            <ProductRow title='Top Cat Dry Food' />

        </div>
    )
}

export default index