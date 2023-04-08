import React, { useEffect, useState } from 'react'
import AnimalBanner from '../../../Components/AnimalPageComponents/AnimalBanner'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import axios from 'axios'
import ProductRow from '../../../Components/HomeComponents/ProductRow'
import Brands from '../../../Components/HomeComponents/Brands'
import Head from 'next/head';

import 'swiper/css';
import 'swiper/css/autoplay';
import SubCategoryBox from '../../../Components/AnimalPageComponents/SubCategoryBox';

const index = (props) => {

    const [allProducts, setAllProducts] = useState()
    const [subcategories, setSubCategories] = useState()
    const [brands, setBrands] = useState()


    useEffect(() => {
        getProductsByAnimal()
    }, [])

    const getProductsByAnimal = async () => {
        let allFetchedProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/products?filters[animals][slug][$in]=${props.animal}&filters[categories][slug][$in]=${props.categoryData.slug}&populate[0]=subcategories.icon&populate[1]=animals&populate[2]=animals.banner&populate[3]=brand&populate[4]=brand.icon`)

        console.log("🚀 ~ file: index.js:28 ~ getProductsByAnimal ~ allFetchedProducts:", allFetchedProducts)
        let allSubCategories = []
        let allBrands = []


        // GET ALL UIQUE SUBCATEGORIES
        allFetchedProducts.data.data.map(item => {
            item.attributes.subcategories.data.map(subcat => {
                allSubCategories.push(subcat)
            })
        })
        const uniqueSubCategories = [...new Map(allSubCategories.map(item =>
            [item.attributes['slug'], item])).values()];

        // GET ALL UNIQUE BRANDS
        allFetchedProducts.data.data.map(item => {
            allBrands.push(item.attributes.brand.data)

        })
        const uniqueBrands = [...new Map(allBrands.map(item =>
            [item.attributes['slug'], item])).values()];


        setSubCategories([...uniqueSubCategories])
        setBrands([...uniqueBrands])
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
                <AnimalBanner hasImage={props.categoryData.banner ? true : false} image={props.categoryData.banner.data?.attributes?.url} title={`The ${props.categoryData.name} Shop`} />
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
                        subcategories && subcategories.map((subcategory, index) => {
                            return <SwiperSlide key={index}><SubCategoryBox placeholder='/img/category-placeholder.webp' animal={props.animal} category={props.categoryData.slug} subcategory={subcategory} /></SwiperSlide>
                        })

                    }
                </Swiper>

            </div>

            {/* CATEGORY WISE ROWS*/}
            {
                subcategories && allProducts && subcategories.map((subcategory, index) => {
                    return <ProductRow showLink={true} animal={props.animal} key={index} title={subcategory.attributes.name} products={allProducts.filter(prod => prod.attributes.subcategories.data.includes(subcategory))} />
                })
            }

            {/* BRANDS */}

            {
                brands && brands.length > 0 ?
                    <Brands title={`Popular Brands for ${props.categoryData.name}`} brands={brands} /> :
                    <></>
            }

        </div>
    )
}

export async function getServerSideProps({ query }) {

    let categoryData = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/categories?filters[slug][$eq]=${query.category}&populate[0]=banner`)

    return {
        props: {
            title: categoryData.data.data[0].attributes.meta_title || '',
            description: categoryData.data.data[0].attributes.meta_description || '',
            keywords: categoryData.data.data[0].attributes.meta_keywords || '',
            categoryData: categoryData.data.data[0].attributes,
            animal: query.animal
        }
    }
}

export default index