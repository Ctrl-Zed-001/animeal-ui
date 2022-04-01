import React, { useEffect, useState } from 'react'
import AnimalBanner from '../../Components/AnimalPageComponents/AnimalBanner'
import CategoryBox from '../../Components/AnimalPageComponents/CategoryBox'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import axios from 'axios'
import ProductRow from '../../Components/HomeComponents/ProductRow'
import Brands from '../../Components/HomeComponents/Brands'

import 'swiper/css';
import 'swiper/css/autoplay';

const index = (props) => {

    const [categoryWiseProducts, setCategoryWiseProducts] = useState()

    useEffect(() => {
        getProductsByCategory()
    }, [props])

    const getProductsByCategory = async () => {
        let allFetchedProducts = []
        for (const category of props.categorylevels) {
            let fetchedProducts = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/category/level2products/categoryonetwowise`, {
                category1: props.slug,
                category2: category.category_url
            })
            allFetchedProducts.push({
                category: category.category_name,
                products: fetchedProducts.data
            })
        }
        setCategoryWiseProducts(allFetchedProducts)
    }
    return (
        <div className='main-animal-page mt-4'>
            {/* Banner */}
            <AnimalBanner image={`/category-banner/${props.banner}`} title={`The ${props.slug} Shop`} />

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

            {/* BRANDS */}

            <Brands title={`Popular Brands for ${props.slug}`} />
        </div>
    )
}

export async function getServerSideProps({ query }) {

    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/category/${query.slug}`)
    let bannerRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/banners/getcategorybanner/${query.slug}`)
    let categoryLevels = res.data.categorylevels
    let banner = bannerRes.data.categoryBanner


    return {
        props: {
            // categoryWiseProducts: categoryWiseProducts,
            categorylevels: categoryLevels,
            slug: query.slug,
            banner: banner
        }
    }
}

export default index