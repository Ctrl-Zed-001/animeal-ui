import React from 'react'

const OrderFailed = () => {
    return (
        <div className="container flex justify-center items-center">
            <div className='text-center'>
                <img src="/img/order-fail.webp" alt="" className='bg-red-300 mx-auto rounded-full' />
                <h1 className="text-center text-3xl font-semibold mt-4">Oops! Order Failed</h1>
                <p className="my-6 text-sm text-center">Looks like something went wrong while placing your order. Please try again after some time.</p>
                <a href='/' className='w-full p-2 text-lg font-semibold bg-theme shadow rounded-lg mx-auto'>Go To Home</a>
            </div>
        </div>
    )
}

export default OrderFailed