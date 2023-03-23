import React, { useState, useEffect } from 'react'
import SubCategoryBox from '../../../Components/AnimalPageComponents/SubCategoryBox'
import ProductRow from '../../../Components/HomeComponents/ProductRow'
import AnimalBanner from '../../../Components/AnimalPageComponents/AnimalBanner'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import axios from 'axios'
import Head from 'next/head';


const index = (props) => {
    console.log("🚀 ~ file: index.js ~ line 15 ~ index ~ props", props)

    const [categoryWiseProducts, setCategoryWiseProducts] = useState()

    useEffect(() => {
        getProductsByCategory()
    }, [props])

    const getProductsByCategory = async () => {
        let allFetchedProducts = []
        for (const category of props.categorylevels) {
            let fetchedProducts = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/category/level3products/categoryonetwothreewise`, {
                category1: props.animal,
                category2: props.category,
                category3: category.category_url
            })
            allFetchedProducts.push({
                category: category.category_name,
                products: fetchedProducts.data
            })
        }
        setCategoryWiseProducts(allFetchedProducts)
    }

    return (
        <div className='subcategory-page mt-16'>

            {
                props.metaData ?
                    <Head>
                        <title>{props.metaData.meta_title}</title>
                        <meta name="description" content={props.metaData.meta_description} />
                    </Head> :
                    <></>
            }

            {/* Banner */}
            <AnimalBanner hasImage={props.banner !== null ? true : false} image={`/category-banner/${props.banner}`} title={`${props.animal} ${props.category}`} />

            <div className="subcategory-row container my-10">
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
                        props.categorylevels && props.categorylevels.map((subcategory, index) => {
                            return <SwiperSlide key={index}><SubCategoryBox animal={props.animal} category={props.category} subcategory={subcategory} /></SwiperSlide>
                        })
                    }
                </Swiper>
            </div>

            {/* CATEGORY */}
            {
                categoryWiseProducts && categoryWiseProducts.map((products, index) => {
                    if (products.products.categoryLevel3WiseProduct && products.products.categoryLevel3WiseProduct.length !== null) {
                        return <ProductRow showLink={true} animal={props.animal} subcategory={props.category} key={index} title={products.category} products={products.products.categoryLevel3WiseProduct} />
                    }
                })

            }

        </div>
    )
}

export async function getServerSideProps({ query }) {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/category/${query.animal}/${query.category}`)
    let bannerRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/banners/getcategorybannerlevel2/${query.animal}/${query.category}`)
    let metaData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/metaurl/post/data`,
        {
            slug: "https://animeal.in/" + query.animal + '/' + query.category
        }
    )
    let categorylevels = res.data.categorylevels3;
    let banner = bannerRes.data.categoryLevel2Banner
    return {
        props: {
            metaData: metaData.data.success,
            categorylevels: categorylevels,
            animal: query.animal,
            category: query.category,
            banner: banner
        }
    }
}

export default index