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

    const [allProducts, setAllProducts] = useState()
    console.log("🚀 ~ file: index.js:17 ~ index ~ allProducts:", allProducts)
    const [categories, setCategories] = useState()
    const [brands, setBrands] = useState()

    useEffect(() => {
        getProductsByAnimal()
        getBrandsfOrAnimals()
    }, [])

    const getProductsByAnimal = async () => {
        let allFetchedProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/products?filters[animal][slug]=${props.animal}&populate[0]=category.icon&populate[1]=animal&populate[2]=animal.banner`)
        let allCategories = [...new Set(allFetchedProducts.data.data.map(item => item.attributes.category.data.attributes))];
        setCategories([...allCategories])
        setAllProducts(allFetchedProducts.data.data)
    }

    const getBrandsfOrAnimals = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URI}/brands?filter[animal][slug]=${props.animal}&populate[0]=icon`)
            .then(res => setBrands(res.data.data))
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
            {
                allProducts &&
                <AnimalBanner hasImage={allProducts[0].attributes.animal.data.attributes.banner.data ? true : false} image={allProducts[0].attributes.animal.data.attributes.banner.data?.attributes?.url} title={`The ${props.animal} Shop`} />
            }

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
                            return <SwiperSlide key={index}><CategoryBox placeholder='/img/category-placeholder.webp' animal={props.animal} category={category} /></SwiperSlide>
                        })

                    }
                </Swiper>

            </div>

            {/* CATEGORY WISE ROWS*/}
            {
                categories && allProducts && categories.map((category, index) => {
                    return <ProductRow showLink={true} animal={props.animal} key={index} title={category.name} products={allProducts.filter(prod => prod.attributes.category.data?.attributes.name === category.name)} />
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

    let metaData = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/meta-datas?filters[slug][$eq]=home`)
    return {
        props: {
            title: metaData.data.data[0]?.attributes.title || '',
            description: metaData.data.data[0]?.attributes.description || '',
            animal: query.animal
        }
    }
}

export default index