import React, { useState, useContext, useEffect } from 'react'
import { BiRupee } from 'react-icons/bi';
import CartItem from '../../Components/CartPageComponents/CartItem';
import PrescriptionModal from '../../Components/CartPageComponents/PrescriptionModal';
import { FaTrash } from 'react-icons/fa'
import CartSummary from '../../Components/CartPageComponents/CartSummary';
import { CartContext } from '../../Context/CartContext';
import { AuthContext } from '../../Context/AuthContext'

const Cart = () => {

    const { cartItems, cartTotal, qty, removeAllItems, removeCartItem, updateCartQuantity, cartDiscount, subTotal, hasMedicine, prescriptionUploaded, setPrescriptionUploaded, setPrescriptionFiles, setDoctorName, doctorName } = useContext(CartContext)
    const { isLoggedIn, setShowAuthModal, isMobile } = useContext(AuthContext)

    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)

    return (
        <div className='cart-page container mt-0 mb-10 xl:mb-4'>

            {
                cartItems && cartItems.length > 0 ?
                    <div className="flex-row lg:flex gap-8 justify-between">

                        <div className="cart-left-side lg:w-9/12 mb-8">
                            {/* TOP YELLOW BOX   */}
                            <div className="grid grid-cols-6 gap-3 topbox bg-theme p-6 rounded-lg">
                                <div className="col col-span-4 lg:col-span-3">
                                    <h1 className='text-xl mt-2'>Products</h1>
                                </div>
                                <div className="hidden lg:block col">
                                    <h1 className='text-xl mt-2'>Quantity</h1>
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
                                    return <CartItem isLoggedIn={isLoggedIn} updateCartQuantity={updateCartQuantity} key={index} item={item} removeCartItem={removeCartItem} />
                                })

                            }

                            {
                                hasMedicine ?
                                    <p className="text-gray-500 text-sm lg:text-base text-center">Some of your itmes require prescription. Please upload theme to continue further. <span className='text-theme font-semibold underline cursor-pointer' onClick={() => { setShowPrescriptionModal(true) }}>Upload Prescription</span></p> :
                                    <></>
                            }



                        </div>

                        <CartSummary setShowPrescriptionModal={setShowPrescriptionModal} hasMedicine={hasMedicine} prescriptionUploaded={prescriptionUploaded} showAuthModal={setShowAuthModal} isLoggedIn={isLoggedIn} cartTotal={cartTotal} qty={qty} cartDiscount={cartDiscount} subTotal={subTotal} />
                    </div> :
                    <div className='mt-28'>
                        <img src='/img/empty-cart.webp' className=' w-full xl:w-5/12 mx-auto' />
                        <p className="text-center font-semibold">You have no items in your cart.</p>
                    </div>
            }
            {/* PRESCRIPTION MODAL */}
            <PrescriptionModal isMobile={isMobile} doctorName={doctorName} setDoctorName={setDoctorName} setPrescriptionUploaded={setPrescriptionUploaded} setPrescriptionFiles={setPrescriptionFiles} visible={showPrescriptionModal} close={() => setShowPrescriptionModal(false)} />
        </div>
    )
}

export default Cart