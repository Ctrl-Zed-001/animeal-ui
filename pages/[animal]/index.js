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
    console.log("🚀 ~ file: index.js:15 ~ index ~ props:", props)

    const [allProducts, setAllProducts] = useState()
    const [categories, setCategories] = useState()

    useEffect(() => {
        getProductsByAnimal()
    }, [])

    const getProductsByAnimal = async () => {
        let allFetchedProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/products?filters[animals][slug][$in]=${props.animalData.slug}&populate[0]=categories.icon&populate[1]=animals&populate[2]=animals.banner`)

        let allCategories = []

        allFetchedProducts.data.data.map(item => {
            item.attributes.categories.data.map(cat => {
                allCategories.push(cat)
            })
        })


        const uniqueCategories = [...new Map(allCategories.map(item =>
            [item.attributes['slug'], item])).values()];

        setCategories([...uniqueCategories])
        setAllProducts(allFetchedProducts.data.data)
    }



    return (
        <div className='main-animal-page mt-16 lg:mt-0'>

            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
                <meta name="keywords" content={props.keywords} />
            </Head>


            {/* Banner */}
            {
                allProducts &&
                <AnimalBanner hasImage={props.animalData.banner ? true : false} image={props.animalData.banner.data?.attributes?.url} title={`The ${props.animalData.name} Shop`} />
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
                            return <SwiperSlide key={index}><CategoryBox placeholder='/img/category-placeholder.webp' animal={props.animalData.slug} category={category} /></SwiperSlide>
                        })

                    }
                </Swiper>

            </div>

            {/* CATEGORY WISE ROWS*/}
            {
                categories && allProducts && categories.map((category, index) => {
                    console.log("🚀 ~ file: index.js:92 ~ categories&&allProducts&&categories.map ~ category:", category)
                    return <ProductRow showLink={true} animal={props.animal} key={index} title={category.attributes.name} products={allProducts.filter(prod => prod.attributes.categories.data.includes(category))} />
                })
            }

            {/* BRANDS */}

            {
                props.animalData.brands && props.animalData.brands.data.length > 0 ?
                    <Brands title={`Popular Brands for ${props.animalData.name}`} brands={props.animalData.brands.data} /> :
                    <></>
            }

        </div>
    )
}

export async function getServerSideProps({ query }) {

    let animalData = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/animals?filters[slug][$eq]=${query.animal}&populate[0]=banner&populate[1]=brands&populate[2]=brands.icon`)
    return {

        props: {
            title: animalData.data.data[0].attributes.meta_title || '',
            description: animalData.data.data[0].attributes.meta_description || '',
            keywords: animalData.data.data[0].attributes.meta_keywords || '',
            animalData: animalData.data.data[0].attributes
        }
    }
}

export default index