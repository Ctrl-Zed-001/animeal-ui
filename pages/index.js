import axios from 'axios';
import { useState, useEffect } from 'react'
import BannerSection from "../Components/HomeComponents/BannerSection";
import Brands from "../Components/HomeComponents/Brands";
import ProductRow from "../Components/HomeComponents/ProductRow";
import ShopByPet from "../Components/HomeComponents/ShopByPet";
import config from '../config.json'



export default function Home() {

  const [animals, setAnimals] = useState()

  useEffect(() => {
    axios.get(`${config.api_uri}/getcategories`)
      .then(res => {
        setAnimals(res.data.category_level1)
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
      <ProductRow title="Top Products" />

      {/* EXPERT PICK */}
      <ProductRow title="Picked By Our Experts" />

      {/* CUSTOMER FAVORITES */}
      <ProductRow title="Customer Favorites" />

      {/* CTA */}

      {/* BRANDS */}
      <Brands />

      {/* FOOTER */}

    </div>

  )
}
