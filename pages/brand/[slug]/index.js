import React, { useState, useEffect } from 'react'
import AnimalBanner from '../../../Components/AnimalPageComponents/AnimalBanner'
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/autoplay';
import ShopByPet from '../../../Components/HomeComponents/ShopByPet'
import { useRouter } from 'next/router';
import ProductRow from '../../../Components/HomeComponents/ProductRow'


const Brand = (props) => {
    console.log("🚀 ~ file: index.js ~ line 12 ~ Brand ~ props", props)

    const router = useRouter()

    const [food, setFood] = useState()
    const [supplements, setSupplements] = useState()
    const [supplies, setSupplies] = useState()
    const [treats, setTreats] = useState()
    const [medicine, setMedicine] = useState()
    const [banner, setBanner] = useState()

    useEffect(() => {
        if (router) {
            let endpoints = [
                `${process.env.NEXT_PUBLIC_API_URI}/brand/branddetails/get/data/${router.query.slug}/food`,
                `${process.env.NEXT_PUBLIC_API_URI}/brand/branddetails/get/data/${router.query.slug}/supplements`,
                `${process.env.NEXT_PUBLIC_API_URI}/brand/branddetails/get/data/${router.query.slug}/supplies`,
                `${process.env.NEXT_PUBLIC_API_URI}/brand/branddetails/get/data/${router.query.slug}/treats`,
                `${process.env.NEXT_PUBLIC_API_URI}/brand/branddetails/get/data/${router.query.slug}/medicine`
            ];
            axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
                .then(res => {
                    console.log("called")
                    res.forEach(arr => {
                        if (arr.data.brandBanner !== null) {
                            setBanner(arr.data.brandBanner)
                            return;
                        }
                    });
                    setFood(res[0].data.brandDetails);
                    setSupplements(res[1].data.brandDetails)
                    setSupplies(res[2].data.brandDetails)
                    setTreats(res[3].data.brandDetails)
                    setMedicine(res[4].data.brandDetails)
                })
                .catch(err => console.log(err))
        }
    }, [router])

    return (
        <div className='main-brand-page mt-4'>
            {/* Banner */}
            {
                router ?
                    <AnimalBanner hasImage={banner ? true : false} image={`/brand-banner/${banner}`} title={router.query.slug} /> :
                    <></>
            }

            <ShopByPet animals={props.categories.category_level1} />

            {/* FOOD */}
            {
                food && food.length > 0 ?
                    <ProductRow title={`Top ${router.query.slug} Foods`} products={food} /> :
                    <></>
            }

            {/* Supplements */}
            {
                supplements && supplements.length > 0 ?
                    <ProductRow title={`Top ${router.query.slug} Supplements`} products={supplements} /> :
                    <></>
            }

            {/* Supplies */}
            {
                supplies && supplies.length > 0 ?
                    <ProductRow title={`Top ${router.query.slug} Supplies`} products={supplies} /> :
                    <></>
            }

            {/* Treats */}
            {
                treats && treats.length > 0 ?
                    <ProductRow title={`Top ${router.query.slug} Treats`} products={treats} /> :
                    <></>
            }

            {/* Medicine */}
            {
                medicine && medicine.length > 0 ?
                    <ProductRow title={`Top ${router.query.slug} Medicine`} products={medicine} /> :
                    <></>
            }



        </div>
    )
}



export async function getServerSideProps({ query }) {

    let categories = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/getcategories`)

    return {
        props: {
            categories: categories.data,
        }
    }
}

export default Brand