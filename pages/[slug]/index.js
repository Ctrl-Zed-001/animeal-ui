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

const index = () => {

    const [categories, setCategories] = useState()
    const [categoryWiseProducts, setCategoryWiseproducts] = useState()



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
                        categories && categories.map((category, index) => {
                            return <SwiperSlide key={index}><CategoryBox animal={router.query.slug} category={category} /></SwiperSlide>
                        })

                    }
                </Swiper>

            </div>

            {/* CATEGORY */}
            {
                categoryWiseProducts && categoryWiseProducts.map((products, index) => {
                    return products.length > 0 ?
                        <ProductRow key={index} title={categories[index].category_name} products={products} /> :
                        <></>
                })

            }
        </div>
    )
}

export async function getServerSideProps({ query }) {

    let res = await axios.get(`${config.api_uri}/category/${query.slug}`)
    console.log("🚀 ~ file: index.js ~ line 81 ~ getServerSideProps ~ res", res.data)


    return {
        props: {

        }
    }
}

export default index