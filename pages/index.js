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
      `${process.env.NEXT_PUBLIC_API_URI}/animals?populate=*`,
      `${process.env.NEXT_PUBLIC_API_URI}/products?pagination[page]=1&populate[0]=display_image&populate[1]=animal`,
      `${process.env.NEXT_PUBLIC_API_URI}/products?pagination[page]=2&populate[0]=display_image&populate[1]=animal`,
      `${process.env.NEXT_PUBLIC_API_URI}/products?pagination[page]=3&populate[0]=display_image&populate[1]=animal`,
      `${process.env.NEXT_PUBLIC_API_URI}/brands?populate[0]=icon`
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
      <BannerSection banners={props.banners} />

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

  let [metaData, banners] = await Promise.all([
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/meta-datas?filters[slug][$eq]=home`,
    ),
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/banners?populate=*`,
    )
  ])
  return {
    props: {
      title: metaData.data.data[0].attributes.title,
      description: metaData.data.data[0].attributes.description,
      banners: banners.data
    }
  }

}
