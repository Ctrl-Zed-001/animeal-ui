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
                            <Link href={`/${animal.slug.toLowerCase()}`} key={id}>
                                <div className="petbox drop-shadow hover:drop-shadow-none relative bg-white p-4 rounded-lg transition duration-150 ease-in cursor-pointer flex flex-col-reverse sm:flex-row items-center">
                                    <h1 className='w-2/6 mt-2 text-center z-10'>{animal.name}</h1>
                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URI + '/category-icon/' + animal.icon?.name} alt="" className='h-24 lg:h-28 xl:h-28' />
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