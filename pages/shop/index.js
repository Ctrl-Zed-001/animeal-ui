import React, { useState, useEffect } from 'react'
import Filters from '../../Components/ShopPageComponents/Filters'
import ProductBox from '../../Components/ProductBox/ProductBox'
import { MdExpandMore } from "react-icons/md";
import { useRouter } from 'next/router'
import axios from 'axios';
import config from '../../config.json'
import { Pagination } from '@nextui-org/react';

const Shop = () => {

    const router = useRouter()
    const [sortBy, setSortBy] = useState('Popularity')
    const [srpData, setSrpData] = useState()
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (router) {
            if (router.query.slug) {
                console.log("in if")
                axios.post(`${config.api_uri}/dyanamicsearchproducts/get/data`, {
                    query: router.query.slug
                })
                    .then(res => setSrpData(res.data.productBySearch))
                    .catch(err => console.log(err))
            } else {
                axios.post(`${config.api_uri}/alllevelwiseproducts/post/data`, {
                    category1: router.query.animal,
                    category2: router.query.category,
                    category3: router.query.subcategory
                })
                    .then(res => {
                        console.log(res.data)
                        setSrpData(res.data.categoryAllLevelsWiseProduct)
                    })
                    .catch(err => console.log(err))
            }

        }
    }, [router])

    const paginate = (pageNumber) => {
        if (router.query.slug) {
            axios.post(`${config.api_uri}/dyanamicsearchproducts/get/data?page=${pageNumber}`, {
                query: router.query.slug
            })
                .then(res => setSrpData(res.data.productBySearch))
                .catch(err => console.log(err))
        } else {
            axios.post(`${config.api_uri}/alllevelwiseproducts/post/data?page=${pageNumber}`, {
                category1: router.query.animal,
                category2: router.query.category,
                category3: router.query.subcategory
            })
                .then(res => {
                    console.log(res.data)
                    setSrpData(res.data.categoryAllLevelsWiseProduct)
                })
                .catch(err => console.log(err))
        }

    }


    return (
        <div className='shop-page my-10'>


            <div className="container flex justify-between gap-10">
                {/* Filter */}
                <div className="hidden md:block fliter-container w-1/5">
                    <Filters />
                </div>

                {/* PRODUCT LIST CONTAINER */}
                <div className="right-section flex-1">

                    <div className="sorting hidden md:flex justify-between items-center relative">
                        <p className='text-sm font-medium'>showing {srpData && srpData.to} out of {srpData && srpData.total} products</p>
                        <div>
                            <i className='absolute -top-2 right-28 text-gray-500 text-xs'>sort by</i>

                            <select name="sorting" id="sorting" className='text-sm text-left rounded-lg px-2 py-3 bg-slate-100 text-gray-600 mx-2 flex justify-between items-center shadow'>
                                <option value="popularity">Popularity</option>
                                <option value="price-lowest">price : high to low</option>
                                <option value="price-highest">price : low to high</option>
                                <option value="rating">rating : high to low</option>
                                <option value="relevance">relevance</option>
                            </select>
                        </div>
                    </div>

                    <div className="product-list-container grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 m">
                        {
                            srpData && srpData.data && srpData.data.map((product, index) => {
                                return <ProductBox product={product} key={index} />
                            })
                        }


                    </div>

                    <div className="w-full mt-10 text-center">
                        {
                            srpData && srpData.total > 24 ?
                                <Pagination total={srpData.total / srpData.per_page} initialPage={1} page={page} color='warning' shadow onChange={(page) => paginate(page)} /> :
                                <></>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Shop