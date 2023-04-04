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
        let fetchedProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/products?filters[brand][slug][$eq]=${props.brandDetails.attributes.slug}&populate[0]=animal&populate[1]=category`)

        let allCategories = [...new Set(fetchedProducts.data.data.map(item => item.attributes.category.data.attributes.name))];

        setCategories([...allCategories])
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
                    return <ProductRow title={`Top ${props.brandDetails.attributes.name} ${category}`} products={allProducts.filter(prod => prod.attributes.category.data.attributes.name == category)} />
                })
            }




        </div>
    )
}



export async function getServerSideProps(context) {

    let [animals, metaData, brandDetails] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URI}/animals?populate[0]=icon`),
        axios.get(
            `${process.env.NEXT_PUBLIC_API_URI}/meta-datas?filters[slug][$eq]=home`
        ),
        axios.get(`${process.env.NEXT_PUBLIC_API_URI}/brands?filter[slug][$eq]=${context.query.slug}&populate[0]=banner`)
    ])

    return {
        props: {
            animals: animals.data.data,
            title: metaData.data.data[0]?.attributes.title || '',
            description: metaData.data.data[0]?.attributes.description || '',
            brandDetails: brandDetails.data.data[0]
        }
    }
}


export default Brand