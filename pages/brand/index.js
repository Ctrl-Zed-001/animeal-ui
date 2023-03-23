import React from 'react'
import axios from 'axios'
import Link from 'next/link'

const index = (props) => {

    return (
        <div className="container">
            <h1 className="text-2xl font-semibold my-8">
                All Brands
            </h1>
            <div className="grid grid-cols-4 gap-10">
                {
                    props.brands.data.map((brand, index) => {
                        return (<Link key={index} href={`/brand/${brand.attributes.slug}`}>
                            <div key={index} className="brand-box rounded-lg cursor-pointer">
                                <img src={`${brand.attributes.icon.data.attributes.url}`} alt="" className='rounded-lg' />
                            </div>
                        </Link>)
                    })
                }
            </div>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    let brandRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/brands?populate[0]=icon`)
    let brands = brandRes.data


    return {
        props: {
            brands: brands
        }
    }
}

export default index