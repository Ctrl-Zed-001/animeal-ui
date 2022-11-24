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
        // getBrandsfOrAnimals()
    }, [])

    const getProductsByCategory = async () => {
        let allFetchedProducts = []

        await axios.all(props.categories.map(
            category =>
                axios.post(`${process.env.NEXT_PUBLIC_API_URI}/products/getall`, { animal: props.animal, category: category.slug })
                    .then(res => allFetchedProducts.push({ category: category.name, products: res.data.data }))
        ))
        setCategoryWiseProducts(allFetchedProducts)
    }

    const getBrandsfOrAnimals = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URI}/brand/getbycategory`)
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
            <AnimalBanner hasImage={props.banner !== null ? true : false} image={`/category-banner/${props.banner}`} title={`The ${props.animal} Shop`} />

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
                        props.categories && props.categories.map((category, index) => {
                            return <SwiperSlide key={index}><CategoryBox placeholder='/img/category-placeholder.webp' animal={props.animal} category={category} /></SwiperSlide>
                        })

                    }
                </Swiper>

            </div>

            {/* CATEGORY */}
            {
                categoryWiseProducts && categoryWiseProducts.map((products, index) => {
                    if (products && products.length !== null) {
                        return <ProductRow showLink={true} animal={props.animal} key={index} title={products.category} products={products.products} />
                    }
                })

            }

            {/* BRANDS */}

            {
                brands && brands.length > 0 ?
                    <Brands title={`Popular Brands for ${props.animal}`} brands={brands} /> :
                    <></>
            }

        </div>
    )
}

export async function getServerSideProps({ query }) {

    let categories = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/category/getall`, { animal: query.animal })
    // let bannerRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/banners/getcategorybanner/${query.slug}`)
    // let metaData = await axios.post(
    //     `${process.env.NEXT_PUBLIC_API_URI}/metaurl/post/data`,
    //     {
    //         slug: "https://animeal.in/" + query.slug
    //     }
    // )



    return {
        props: {
            // metaData: metaData.data.success,
            // categorylevels: categoryLevels,
            // slug: query.slug,
            // banner: banner
            categories: categories.data.data,
            animal: query.animal
        }
    }
}

export default index