import React, { useState, useEffect } from 'react'
import AnimalBanner from '../../../Components/AnimalPageComponents/AnimalBanner'
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/autoplay';
import ShopByPet from '../../../Components/HomeComponents/ShopByPet'
import { useRouter } from 'next/router';
import ProductRow from '../../../Components/HomeComponents/ProductRow'
import Head from 'next/head';
import Capitalize from '../../../Helpers/Capitalize';


const Brand = (props) => {

    const router = useRouter()
    const [allProducts, setAllProducts] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(() => {
        getProductsByBrand()
    }, [])

    const getProductsByBrand = async () => {
        let fetchedProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/products?filters[brand][slug][$eq]=${props.brandDetails.attributes.slug}&populate[0]=animals&populate[1]=categories`)

        let allCategories = []

        fetchedProducts.data.data.map(item => {
            item.attributes.categories.data.map(cat => {
                allCategories.push(cat)
            })
        })


        const uniqueCategories = [...new Map(allCategories.map(item =>
            [item.attributes['slug'], item])).values()];

        setCategories([...uniqueCategories])
        setAllProducts([...fetchedProducts.data.data])
    }


    return (
        <div className='main-brand-page mt-16 lg:mt-0'>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            {/* Banner */}

            <AnimalBanner hasImage={props.brandDetails.attributes?.banner?.data ? true : false} image={`${props.brandDetails.attributes?.banner?.data?.attributes.url}`} title={props.brandDetails.attributes.name} /> :


            <ShopByPet animals={props.animals} />
            {
                categories && categories.map((category, index) => {
                    return <ProductRow title={`Top ${props.brandDetails.attributes.name} ${category.attributes.name}`} products={allProducts.filter(prod => prod.attributes.categories.data.includes(category))} />
                })
            }




        </div>
    )
}



export async function getServerSideProps(context) {

    let [animals, brandDetails] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URI}/animals?populate[0]=icon`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URI}/brands?filter[slug][$eq]=${context.query.slug}&populate[0]=banner`)
    ])

    return {
        props: {
            animals: animals.data.data,
            title: brandDetails.data.data[0]?.attributes.meta_title || '',
            description: brandDetails.data.data[0]?.attributes.meta_description || '',
            brandDetails: brandDetails.data.data[0]
        }
    }
}


export default Brand