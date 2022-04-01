import axios from 'axios';
import { useState, useEffect } from 'react'
import BannerSection from "../Components/HomeComponents/BannerSection";
import Brands from "../Components/HomeComponents/Brands";
import ProductRow from "../Components/HomeComponents/ProductRow";
import ShopByPet from "../Components/HomeComponents/ShopByPet";




export default function Home(props) {

  const [animals, setAnimals] = useState()
  const [topProducts, setTopProducts] = useState()
  const [customerFav, setCustomerFav] = useState()
  const [expertPick, setExpertPick] = useState()
  const [brands, setBrands] = useState()

  useEffect(() => {
    let endpoints = [
      `${process.env.NEXT_PUBLIC_API_URI}/getcategories`,
      `${process.env.NEXT_PUBLIC_API_URI}/topratedproducts/get/data`,
      `${process.env.NEXT_PUBLIC_API_URI}/customerfavorite/get/data`,
      `${process.env.NEXT_PUBLIC_API_URI}/pickedbyexperts/get/data`,
      `${process.env.NEXT_PUBLIC_API_URI}/brand/homepagebrand`
    ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(res => {
        setAnimals(res[0].data.category_level1);
        setTopProducts(res[1].data.topRatedProducts)
        setCustomerFav(res[2].data.customerFavoriteProducts)
        setExpertPick(res[3].data.pickedByExpertsProducts)
        setBrands(res[4].data.homePageBrand)
      })
      .catch(err => console.log(err))
  }, []);

  return (

    <div className="homepage">

      {/* BANNER SECTION */}
      <BannerSection />

      {/* SHOP BY PET */}
      <ShopByPet animals={animals} />

      {/* TOP PRODUCTS */}
      <ProductRow title="Top Products" products={topProducts} />

      {/* CUSTOMER FAVORITES */}
      <ProductRow title="Customer Favorites" products={expertPick} />

      {/* TOP SUPPLIES */}
      <ProductRow title="Top Supplies" products={customerFav} />

      {/* CTA */}

      {/* BRANDS */}
      <Brands brands={brands} title={"Popular Brands"} />

    </div>

  )
}
