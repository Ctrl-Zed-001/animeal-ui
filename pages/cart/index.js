import React, { useState } from 'react'
import { BiRupee } from 'react-icons/bi';
import CartItem from '../../Components/CartPageComponents/CartItem';
import Link from 'next/link'
import PrescriptionModal from '../../Components/CartPageComponents/PrescriptionModal';

const Cart = () => {
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
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

            <p className="text-gray-500 text-sm">Some of your itmes require prescription. Please upload theme to continue further. <span className='text-yellow-600 font-semibold underline cursor-pointer' onClick={() => { setShowPrescriptionModal(true) }}>Upload Prescription</span></p>

            {/* CHECKOUT BUTTON */}
            <Link href='/checkout'>
                <button className="w-full text-center bg-theme p-2 rounded-lg py-4 mt-8 shadow font-semibold">
                    Continue To Checkout
                </button>
            </Link>

            {/* PRESCRIPTION MODAL */}
            <PrescriptionModal visible={showPrescriptionModal} close={() => setShowPrescriptionModal(false)} />
        </div>
    )
}

export default Cart