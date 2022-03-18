import React, { useState } from 'react'
import PaymentItem from '../../Components/CheckoutComponents/PaymentItem';
import { BiRupee } from 'react-icons/bi';
import { Radio, Input } from '@nextui-org/react';
import AddressModal from '../../Components/CheckoutComponents/AddressModal';
import { IoMdPricetag } from 'react-icons/io'
import { HiShieldCheck, HiChevronRight } from 'react-icons/hi'


const Checkout = () => {

    const [showAddressModal, setShowAddressModal] = useState(false)

    return (
        <div className='checkout-page container mb-5'>

            {/* DELIVERY BOX */}
            <div className="delivery-box bg-white p-3 rounded-lg">
                <div className="flex w-full justify-between items-start">
                    <h1 className='font-semibold'>Delivery Address</h1>
                    <span className="text-slate-400 text-xs" onClick={() => setShowAddressModal(true)}>change</span>
                </div>
                <p className='text-xs text-slate-500 my-2 w-8/12'>301, Adil Tower M.G.Road, Old Panvel 410 206</p>
                <p className='text-xs text-slate-500 my-1'><psan className="font-semibold">mobile : </psan>+91 8454015530</p>
            </div>

            {/* PROMOCODE BOX */}
            <div className="promocode-box bg-white p-3 rounded-lg  mt-4">
                <h1 className='font-semibold mb-4'>Coupon Code</h1>
                <div className='flex justify-between gap-2 items-center'>
                    <IoMdPricetag className='text-theme h-8 w-10' />
                    <Input clearable underlined className='w-11/12' />
                    <HiChevronRight className='bg-theme rounded-full h-8 w-10' />
                </div>
            </div>

            {/* PAYMENT DETAILS */}
            <div className="payment-details bg-white p-3 rounded-lg mt-4">
                <div className="flex justify-between items-start mb-4">
                    <h1 className='font-semibold'>Payment Details</h1>
                </div>

                <PaymentItem title='Total Price' price='500' />
                <PaymentItem title='Delivery Charge' price='10' />
                <PaymentItem title='Coupon Discount' price='20' />
                <PaymentItem title='You Have Saved' price='20' />

                <hr className='w-full border-1 border-dashed my-4' />

                <div className="flex justify-between items-center text-slate-500 my-2">
                    <span>Total Amount</span>
                    <span className='flex items-center'><BiRupee /> 490</span>
                </div>

            </div>

            {/* PAYMENT OPTIONS  */}
            <Radio.Group value="A">
                <div className='online-payment bg-white p-3 rounded-lg mt-4'>
                    <div className="flex items-center">
                        <Radio checked={true} value="online" size={'xs'} color={'warning'} css={{ 'margin': '0 !important' }}></Radio>
                        <h1 className='font-semibold'>Payment Details</h1>
                    </div>
                    <div className="flex items-center text-green-600 my-2">
                        <HiShieldCheck />
                        <p className='text-xs'>100% payment protection and easy refunds.</p>
                    </div>
                    <div className="flex justify-evenly items-center mt-3 ml-5">
                        <img src="/img/icons/visa.png" alt="" className='h-6' />
                        <img src="/img/icons/mastercard.png" alt="" className='h-6' />
                        <img src="/img/icons/google-pay.png" alt="" className='h-6' />
                        <img src="/img/icons/phone-pay.png" alt="" className='h-6' />
                        <img src="/img/icons/apple-pay.png" alt="" className='h-6' />
                    </div>
                </div>

                <div className='cod bg-white p-3 rounded-lg mt-4'>
                    <div className="flex items-center">
                        <Radio value="cod" size={'xs'} color={'warning'} css={{ 'margin': '0 !important' }}></Radio>
                        <h1 className='font-semibold'>Cash On Delivery</h1>
                    </div>
                </div>
            </Radio.Group>

            <button className="w-full text-center bg-theme p-2 rounded-lg py-4 mt-8 shadow font-semibold">
                Place Order
            </button>

            {/* ADDRESS MODAL */}
            <AddressModal visible={showAddressModal} close={() => setShowAddressModal(false)} />



            {/* PROMOCODE MODAL */}
        </div>
    )
}

export default Checkout