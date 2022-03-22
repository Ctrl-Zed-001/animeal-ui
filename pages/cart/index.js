import React, { useState, useContext, useEffect } from 'react'
import { BiRupee } from 'react-icons/bi';
import CartItem from '../../Components/CartPageComponents/CartItem';
import Link from 'next/link'
import PrescriptionModal from '../../Components/CartPageComponents/PrescriptionModal';
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios';
import config from "../../config.json"
import { FaTrash } from 'react-icons/fa'
import CartSummary from '../../Components/CartPageComponents/CartSummary';

const Cart = () => {
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('token')
        axios.post(
            `${config.api_uri}/user/getcart/post/data`,
            {},
            {
                headers: {
                    "Authorization": token
                }
            })
            .then(res => {
                setCartItems(res.data.cartDetails)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='cart-page container mt-0 mb-4'>

            {
                cartItems && cartItems.length > 0 ?
                    <div className="flex gap-8 justify-between">

                        <div className="cart-left-side w-9/12">
                            {/* TOP YELLOW BOX   */}
                            <div className="grid grid-cols-6 gap-3 topbox bg-theme p-6 rounded-lg">
                                <div className="col col-span-3">
                                    <h1>Products</h1>
                                </div>
                                <div className="col">
                                    <h1>Quantity</h1>
                                </div>
                                <div className="col text-center">
                                    <h1>Total</h1>
                                    <p className='flex items-center justify-center  mt-3 text-lg font-semibold'><BiRupee /> 500</p>
                                </div>
                                <div className="col text-center">
                                    <h1>Clear All</h1>
                                    <FaTrash className='text-lg mt-2 mx-auto' />
                                </div>
                            </div>

                            {/* CART ITEMS */}
                            {
                                cartItems?.map((item, index) => {
                                    return <CartItem key={index} item={item} />
                                })

                            }

                            <p className="text-gray-500 text-sm text-center">Some of your itmes require prescription. Please upload theme to continue further. <span className='text-theme font-semibold underline cursor-pointer' onClick={() => { setShowPrescriptionModal(true) }}>Upload Prescription</span></p>

                            {/* CHECKOUT BUTTON */}
                            <Link href='/checkout'>
                                <button className="w-full text-center bg-theme p-2 rounded-lg py-4 mt-8 shadow font-semibold block md:hidden">
                                    Continue To Checkout
                                </button>
                            </Link>
                        </div>

                        <CartSummary />
                    </div> :
                    <div>
                        <img src='/img/empty-cart.png' className='w-5/12 mx-auto' />
                        <p className="text-center font-semibold">kuchh to khareed be!!</p>
                    </div>
            }
            {/* PRESCRIPTION MODAL */}
            <PrescriptionModal visible={showPrescriptionModal} close={() => setShowPrescriptionModal(false)} />
        </div>
    )
}

export default Cart