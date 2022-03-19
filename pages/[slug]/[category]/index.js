import React, { useState, useEffect } from 'react'
import SubCategoryBox from '../../../Components/AnimalPageComponents/SubCategoryBox'
import ProductRow from '../../../Components/HomeComponents/ProductRow'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import axios from 'axios'
import config from '../../../config.json'


const index = (props) => {

    const [categoryWiseProducts, setCategoryWiseProducts] = useState()

    useEffect(() => {
        getProductsByCategory()
    }, [props])

    const getProductsByCategory = async () => {
        let allFetchedProducts = []
        for (const category of props.categorylevels) {
            let fetchedProducts = await axios.post(`${config.api_uri}/category/level3products/categoryonetwothreewise`, {
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
                        props.categorylevels && props.categorylevels.map((subcategory, index) => {
                            return <SwiperSlide key={index}><SubCategoryBox subcategory={subcategory} animal={props.animal} category={props.category} /></SwiperSlide>
                        })
                    }
                </Swiper>
            </div>

            {/* CATEGORY */}
            {
                categoryWiseProducts && categoryWiseProducts.map((products, index) => {
                    console.log("🚀 ~ file: index.js ~ line 69 ~ categoryWiseProducts&&categoryWiseProducts.map ~ products", products)
                    if (products.products.categoryLevel2WiseProduct && products.products.categoryLevel2WiseProduct.length !== null) {
                        return <ProductRow title={products.category} products={products.products.categoryLevel2WiseProduct} />
                    }
                })

            }

        </div>
    )
}

export async function getServerSideProps({ query }) {

    let res = await axios.get(`${config.api_uri}/category/${query.slug}/${query.category}`)

    let categorylevels = res.data.categorylevels3;



    return {
        props: {
            categorylevels: categorylevels,
            animal: query.slug,
            category: query.category
        }
    }
}

export default index