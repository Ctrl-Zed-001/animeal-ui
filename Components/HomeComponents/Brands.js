import React from 'react'

const Brands = () => {
    return (
        <div className='container brand-section'>
            <h1 className='text-xl font-medium'>Popular brands</h1>
            <div className="grid grid-cols-2 lg:grid-cols-6 my-6 gap-4 lg:gap-10">

                <div className="brand-box rounded-lg cursor-pointer">
                    <img src="https://staging.animeal.in/uploads/brand-icon/3793271645693258.png" alt="" className='rounded-lg' />
                </div>
                <div className="brand-box rounded-lg cursor-pointer">
                    <img src="https://staging.animeal.in/uploads/brand-icon/3793271645693258.png" alt="" className='rounded-lg' />
                </div>
                <div className="brand-box rounded-lg cursor-pointer">
                    <img src="https://staging.animeal.in/uploads/brand-icon/3793271645693258.png" alt="" className='rounded-lg' />
                </div>

            </div>
        </div>
    )
}

export default Brands