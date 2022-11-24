import React, { useState, useEffect } from 'react'
import Filters from '../../../../Components/ShopPageComponents/Filters'
import ProductBox from '../../../../Components/ProductBox/ProductBox'
import { FcFilledFilter } from "react-icons/fc";
import { useRouter } from 'next/router'
import axios from 'axios';
import { Pagination, Loading } from '@nextui-org/react';
import Capitalize from '../../../../Helpers/Capitalize';
import nameCraetor from '../../../../Helpers/SlugToName';
import Head from 'next/head';

const index = (props) => {
    const router = useRouter()

    const [srpData, setSrpData] = useState()
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('relevent')
    const [filterData, setFilterData] = useState([])
    const [isLoading, setIsLoading] = useState()
    const [apppliedFilters, setAppliedFilters] = useState({})
    const [showFilter, setShowFilter] = useState(false)

    useEffect(() => {
        if (router.query.slug) {
            setIsLoading(true)
            axios.post(`${process.env.NEXT_PUBLIC_API_URI}/dyanamicsearchproducts/get/data`, {
                query: '',
                animal: router.query.slug ? [router.query.slug] : [],
                category: router.query.category ? [router.query.category] : [],
                subcategory: router.query.subcategory ? [router.query.subcategory] : [],
                brand: [],
                rating: [],
                sort: sort
            })
                .then(res => {
                    setIsLoading(false)
                    setSrpData(res.data.productBySearch)
                    setAppliedFilters({
                        animal: router.query.slug ? [router.query.slug] : [],
                        category: router.query.category ? [router.query.category] : [],
                        subcategory: router.query.subcategory ? [router.query.subcategory] : [],
                        brand: [],
                        rating: [],
                    })

                    axios.get(`${process.env.NEXT_PUBLIC_API_URI}/filters/post/data`)
                        .then(res => setFilterData(res.data))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }, [router.query])

    const paginate = (pageNumber) => {
        setIsLoading(true)
        setPage(pageNumber)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

        axios.post(`${process.env.NEXT_PUBLIC_API_URI}/dyanamicsearchproducts/get/data?page=${pageNumber}`, {
            query: '',
            animal: apppliedFilters.animal ? apppliedFilters.animal : [router.query.slug],
            category: apppliedFilters.category ? apppliedFilters.category : [router.query.category],
            subcategory: apppliedFilters.subcategory ? apppliedFilters.subcategory : [router.query.subcategory],
            brand: apppliedFilters.brand ? apppliedFilters.brand : [],
            rating: apppliedFilters.rating ? apppliedFilters.rating : [],
            sort: sort
        })
            .then(res => {
                setIsLoading(false)
                setSrpData(res.data.productBySearch)
            })
            .catch(err => console.log(err))


    }

    const sortResults = (e) => {
        setIsLoading(true)
        setSort(e.target.value)

        axios.post(`${process.env.NEXT_PUBLIC_API_URI}/dyanamicsearchproducts/get/data?page=${page}`, {
            query: '',
            animal: apppliedFilters.animal,
            category: apppliedFilters.category,
            subcategory: apppliedFilters.subcategory,
            brand: apppliedFilters.brand,
            rating: apppliedFilters.rating,
            sort: e.target.value
        })
            .then(res => {
                setIsLoading(false)
                setSrpData(res.data.productBySearch)
                setPage(1)
            })
            .catch(err => console.log(err))
    }

    const applyFilters = (filters) => {
        let selectedFilters = JSON.parse(JSON.stringify(apppliedFilters))
        if (filters.checked) {
            if (selectedFilters[filters.type]) {
                selectedFilters[filters.type] = [...selectedFilters[filters.type], filters.value]
            } else {
                selectedFilters[filters.type] = [filters.value]
            }
        } else {
            let modifiedFilters = selectedFilters[filters.type].filter(f => f !== filters.value)
            selectedFilters[filters.type] = modifiedFilters
        }

        axios.post(`${process.env.NEXT_PUBLIC_API_URI}/dyanamicsearchproducts/get/data`, {
            query: '',
            animal: selectedFilters.animal,
            category: selectedFilters.category,
            subcategory: selectedFilters.subcategory,
            brand: selectedFilters.brand,
            rating: selectedFilters.rating,
            sort: sort
        })
            .then(res => {
                setIsLoading(false)
                setSrpData(res.data.productBySearch)
                setPage(1)
            })
            .catch(err => console.log(err))

        setAppliedFilters(JSON.parse(JSON.stringify(selectedFilters)))
    }

    const clearAll = () => {
        console.log("clear called");
        setIsLoading(true)
        axios.post(`${process.env.NEXT_PUBLIC_API_URI}/dyanamicsearchproducts/get/data`, {
            query: '',
            animal: [],
            category: [],
            subcategory: [],
            brand: [],
            rating: [],
            sort: sort
        })
            .then(res => {
                setIsLoading(false)
                setSrpData(res.data.productBySearch)
                setAppliedFilters({
                    animal: [],
                    category: [],
                    subcategory: [],
                    brand: [],
                    rating: [],
                })
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='shop-page lg:my-10 my-16'>
            {
                props.metaData ?
                    <Head>
                        <title>{props.metaData.meta_title}</title>
                        <meta name="description" content={props.metaData.meta_description} />
                    </Head> :
                    <></>
            }

            <div className="container flex justify-between gap-10">
                {/* Filter */}
                <div className={`${showFilter ? 'visible-mobile-filter' : 'hidden-mobile-filter'} md:block fliter-container w-full xl:w-1/5 fixed overflow-scroll xl:overflow-hidden top-0 z-50 xl:z-0 lg:relative`}>
                    <Filters filterData={filterData} applyFilters={applyFilters} sort={sort} sortResults={sortResults} hideFilter={() => setShowFilter(false)} clearAll={clearAll} apppliedFilters={apppliedFilters} />
                </div>

                {/* PRODUCT LIST CONTAINER */}
                <div className="right-section flex-1">
                    <h1 className="text-lg font-semibold text-slate-400">
                        Search results for :
                        <span className="text-slate-700 capitalize">
                            {nameCraetor(router.query.slug ? router.query.slug : '')}, {nameCraetor(router.query.category ? router.query.category : '')}, {nameCraetor(router.query.subcategory ? router.query.subcategory : '')}</span>
                    </h1>

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

                    {
                        isLoading ?
                            <Loading className='flex items-center justify-center mt-60' color="warning" textColor="warning"></Loading> :
                            srpData ?
                                <div>
                                    <FcFilledFilter onClick={() => { setShowFilter(true) }} className='block xl:hidden text-4xl mt-2 bg-white rounded-lg p-2 shadow' />
                                    <div className="product-list-container grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 m">
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
                                </div> :
                                <p>No result found 😥</p>
                    }


                </div>
            </div>

        </div>
    )
}

export async function getServerSideProps({ query }) {
    let metaData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/metaurl/post/data`,
        {
            slug: "https://animeal.in/" + query.slug + '/' + query.category + '/' + query.subcategory
        }
    )
    return {
        props: {
            metaData: metaData.data.success,
        }
    }
}


export default index