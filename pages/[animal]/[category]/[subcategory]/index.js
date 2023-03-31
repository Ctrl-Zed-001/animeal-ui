import React, { useState, useEffect } from 'react'
import Filters from '../../../../Components/ShopPageComponents/Filters'
import ProductBox from '../../../../Components/ProductBox/ProductBox'
import { FcFilledFilter } from "react-icons/fc";
import { useRouter } from 'next/router'
import axios from 'axios';
import { Pagination, Loading } from '@nextui-org/react';

const Shop = (props) => {

    const router = useRouter()
    const [srpData, setSrpData] = useState()
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('relevent')
    const [filterData, setFilterData] = useState([])
    const [isLoading, setIsLoading] = useState()
    const [apppliedFilters, setAppliedFilters] = useState({})
    const [showFilter, setShowFilter] = useState(false)

    useEffect(() => {

        setIsLoading(true)
        getProducts()
            .then(res => {
                setIsLoading(false)
                setSrpData(res.data)
                getFilters()
            })
            .catch(err => console.log(err))

    }, [])


    const getProducts = async (extraFilters) => {

        return await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/products?filters[$and][0][animal][slug][$eq]=${props.animal}&filters[$and][1][category][slug][$eq]=${props.category}&filters[$and][2][subcategory][slug][$eq]=${props.subcategory}${extraFilters ? extraFilters : ''}&populate[0]=animal`)
    }

    const getFilters = async () => {
        let [animals, categories, subcategories, brands] = await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URI}/animals`),
            axios.get(`${process.env.NEXT_PUBLIC_API_URI}/categories`),
            axios.get(`${process.env.NEXT_PUBLIC_API_URI}/subcategories`),
            axios.get(`${process.env.NEXT_PUBLIC_API_URI}/brands`)
        ])

        setFilterData({
            animals: animals.data.data,
            categories: categories.data.data,
            subcategories: subcategories.data.data,
            brands: brands.data.data
        })

        setAppliedFilters({
            animal: props.animal ? [props.animal] : [],
            category: props.category ? [props.category] : [],
            subcategory: props.subcategory ? [props.subcategory] : [],
            brand: [],
            rating: [],
        })

    }

    const paginate = async (pageNumber) => {
        setIsLoading(true)
        setPage(pageNumber)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

        let query = generateQueryString(apppliedFilters)

        let productsRes = await getProducts(query + `&paginate[page]=${pageNumber}`)
        setIsLoading(false)
        setSrpData(productsRes.data)


    }

    const sortResults = async (e) => {
        setIsLoading(true)
        setSort(e.target.value)

        let query = generateQueryString(apppliedFilters)

        let productsRes = await getProducts(query + `&sort[0]=${e.target.value}`)
        setIsLoading(false)
        setSrpData(productsRes.data)

    }

    const applyFilters = async (filters) => {

        let selectedFilters = { ...apppliedFilters }
        if (filters.checked) {
            selectedFilters[filters.type] = selectedFilters[filters.type] ? [...selectedFilters[filters.type], filters.value] : [filters.value]
        } else {
            let modifiedFilters = selectedFilters[filters.type].filter(f => f !== filters.value)
            selectedFilters[filters.type] = modifiedFilters
        }

        let query = generateQueryString({ ...selectedFilters })

        let productsRes = await getProducts(query)
        setIsLoading(false)
        setSrpData(productsRes.data)

        setAppliedFilters({ ...selectedFilters })
    }

    const clearAll = async () => {
        setIsLoading(true)
        let productsData = await getProducts()
        setIsLoading(false)
        setSrpData(productsData.data)
        setAppliedFilters({
            animal: [],
            category: [],
            subcategory: [],
            brand: [],
            rating: [],
        })

    }

    const generateQueryString = (appliedFilters) => {
        let currentIndex = 4;
        let qs = []
        appliedFilters.animal && appliedFilters.animal.map((ani, index) => {
            qs.push(`&filters[$and][${currentIndex}][animal][slug][$eq]=${ani}`)
            currentIndex++
        })
        appliedFilters.category && appliedFilters.category.map((cat, index) => {
            qs.push(`&filters[$and][${currentIndex}][category][slug][$eq]=${cat}`)
            currentIndex++
        })
        appliedFilters.subcategory && appliedFilters.subcategory.map((subcat, index) => {
            qs.push(`&filters[$and][${currentIndex}][subcategory][slug][$eq]=${subcat}`)
            currentIndex++
        })
        appliedFilters.brand && appliedFilters.brand.map((brand, index) => {
            qs.push(`&filters[$and][${currentIndex}][brand][slug][$eq]=${brand}`)
            currentIndex++
        })

        return qs.join()
    }

    return (
        <div className='shop-page lg:my-10 my-16'>


            <div className="container flex justify-between gap-10">
                {/* Filter */}
                <div className={`${showFilter ? 'visible-mobile-filter' : 'hidden-mobile-filter'} md:block fliter-container w-full xl:w-1/5 fixed overflow-scroll xl:overflow-hidden top-0 z-50 xl:z-0 lg:relative`}>
                    <Filters filterData={filterData} applyFilters={applyFilters} sort={sort} sortResults={sortResults} hideFilter={() => setShowFilter(false)} clearAll={clearAll} apppliedFilters={apppliedFilters} />
                </div>

                {/* PRODUCT LIST CONTAINER */}
                <div className="right-section flex-1">

                    <h2 className="text-lg font-semibold text-slate-400">Top results for   <span className="capitalize text-slate-700">{props.animal}</span> , <span className="capitalize text-slate-700">{props.subcategory}</span></h2>

                    <div className="sorting hidden md:flex justify-between items-center relative mt-4">
                        <p className='text-sm font-medium'>showing {srpData && srpData.meta.pagination.pageCount} out of {srpData && srpData.meta.pagination.total} products</p>
                        <div>
                            <span className='absolute -top-2 right-28 text-gray-500 text-xs'>sort by</span>

                            <select value={sort} name="sorting" id="sorting" onChange={(e) => sortResults(e)} className='text-sm text-left rounded-lg px-2 py-3 bg-slate-100 text-gray-600 mx-2 flex justify-between items-center shadow'>
                                <option value="rating%3Aasc">Popularity</option>
                                <option value="selling_price%3Adesc">price : high to low</option>
                                <option value="selling_price%3Aasc">price : low to high</option>
                                <option value="rating%3Adesc">rating : high to low</option>
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

export default Shop

export async function getServerSideProps(context) {

    return {
        props: {
            animal: context.query.animal,
            category: context.query.category,
            subcategory: context.query.subcategory
        }
    }

}