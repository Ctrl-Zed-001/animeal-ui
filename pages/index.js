import axios from 'axios';
import { useState, useEffect } from 'react'
import BannerSection from "../Components/HomeComponents/BannerSection";
import Brands from "../Components/HomeComponents/Brands";
import ProductRow from "../Components/HomeComponents/ProductRow";
import ShopByPet from "../Components/HomeComponents/ShopByPet";
import Head from 'next/head'




export default function Home(props) {

  const [animals, setAnimals] = useState()
  const [topProducts, setTopProducts] = useState()
  const [customerFav, setCustomerFav] = useState()
  const [expertPick, setExpertPick] = useState()
  const [brands, setBrands] = useState()
  useEffect(() => {

    let endpoints = [
      `${process.env.NEXT_PUBLIC_API_URI}/animal/getall`,
      `${process.env.NEXT_PUBLIC_API_URI}/products/getrandom`,
      `${process.env.NEXT_PUBLIC_API_URI}/products/getrandom`,
      `${process.env.NEXT_PUBLIC_API_URI}/products/getrandom`,
      `${process.env.NEXT_PUBLIC_API_URI}/brand/getall`,
    ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(res => {
        setAnimals(res[0].data.data);
        setTopProducts(res[1].data.data)
        setCustomerFav(res[2].data.data)
        setExpertPick(res[3].data.data)
        setBrands(res[4].data.data)
      })
      .catch(err => console.log(err))
  }, []);

  return (

    <div className="homepage mt-16 lg:mt-0">

      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>

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

export async function getServerSideProps(context) {

  // let metaData = await axios.post(
  //   `${process.env.NEXT_PUBLIC_API_URI}/metaurl/post/data`,
  //   {
  //     slug: "https://animeal.in/"
  //   }
  // )
  return {
    props: {
      // title: metaData.data.success.meta_title,
      // description: metaData.data.success.meta_description
    }
  }
}
