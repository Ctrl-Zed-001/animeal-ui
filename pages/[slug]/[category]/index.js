import React from 'react'
import SubCategoryBox from '../../../Components/AnimalPageComponents/SubCategoryBox'
import ProductRow from '../../../Components/HomeComponents/ProductRow'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import axios from 'axios'
import config from '../../../config.json'


const index = (props) => {

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
                    {
                        props.categorylevels && props.categorylevels.map((category, index) => {
                            return <SwiperSlide key={index}><SubCategoryBox category={category} /></SwiperSlide>
                        })
                    }
                </Swiper>
            </div>

            <ProductRow title={`Top ${props.animal} ${props.category}`} />

        </div>
    )
}

export async function getServerSideProps({ query }) {

    let res = await axios.get(`${config.api_uri}/category/${query.slug}/${query.category}`)

    let categorylevels = res.data.categorylevels3;
    let categoryWiseProducts = res.data.category3WiseProduct


    return {
        props: {
            categorylevels: categorylevels,
            categoryWiseProducts: categoryWiseProducts,
            animal: query.slug,
            category: query.category
        }
    }
}

export default index