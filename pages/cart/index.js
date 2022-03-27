import React, { useState, useContext } from 'react'
import { BiRupee } from 'react-icons/bi';
import CartItem from '../../Components/CartPageComponents/CartItem';
import PrescriptionModal from '../../Components/CartPageComponents/PrescriptionModal';
import { FaTrash } from 'react-icons/fa'
import CartSummary from '../../Components/CartPageComponents/CartSummary';
import { CartContext } from '../../Context/CartContext';

const Cart = () => {

    const { cartItems, cartTotal, qty, removeAllItems, removeCartItem, updateCartQuantity, cartDiscount, subTotal } = useContext(CartContext)

    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)

    return (
        <div className='cart-page container mt-0 mb-4'>

            {
                cartItems && cartItems.length > 0 ?
                    <div className="flex-row lg:flex gap-8 justify-between">

                        <div className="cart-left-side lg:w-9/12 mb-8">
                            {/* TOP YELLOW BOX   */}
                            <div className="grid grid-cols-6 gap-3 topbox bg-theme p-6 rounded-lg">
                                <div className="col col-span-4 lg:col-span-3">
                                    <h1>Products</h1>
                                </div>
                                <div className="hidden lg:block col">
                                    <h1>Quantity</h1>
                                </div>
                                <div className="hidden lg:block col text-center">
                                    <h1>Total</h1>
                                    <p className='flex items-center justify-center  mt-3 text-lg font-semibold'><BiRupee /> {cartTotal}</p>
                                </div>
                                <div className="col-span-2 lg:col-span-1 col text-right lg:text-center">
                                    <h1>Clear All</h1>
                                    <FaTrash onClick={removeAllItems} className='text-lg mt-2 float-right lg:mx-auto lg:float-none cursor-pointer' />
                                </div>
                            </div>

                            {/* CART ITEMS */}
                            {
                                cartItems?.map((item, index) => {
                                    return <CartItem updateCartQuantity={updateCartQuantity} key={index} item={item[0]} removeCartItem={removeCartItem} />
                                })

                            }

                            <p className="text-gray-500 text-sm text-center">Some of your itmes require prescription. Please upload theme to continue further. <span className='text-theme font-semibold underline cursor-pointer' onClick={() => { setShowPrescriptionModal(true) }}>Upload Prescription</span></p>


                        </div>

                        <CartSummary cartTotal={cartTotal} qty={qty} cartDiscount={cartDiscount} subTotal={subTotal} />
                    </div> :
                    <div>
                        <img src='/img/empty-cart.png' className='w-5/12 mx-auto' />
                        <p className="text-center font-semibold">You have no items in your cart.</p>
                    </div>
            }
            {/* PRESCRIPTION MODAL */}
            <PrescriptionModal visible={showPrescriptionModal} close={() => setShowPrescriptionModal(false)} />
        </div>
    )
}

export default Cart