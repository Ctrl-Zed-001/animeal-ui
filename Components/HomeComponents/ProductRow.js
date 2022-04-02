import React from 'react'
import ProductBox from '../ProductBox/ProductBox'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductRow = (props) => {
    return (
        <div className="container top-products my-8">
            <h1 className='font-medium text-xl'>{props.title}</h1>

            <div className="mt-8">
                <Swiper
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                    }}
                    className='mx-auto h-full main-img-container drop-shadow'
                    spaceBetween={26}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >
                    {
                        props.products && props.products.map((product, index) => {
                            return <SwiperSlide key={index}><ProductBox product={product} /></SwiperSlide>
                        })

                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ProductRow