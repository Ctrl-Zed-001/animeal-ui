import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CategoryBox from '../../Components/AnimalPageComponents/CategoryBox'
import Brands from '../../Components/HomeComponents/Brands'

const TopCategories = () => {

    const [brands, setBrands] = useState()

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URI}/brand/homepagebrand`)
            .then(res => setBrands(res.data.homePageBrand))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="top-categories">

            <div className="container mb-10">
                <h1 className='text-xl font-medium mb-6'>Top categories</h1>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-10">
                    <CategoryBox placeholder='/img/icons/dog.png' animal="dog" category={{ category_name: "Dog Food", category_url: "food" }} />
                    <CategoryBox placeholder='/img/icons/cat.png' animal="cat" category={{ category_name: "Cat Food", category_url: "food" }} />
                    <CategoryBox placeholder='/img/icons/medicines.png' animal="dog" category={{ category_name: "Dog Medicine", category_url: "medicine" }} />
                    <CategoryBox placeholder='/img/icons/treats.png' animal="dog" category={{ category_name: "Dog Treats", category_url: "treats" }} />
                    <CategoryBox placeholder='/img/icons/toys.png' animal="cat" category={{ category_name: "Cat Supplies", category_url: "supplies" }} />
                    <CategoryBox placeholder='/img/icons/supplements.png' animal="dog" category={{ category_name: "Dog Supplements", category_url: "supplements" }} />
                    <CategoryBox placeholder='/img/icons/premium-food.png' animal="cat" category={{ category_name: "Cat Treats", category_url: "treats" }} />
                    <CategoryBox placeholder='/img/icons/cat-wet-food.png' animal="dog" category={{ category_name: "Dog Supplies", category_url: "supplies" }} />
                </div>

            </div>
            {
                brands ?
                    <Brands brands={brands} title={"Popular Brands"} /> :
                    <></>
            }

        </div>
    )
}

export default TopCategories