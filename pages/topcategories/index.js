import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CategoryBox from '../../Components/AnimalPageComponents/CategoryBox'
import Brands from '../../Components/HomeComponents/Brands'

const TopCategories = () => {

    const [brands, setBrands] = useState()

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URI}/brands?populate[0]=icon`)
            .then(res => setBrands(res.data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="top-categories">

            <div className="container mb-10">
                <h1 className='text-xl font-medium mb-6'>Top categories</h1>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-10">
                    <CategoryBox placeholder='/img/icons/dog.webp' animal="dog" category={{ attributes: { name: "Dog Food", slug: "food" } }} />
                    <CategoryBox placeholder='/img/icons/cat.webp' animal="cat" category={{ attributes: { name: "Cat Food", slug: "food" } }} />
                    <CategoryBox placeholder='/img/icons/medicines.webp' animal="dog" category={{ attributes: { name: "Dog Medicine", slug: "medicine" } }} />
                    <CategoryBox placeholder='/img/icons/treats.webp' animal="dog" category={{ attributes: { name: "Dog Treats", slug: "treats" } }} />
                    <CategoryBox placeholder='/img/icons/toys.webp' animal="cat" category={{ attributes: { name: "Cat Supplies", slug: "supplies" } }} />
                    <CategoryBox placeholder='/img/icons/supplements.webp' animal="dog" category={{ attributes: { name: "Dog Supplements", slug: "supplements" } }} />
                    <CategoryBox placeholder='/img/icons/premium-food.webp' animal="cat" category={{ attributes: { name: "Cat Treats", slug: "treats" } }} />
                    <CategoryBox placeholder='/img/icons/cat-wet-food.webp' animal="dog" category={{ attributes: { name: "Dog Supplies", slug: "supplies" } }} />
                </div>

            </div>
            {
                brands && brands.length > 0 ?
                    <Brands brands={brands} title={"Popular Brands"} /> :
                    <></>
            }

        </div>
    )
}

export default TopCategories