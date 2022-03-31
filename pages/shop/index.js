import React, { useState, useEffect } from 'react'
import Filters from '../../Components/ShopPageComponents/Filters'
import ProductBox from '../../Components/ProductBox/ProductBox'
import { MdExpandMore } from "react-icons/md";
import { useRouter } from 'next/router'
import axios from 'axios';
import { Pagination } from '@nextui-org/react';

const Shop = () => {

    const router = useRouter()
    const [srpData, setSrpData] = useState()
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('relevent')

    useEffect(() => {
        if (router) {
            if (router.query.animal) {
                axios.post(`${process.env.NEXT_PUBLIC_API_URI}/alllevelwiseproducts/post/data`, {
                    category1: router.query.animal,
                    category2: router.query.category,
                    category3: router.query.subcategory,
                    sort: sort
                })
                    .then(res => {
                        setSrpData(res.data.categoryAllLevelsWiseProduct)
                    })
                    .catch(err => console.log(err))
            } else if (router.query.slug) {
                axios.post(`${process.env.NEXT_PUBLIC_API_URI}/dyanamicsearchproducts/get/data`, {
                    query: router.query.slug,
                    sort: sort
                })
                    .then(res => setSrpData(res.data.productBySearch))
                    .catch(err => console.log(err))
            }

        }
    }, [router])

    const paginate = (pageNumber) => {
        setPage(pageNumber)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        if (router.query.animal) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URI}/alllevelwiseproducts/post/data?page=${pageNumber}`, {
                category1: router.query.animal,
                category2: router.query.category,
                category3: router.query.subcategory,
                sort: sort
            })
                .then(res => {
                    setSrpData(res.data.categoryAllLevelsWiseProduct)
                })
                .catch(err => console.log(err))
        } else if (router.query.slug) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URI}/dyanamicsearchproducts/get/data?page=${pageNumber}`, {
                query: router.query.slug,
                sort: sort
            })
                .then(res => setSrpData(res.data.productBySearch))
                .catch(err => console.log(err))
        }

    }

    const sortResults = (e) => {

        if (router.query.animal) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URI}/alllevelwiseproducts/post/data?page=${page}`, {
                category1: router.query.animal,
                category2: router.query.category,
                category3: router.query.subcategory,
                sort: e.target.value
            })
                .then(res => {
                    setSrpData(res.data.categoryAllLevelsWiseProduct)
                })
                .catch(err => console.log(err))
        } else if (router.query.slug) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URI}/dyanamicsearchproducts/get/data?page=${page}`, {
                query: router.query.slug,
                sort: e.target.value
            })
                .then(res => setSrpData(res.data.productBySearch))
                .catch(err => console.log(err))
        }
    }


    return (
        <div className='shop-page my-10'>


            <div className="container flex justify-between gap-10">
                {/* Filter */}
                {/* <div className="hidden md:block fliter-container w-1/5">
                    <Filters />
                </div> */}

                {/* PRODUCT LIST CONTAINER */}
                <div className="right-section flex-1">
                    {
                        router.query.slug ?
                            <h1 className="text-lg font-semibold text-slate-400">Search results for : <span className="text-slate-700 capitalize">{router.query.slug}</span> </h1> :
                            <h1 className="text-lg font-semibold text-slate-400">Top results for   <span className="capitalize text-slate-700">{router.query.animal}</span> , <span className="capitalize text-slate-700">{router.query.subcategory}</span></h1>
                    }
                    <div className="sorting hidden md:flex justify-between items-center relative mt-4">
                        <p className='text-sm font-medium'>showing {srpData && srpData.to} out of {srpData && srpData.total} products</p>
                        <div>
                            <span className='absolute -top-2 right-28 text-gray-500 text-xs'>sort by</span>

                            <select value={sort} name="sorting" id="sorting" onChange={(e) => sortResults(e)} className='text-sm text-left rounded-lg px-2 py-3 bg-slate-100 text-gray-600 mx-2 flex justify-between items-center shadow'>
                                <option value="relevent">Popularity</option>
                                <option value="hightolow">price : high to low</option>
                                <option value="lowtohigh">price : low to high</option>
                                <option value="ratinghigh">rating : high to low</option>
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
                                <Pagination total={Math.ceil(srpData.total / srpData.per_page)} initialPage={1} page={page} color='warning' shadow onChange={(page) => paginate(page)} /> :
                                <></>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Shop