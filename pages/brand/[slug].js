import React from 'react'
import AnimalBanner from '../../Components/AnimalPageComponents/AnimalBanner'
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductRow from '../../Components/HomeComponents/ProductRow';

import 'swiper/css';
import 'swiper/css/autoplay';

const Brand = () => {
    return (
        <div className='main-brand-page mt-4'>
            {/* Banner */}
            <AnimalBanner image={props.banner} />

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
                categoryWiseProducts && categoryWiseProducts.map((products, index) => {
                    if (products.products.categoryLevel2WiseProduct && products.products.categoryLevel2WiseProduct.length !== null) {
                        return <ProductRow key={index} title={products.category} products={products.products.categoryLevel2WiseProduct} />
                    }
                })

            }


        </div>
    )
}

export default Brand