import React, { useState, useEffect } from 'react'
import Filters from '../../Components/ShopPageComponents/Filters'
import ProductBox from '../../Components/ProductBox/ProductBox'
import { MdExpandMore } from "react-icons/md";
import { useRouter } from 'next/router'
import axios from 'axios';
import config from '../../config.json'

const Shop = () => {

    const router = useRouter()
    const [sortBy, setSortBy] = useState('Popularity')
    const [products, setProducts] = useState([])

    useEffect(() => {
        // if (router) {
        //     axios.post(`${config.api_uri}/category/level3products/categoryonetwowise`, {
        //         parameters: []
        //     })
        // }
    }, [router])

    return (
        <div className='shop-page my-10'>


            <div className="container flex justify-between gap-10">
                {/* Filter */}
                <div className="hidden md-block fliter-container w-1/5">
                    <Filters />
                </div>

                {/* PRODUCT LIST CONTAINER */}
                <div className="right-section flex-1">

                    <div className="sorting hidden md:flex justify-end relative">
                        <i className='absolute -top-2 right-32 text-gray-600 text-xs'>sort by</i>

                        <select name="sorting" id="sorting" className='text-sm text-left rounded-lg px-2 py-3 bg-slate-100 text-gray-600 mx-2 flex justify-between items-center shadow w-1/5'>
                            <option value="popularity">Popularity</option>
                            <option value="price-lowest">price : high to low</option>
                            <option value="price-highest">price : low to high</option>
                            <option value="rating">rating : high to low</option>
                            <option value="relevance">relevance</option>
                        </select>

                    </div>

                    <div className="product-list-container grid grid-cols-2 md:grid-cols-4 gap-8 mt-6">

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Shop