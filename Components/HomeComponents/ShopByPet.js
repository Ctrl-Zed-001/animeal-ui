import React from 'react'
import Link from 'next/link'


const ShopByPet = (props) => {

    return (
        <div className="shop-by-pet container my-8">
            <h1 className='font-medium text-xl'>Shop By Pet</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-10 gap-4 lg:gap-4">

                {
                    props.animals?.map((animal, id) => {
                        return (
                            <Link href={`/${animal.category_name.toLowerCase()}`} key={id}>
                                <div className="petbox drop-shadow hover:drop-shadow-none relative bg-white p-4 rounded-lg pb-20 transition duration-150 ease-in cursor-pointer">
                                    <h1 className='w-2/6'>{animal.category_name}</h1>
                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URI + '/category-icon/' + animal.category_icon} alt="" className='absolute -bottom-0 right-0 h-32 lg:h-32 lg:-bottom-4' />
                                </div>
                            </Link>
                        )
                    })


                }


            </div>
        </div>
    )
}

export default ShopByPet