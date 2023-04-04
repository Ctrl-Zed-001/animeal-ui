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

    const [allProducts, setAllProducts] = useState()
    console.log("🚀 ~ file: index.js:17 ~ index ~ allProducts:", allProducts)
    const [subcategories, setSubCategories] = useState()

    useEffect(() => {
        getProductsByCategory()
    }, [])

    const getProductsByCategory = async () => {
        let allFetchedProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/products?filters[animal][slug]=${props.animal}&filters[category][slug]=${props.category}&populate[0]=subcategory.icon&populate[1]=category.banner&populate[2]=animal`)
        let allCategories = [...new Set(allFetchedProducts.data.data.map(item => item.attributes.subcategory.data.attributes))];
        setSubCategories([...allCategories])
        setAllProducts(allFetchedProducts.data.data)
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
            {
                allProducts &&
                <AnimalBanner hasImage={allProducts[0].attributes.category.data.attributes.banner.data ? true : false} image={allProducts[0].attributes.category.data.attributes.banner.data?.attributes?.url} title={`The ${props.category} Shop`} />
            }

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
                        subcategories && subcategories.map((subcategory, index) => {
                            return <SwiperSlide key={index}><SubCategoryBox animal={props.animal} category={props.category} subcategory={subcategory} /></SwiperSlide>
                        })
                    }
                </Swiper>
            </div>

            {/* SUBCATEGORY WISE ROWS */}
            {
                subcategories && allProducts && subcategories.map((subcategory, index) => {
                    return <ProductRow showLink={true} animal={props.animal} key={index} title={subcategory.name} products={allProducts.filter(prod => prod.attributes.subcategory.data?.attributes.name === subcategory.name)} />
                })
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
            animal: query.animal,
            category: query.category
        }
    }
}

export default index