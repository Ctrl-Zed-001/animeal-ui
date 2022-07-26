import React, { useEffect, useState } from 'react'
import AnimalBanner from '../../Components/AnimalPageComponents/AnimalBanner'
import CategoryBox from '../../Components/AnimalPageComponents/CategoryBox'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import axios from 'axios'
import ProductRow from '../../Components/HomeComponents/ProductRow'
import Brands from '../../Components/HomeComponents/Brands'
import Head from 'next/head';

import 'swiper/css';
import 'swiper/css/autoplay';

const index = (props) => {

    const [categoryWiseProducts, setCategoryWiseProducts] = useState()
    const [brands, setBrands] = useState([])

    useEffect(() => {
        getProductsByCategory()
        getBrandsfOrAnimals()
    }, [])

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

    const getBrandsfOrAnimals = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URI}/brand/categorybrand/get/${props.slug}`)
            .then(res => setBrands(res.data.categoryWiseBrand))
            .catch(err => console.log(err))
    }

    return (
        <div className='main-animal-page mt-16 lg:mt-0'>
            {
                props.metaData ?
                    <Head>
                        <title>{props.metaData.meta_title}</title>
                        <meta name="description" content={props.metaData.meta_description} />
                    </Head> :
                    <></>
            }

            {/* Banner */}
            <AnimalBanner hasImage={props.banner !== null ? true : false} image={`/category-banner/${props.banner}`} title={`The ${props.slug} Shop`} />

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
                            return <SwiperSlide key={index}><CategoryBox placeholder='/img/category-placeholder.webp' animal={props.slug} category={category} /></SwiperSlide>
                        })

                    }
                </Swiper>

            </div>

            {/* CATEGORY */}
            {
                categoryWiseProducts && categoryWiseProducts.map((products, index) => {
                    if (products.products.categoryLevel2WiseProduct && products.products.categoryLevel2WiseProduct.length !== null) {
                        return <ProductRow animal={props.slug} key={index} title={products.category} products={products.products.categoryLevel2WiseProduct} />
                    }
                })

            }

            {/* BRANDS */}

            {
                brands && brands.length > 0 ?
                    <Brands title={`Popular Brands for ${props.slug}`} brands={brands} /> :
                    <></>
            }

        </div>
    )
}

export async function getServerSideProps({ query }) {

    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/category/${query.slug}`)
    let bannerRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/banners/getcategorybanner/${query.slug}`)
    let metaData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/metaurl/post/data`,
        {
            slug: "https://animeal.in/" + query.slug
        }
    )
    let categoryLevels = res.data.categorylevels
    let banner = bannerRes.data.categoryBanner


    return {
        props: {
            metaData: metaData.data.success,
            categorylevels: categoryLevels,
            slug: query.slug,
            banner: banner
        }
    }
}

export default index