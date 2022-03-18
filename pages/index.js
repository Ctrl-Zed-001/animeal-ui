import axios from 'axios';
import { useState, useEffect } from 'react'
import BannerSection from "../Components/HomeComponents/BannerSection";
import Brands from "../Components/HomeComponents/Brands";
import ProductRow from "../Components/HomeComponents/ProductRow";
import ShopByPet from "../Components/HomeComponents/ShopByPet";
import config from '../config.json'



export default function Home(props) {

  const [animals, setAnimals] = useState()
  const [topProducts, setTopProducts] = useState()
  const [customerFav, setCustomerFav] = useState()
  const [expertPick, setExpertPick] = useState()

  useEffect(() => {
    let endpoints = [
      `${config.api_uri}/getcategories`,
      `${config.api_uri}/topratedproducts/get/data`,
      `${config.api_uri}/customerfavorite/get/data`,
      `${config.api_uri}/pickedbyexperts/get/data`
    ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(res => {
        setAnimals(res[0].data.category_level1);
        setTopProducts(res[1].data.topRatedProducts)
        setCustomerFav(res[2].data.customerFavoriteProducts)
        setExpertPick(res[3].data.pickedByExpertsProducts)
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

      {/* EXPERT PICK */}
      <ProductRow title="Picked By Our Experts" products={customerFav} />

      {/* CUSTOMER FAVORITES */}
      <ProductRow title="Customer Favorites" products={expertPick} />

      {/* CTA */}

      {/* BRANDS */}
      <Brands />

      {/* FOOTER */}

    </div>

  )
}
