import React, { useState, useContext, useEffect, useRef } from 'react'
import PaymentItem from '../../Components/CheckoutComponents/PaymentItem';
import { BiRupee } from 'react-icons/bi';
import { Radio, Input } from '@nextui-org/react';
import AddressModal from '../../Components/CheckoutComponents/AddressModal';
import { IoMdPricetag } from 'react-icons/io'
import { HiShieldCheck, HiChevronRight } from 'react-icons/hi'
import { AiFillPlusCircle, AiFillEdit } from 'react-icons/ai'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Virtual, Navigation } from 'swiper';;
import 'swiper/css';
import "swiper/css/pagination";
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios';
import NewAddressModal from '../../Components/CheckoutComponents/NewAddressModal';
import OrderStatusPopup from '../../Components/CheckoutComponents/OrderStatusPopup';
import { useRouter } from 'next/router'
import OtpPopup from '../../Components/CheckoutComponents/OtpPopup'




const Checkout = () => {

    SwiperCore.use([Virtual, Navigation]);
    const router = useRouter()

    const { token, userDetails } = useContext(AuthContext)
    const { cartTotal } = useContext(CartContext)

    const [showAddressModal, setShowAddressModal] = useState(false)
    const [address, setAddress] = useState()
    const [savedAddresses, setSavedAddresses] = useState()
    const [newAddressModal, ToggleNewAddressModal] = useState(false)
    const [statusModal, setStatusModal] = useState()
    const [otpModal, setOtpModal] = useState()
    const [orderStatus, setOrderStatus] = useState(false)
    const [isOnlinePayment, setIsOnlinePayment] = useState(true)

    useEffect(() => {
        if (token) {
            axios.post(
                `${process.env.NEXT_PUBLIC_API_URI}/user/getsavedaddresses/post/data`,
                {},
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
                .then(res => {
                    setSavedAddresses(res.data.savedAddresses)
                    let defaultAddress = res.data.savedAddresses.filter(addr => addr.defaultaddress === 'Yes')
                    setAddress(defaultAddress[0])
                })
                .catch(err => console.log(err))
        }
    }, [token])

    const addNewAddress = (newData) => {
        let body = {
            addname: newData.name,
            addemail: userDetails.email,
            addnumber: newData.number,
            addaltnumber: userDetails.altnumber,
            addaddress1: newData.address1,
            addaddress2: newData.address2,
            addcity: newData.city,
            addpincode: newData.zipcode,
            addstate: newData.state,
            addresstype: newData.type,
            defaultaddress: 'No'
        }
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/user/addnewdaddress/post/data`,
            body,
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then(res => {
                setSavedAddresses([
                    body,
                    ...savedAddresses
                ])
            })
            .catch(err => console.log(err))
    }

    const changeAddress = (index) => {
        setAddress(savedAddresses[index])
    }

    const selectAddress = (adr) => {
        setAddress(adr)
        setShowAddressModal(false)
    }

    const callRazorPay = () => {
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/user/razorpayordercreate/post/data`,
            {
                "amount": cartTotal * 100
            },
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then(res => {
                if (res.data.razorpayOrderDetails.id) {
                    makePayment(res.data.razorpayOrderDetails.id)
                }
            })
            .catch(err => console.log(err))
    }

    const makePayment = (orderId) => {
        let rzp1;
        var options = {
            "key": process.env.NEXT_PUBLIC_RAZOR_PAY_KEY, // Enter the Key ID generated from the Dashboard
            "amount": cartTotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Animeal",
            "description": "Test Transaction",
            "order_id": orderId,
            "image": "/img/logo.png",
            "handler": function (response) {
                let payment_id = response.razorpay_payment_id
                let order_id = response.razorpay_order_id;
                let signature = response.razorpay_signature;
                axios.post(
                    `${process.env.NEXT_PUBLIC_API_URI}/user/onlinePayment/post/data`,
                    {
                        name: address.addname,
                        drname: "zed",
                        email: address.addemail,
                        number: address.addnumber,
                        altnumber: address.addaltnumber,
                        address1: address.addaddress1,
                        address2: address.addaddress2,
                        city: address.addcity,
                        pincode: address.addpincode,
                        state: address.addstate,
                        razorpay_payment_id: payment_id
                    },
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                )
                    .then(res => {
                        setOrderStatus(true)
                        setStatusModal(true)
                    })
                    .catch(err => console.log(err))
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        rzp1 = new window.Razorpay(options)
        rzp1.open()

        rzp1.on('payment.failed', function (response) {
            // alert('payment fail')
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);

            // OPEN PAYMENT FAIL POPUP HERE
            setOrderStatus(false)
            setStatusModal(true)
        });
    }

    const placeOrder = (otp) => {
        setOtpModal(false)
        console.log(otp)
        // VALIDATE OTP API
        console.log("validating otp")
        // PLACE ORDER API
        console.log("order placed")
        setStatusModal(true)
        setOrderStatus(true)
    }


    return (
        <div className='block lg:flex lg:gap-12 checkout-page container my-5'>

            {/* MOBILE DELIVERY BOX */}
            {
                address ?
                    <div className="delivery-box bg-white p-3 rounded-lg lg:hidden">
                        <div className="flex w-full justify-between items-start">
                            <h1 className='font-semibold'>Delivery Address</h1>
                            <span className="text-slate-400 text-xs" onClick={() => setShowAddressModal(true)}>change</span>
                        </div>
                        <h1 className="mt-2 font-medium mb-1">{address.addname} ({address.addresstype})</h1>
                        <p className='my-1 text-sm'>{address.addaddress1} {address.addaddress2} {address.addcity} {address.addstate} {address.addpincode}</p>
                        <p className='font-medium text-sm'>{address.addnumber}</p>
                    </div> :
                    <></>
            }


            {/* LEFT SECTION */}
            <div className="left-section w-full lg:w-9/12">

                <div className="lg:flex gap-3 hidden">
                    {/* DESKTOP ADDRESS SLIDER */}
                    <Radio.Group className='w-10/12'>
                        <Swiper
                            modules={[Virtual]}
                            slidesPerView={3}
                            navigation={true}
                            className='w-full'
                            spaceBetween={10}
                            virtual
                        >

                            {
                                savedAddresses && savedAddresses.map((slideContent, index) => {
                                    return (
                                        <SwiperSlide key={index} virtualIndex={index}>
                                            <div className='address-box bg-white p-4 pt-0 rounded-lg'>
                                                <div className="flex justify-between w-full">
                                                    <Radio onChange={() => changeAddress(index)} checked={slideContent.defaultaddress === 'Yes' ? true : false} size='xs' color='success' value={index} />
                                                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-4">
                                                        <AiFillEdit /> Edit
                                                    </div>

                                                </div>
                                                <div className="address text-sm mt-3 text-gray-500">
                                                    <h1 className='text-base text-medium mb-1 text-gray-700'>{slideContent.addname} <span className='text-xs text-gray-500'>({slideContent.addresstype})</span></h1>
                                                    <p>{slideContent.addaddress1 + ' ' + slideContent.addaddress2 + ' ' + slideContent.addcity + ' ' + slideContent.addstate + ' ' + slideContent.addpincode}</p>
                                                    <p className="text-semibold mt-2 text-gray-800">{slideContent.addnumber}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }

                        </Swiper>
                    </Radio.Group>

                    <div onClick={() => ToggleNewAddressModal(true)} className="new-address-box p-4 rounded-lg text-center bg-white flex items-center justify-center w-2/12 cursor-pointer">
                        <div>
                            <h1>Add New</h1>
                            <AiFillPlusCircle className='text-gray-400 text-3xl mx-auto' />
                        </div>
                    </div>
                </div>

                {/* EDIT ADDRESS FORM */}
                <div className="address-form bg-slate-100 p-4 rounded-lg mt-4">
                    <h1 className="font-semibold text-lg">Delivery Address</h1>
                    <div className="flex justify-between gap-14 my-14 w-full">
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="Name"
                            initialValue={address?.addname}
                        />
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="Phone Number"
                            initialValue={address?.addnumber}
                            type="number"
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:flex justify-between gap-14 my-14 w-full">
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="Roo no. / house no. / street"
                            initialValue={address?.addaddress1}
                        />
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="Area / locality"
                            initialValue={address?.addaddress2}
                        />
                        <select name='addtype' value={address?.addresstype} className='bg-transparent border-b-2 border-gray-200 w-full lg:w-8/12'>
                            <option value="Office">Office</option>
                            <option value="Home">Home</option>
                        </select>
                    </div>
                    {/* <div className="flex justify-between gap-14 my-8 w-full">
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="Address Type"
                            initialValue={address?.addresstype}
                        />
                        
                    </div> */}
                    <div className="grid grid-cols-1 lg:flex justify-between gap-14 my-14 w-full">
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="City / Town"
                            initialValue={address?.addcity}
                        />
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="State"
                            initialValue={address?.addstate}
                        />
                        <Input
                            fullWidth
                            clearable
                            underlined
                            label="ZipCode"
                            initialValue={address?.addpincode}
                            type="number"
                        />
                    </div>
                </div>

            </div>

            {/* RIGHT SECTION */}
            <div className="right-section lg:w-3/12">

                {/* PROMOCODE BOX */}
                <div className="promocode-box bg-white p-3 rounded-lg  mt-4 lg:mt-0">
                    <h1 className='font-semibold mb-4'>Coupon Code</h1>
                    <div className='flex justify-between gap-2 items-center'>
                        <IoMdPricetag className='text-theme h-8 w-10' />
                        <Input clearable underlined className='w-11/12' />
                        <HiChevronRight className='bg-theme rounded-full h-8 w-8' />
                    </div>
                </div>

                {/* PAYMENT DETAILS */}
                <div className="payment-details bg-white p-3 rounded-lg mt-4">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className='font-semibold'>Payment Details</h1>
                    </div>

                    <PaymentItem title='Total Price' price={cartTotal} />
                    <PaymentItem title='Delivery Charge' price='0' />
                    <PaymentItem title='Coupon Discount' price='0' />
                    <PaymentItem title='You Have Saved' price='0' />

                    <hr className='w-full border-1 border-dashed my-4' />

                    <div className="flex justify-between items-center text-slate-500 my-2">
                        <span>Total Amount</span>
                        <span className='flex items-center'><BiRupee /> {cartTotal}</span>
                    </div>

                </div>

                {/* PAYMENT OPTIONS  */}
                <Radio.Group onChange={(value) => setIsOnlinePayment(value)} value={true}>
                    <div className='online-payment bg-white p-3 rounded-lg mt-4'>
                        <div className="flex items-center">
                            <Radio value={true} size={'xs'} color='success' css={{ 'margin': '0 !important' }}></Radio>
                            <h1 className='font-semibold'>Online Payment</h1>
                        </div>
                        <div className="flex items-start text-green-600 my-2">
                            <HiShieldCheck />
                            <p className='text-xs ml-1'>100% payment protection and easy refunds.</p>
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
                            <Radio value={false} size={'xs'} color='success' css={{ 'margin': '0 !important' }}></Radio>
                            <h1 className='font-semibold'>Cash On Delivery</h1>
                        </div>
                    </div>
                </Radio.Group>

                {
                    isOnlinePayment ?
                        <button onClick={callRazorPay} className="w-full text-center bg-theme p-2 rounded-lg py-4 mt-8 shadow font-semibold">
                            Pay Online
                        </button>
                        :
                        <button onClick={() => { setOtpModal(true) }} className="w-full text-center bg-theme p-2 rounded-lg py-4 mt-8 shadow font-semibold">
                            Place Order
                        </button>
                }
            </div >

            {/* MOBILE ADDRESS MODAL */}
            < AddressModal addresses={savedAddresses} selectAddress={selectAddress} visible={showAddressModal} close={() => setShowAddressModal(false)} />

            {/* NEW ADDRESS MODAL */}
            <NewAddressModal isOpen={newAddressModal} close={() => ToggleNewAddressModal(false)} save={addNewAddress} />

            {/* ORDER STATUS MODAL */}
            {
                statusModal !== undefined ?
                    <OrderStatusPopup isOpen={statusModal} status={orderStatus} close={() => { setStatusModal(false); router.replace('/') }} /> :
                    <></>
            }

            {/* OTP MODAL */}
            {
                otpModal !== undefined ?
                    <OtpPopup isOpen={otpModal} close={() => setOtpModal(false)} placeOrder={placeOrder} /> :
                    <></>
            }

        </div >
    )
}

export default Checkout