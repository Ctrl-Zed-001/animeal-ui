import React from 'react'
import { BiRupee } from 'react-icons/bi';
import CartItem from '../../Components/CartPageComponents/CartItem';
import Link from 'next/link'

const Cart = () => {
    return (
        <div className='cart-page container mt-0 mb-4'>
            {/* TOP YELLOW BOX   */}
            <div className="grid grid-cols-3 topbox bg-theme p-2 rounded-lg">
                <div className="col text-center">
                    <h1>Quantity</h1>
                    <p>4</p>
                </div>
                <div className="col text-center">
                    <h1>Total</h1>
                    <p className='flex justify-center'><BiRupee /> 500</p>
                </div>
                <div className="col text-center">
                    <h1>Clear All</h1>
                </div>
            </div>

            {/* CART ITEMS */}
            <CartItem />
            <CartItem />
            <CartItem />

            {/* CHECKOUT BUTTON */}
            <Link href='/checkout'>
                <button className="w-full text-center bg-theme p-2 rounded-lg py-4 mt-8 shadow font-semibold">
                    Continue To Checkout
                </button>
            </Link>
        </div>
    )
}

export default Cart