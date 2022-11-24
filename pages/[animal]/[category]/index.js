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

    const [subcategoryWiseProducts, setSubcategoryWiseProducts] = useState()

    useEffect(() => {
        getProductsBySubCategory()
    }, [props])

    const getProductsBySubCategory = async () => {
        let allFetchedProducts = []

        await axios.all(props.subcategories.map(
            subcategory =>
                axios.post(`${process.env.NEXT_PUBLIC_API_URI}/products/getall`, { animal: props.animal, category: props.category, sub_category: subcategory.slug })
                    .then(res => {
                        if (res.data.data.length > 0) {
                            allFetchedProducts.push({ subcategory: subcategory.name, products: res.data.data })
                        }
                    })
        ))
        setSubcategoryWiseProducts(allFetchedProducts)
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
            <AnimalBanner hasImage={props.banner !== null ? true : false} image={`/category-banner/${props.banner}`} title={`${props.animal} ${props.subcategory}`} />

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
                        props.subcategories && props.subcategories.map((subcategory, index) => {
                            return <SwiperSlide key={index}><SubCategoryBox animal={props.animal} category={props.category} subcategory={subcategory} /></SwiperSlide>
                        })
                    }
                </Swiper>
            </div>

            {/* CATEGORY */}
            {
                subcategoryWiseProducts && subcategoryWiseProducts.map((products, index) => {
                    if (products && products.length !== null) {
                        return <ProductRow showLink={true} animal={props.animal} subcategory={props.subcategory} key={index} title={products.subcategory} products={products.products} />
                    }
                })

            }

        </div>
    )
}

export async function getServerSideProps({ query }) {
    let subcategories = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/subcategory/getall`, { animal: query.animal, category: query.category })
    // let bannerRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/banners/getcategorybannerlevel2/${query.animal}/${query.category}`)
    // let metaData = await axios.post(
    //     `${process.env.NEXT_PUBLIC_API_URI}/metaurl/post/data`,
    //     {
    //         slug: "https://animeal.in/" + query.animal + '/' + query.category
    //     }
    // )
    // let categorylevels = res.data.categorylevels3;
    // let banner = bannerRes.data.categoryLevel2Banner
    return {
        props: {
            // metaData: metaData.data.success,
            // categorylevels: categorylevels,
            // animal: query.animal,
            // category: query.category,
            // banner: banner
            subcategories: subcategories.data.data,
            animal: query.animal,
            category: query.category
        }
    }
}

export default index