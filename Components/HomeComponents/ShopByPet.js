import React from 'react'

const ShopByPet = () => {
    return (
        <div className="shop-by-pet container my-8">
            <h1 className='section-heading'>Shop By Pet</h1>

            <div className="grid grid-cols-6 mt-10 gap-8">

                <div className="petbox drop-shadow hover:drop-shadow-none relative bg-white p-4 rounded-lg pb-20 transition duration-150 ease-in cursor-pointer">
                    <h1>Dogs</h1>
                    <img src="img/dog.png" alt="" className='absolute -top-10 right-0 h-40' />
                </div>

                <div className="petbox drop-shadow hover:drop-shadow-none relative bg-white p-4 rounded-lg pb-20 transition duration-150 ease-in cursor-pointer">
                    <h1>Cats</h1>
                    <img src="img/cat.png" alt="" className='absolute -top-10 right-0 h-40' />
                </div>

                <div className="petbox drop-shadow hover:drop-shadow-none relative bg-white p-4 rounded-lg pb-20 transition duration-150 ease-in cursor-pointer">
                    <h1>Birds</h1>
                    <img src="img/bird.png" alt="" className='absolute -top-10 right-0 h-40' />
                </div>

                <div className="petbox drop-shadow hover:drop-shadow-none relative bg-white p-4 rounded-lg pb-20 transition duration-150 ease-in cursor-pointer">
                    <h1>Fish</h1>
                    <img src="img/fish.png" alt="" className='absolute -top-10 right-0 h-40' />
                </div>

                <div className="petbox drop-shadow hover:drop-shadow-none relative bg-white p-4 rounded-lg pb-20 transition duration-150 ease-in cursor-pointer">
                    <h1>Horse</h1>
                    <img src="img/horse.png" alt="" className='absolute -top-10 right-0 h-40' />
                </div>

                <div className="petbox drop-shadow hover:drop-shadow-none relative bg-white p-4 rounded-lg pb-20 transition duration-150 ease-in cursor-pointer">
                    <h1>Farm</h1>
                    <img src="img/goat.png" alt="" className='absolute -top-10 -right-6 h-40' />
                </div>


            </div>
        </div>
    )
}

export default ShopByPet