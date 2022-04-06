import React from 'react'

const OrderSuccess = () => {
    return (
        <div className="container flex justify-center items-center">
            <div className='text-center'>
                <img src="/img/order-success.webp" alt="" className='bg-cyan-200 mx-auto rounded-full' />
                <h1 className="text-center text-3xl font-semibold mt-4">Your Order has been accepted</h1>
                <p className="my-6 text-sm text-center">Your order has been placed and is on it’s way to being processed.</p>
                <a href='/' className='w-full p-2 text-lg font-semibold bg-theme shadow rounded-lg mx-auto'>Go To Home</a>
            </div>
        </div>
    )
}

export default OrderSuccess