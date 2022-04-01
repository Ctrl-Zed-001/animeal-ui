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

            <div className="container my-10">
                <h1 className='text-xl font-medium mb-6'>Top categories</h1>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-10">
                    <CategoryBox animal="dog" category={{ category_name: "food", category_name: "Dog Food" }} />
                    <CategoryBox animal="cat" category={{ category_name: "food", category_name: "Cat Food" }} />
                    <CategoryBox animal="dog" category={{ category_name: "food", category_name: "Dog Food" }} />
                    <CategoryBox animal="dog" category={{ category_name: "food", category_name: "Dog Food" }} />
                    <CategoryBox animal="dog" category={{ category_name: "food", category_name: "Dog Food" }} />
                    <CategoryBox animal="dog" category={{ category_name: "food", category_name: "Dog Food" }} />
                    <CategoryBox animal="dog" category={{ category_name: "food", category_name: "Dog Food" }} />
                    <CategoryBox animal="dog" category={{ category_name: "food", category_name: "Dog Food" }} />
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