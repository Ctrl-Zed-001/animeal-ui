import React from 'react'
import Link from 'next/link'

const Brands = (props) => {
    return (
        <div className='container brand-section'>
            <h1 className='text-xl font-medium'>{props.title}</h1>
            <div className="grid grid-cols-2 lg:grid-cols-6 my-6 gap-4 lg:gap-10">

                {
                    props.brands ?
                        props.brands.map((brand, index) => {
                            return (<Link key={index} href={`/brand/${brand.slug}`}>
                                <div className="brand-box rounded-lg cursor-pointer">
                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URI}/${brand.icon.name}`} alt="" className='rounded-lg' />
                                </div>
                            </Link>)
                        }) :

                        <></>
                }

            </div>
        </div >
    )
}

export default Brands