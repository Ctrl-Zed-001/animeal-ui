import React, { useState, useContext, useEffect, useRef } from 'react'
import PaymentItem from '../../Components/CheckoutComponents/PaymentItem';
import { BiRupee } from 'react-icons/bi';
import { Radio, Input, Switch } from '@nextui-org/react';
import AddressModal from '../../Components/CheckoutComponents/AddressModal';
import { IoMdPricetag } from 'react-icons/io'
import { HiShieldCheck, HiChevronRight } from 'react-icons/hi'
import { AiFillPlusCircle, AiFillEdit, AiOutlineLoading3Quarters } from 'react-icons/ai'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Virtual, Navigation } from 'swiper';;
import 'swiper/css';
import "swiper/css/pagination";
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios';
import NewAddressModal from '../../Components/CheckoutComponents/NewAddressModal';
import StatusPopup from '../../Components/CheckoutComponents/StatusPopup';
import { useRouter } from 'next/router'
import OtpPopup from '../../Components/CheckoutComponents/OtpPopup'
import toast, { Toaster } from 'react-hot-toast'
import FormData from 'form-data';
import { getAddress, saveAddress, generateOtp } from '../../Helpers/Api';




const Checkout = () => {

    SwiperCore.use([Virtual, Navigation]);
    const router = useRouter()
    const form = new FormData();

    const { token, userDetails, isLoggedIn } = useContext(AuthContext)
    const { cartTotal, subTotal, clearCart, cartDiscount, doctorName, prescriptionFiles, prescriptionUploaded, hasMedicine, setCartTotal, cartItems } = useContext(CartContext)

    const [showAddressModal, setShowAddressModal] = useState(false)
    const [address, setAddress] = useState()
    const [savedAddresses, setSavedAddresses] = useState()
    const [newAddressModal, ToggleNewAddressModal] = useState(false)
    const [statusModal, setStatusModal] = useState()
    const [deliveryModal, setDeliveryModal] = useState()
    const [otpModal, setOtpModal] = useState()
    const [orderStatus, setOrderStatus] = useState(false)
    const [isOnlinePayment, setIsOnlinePayment] = useState(true)
    const [isDeliverable, setIsDeliverable] = useState()
    const [loading, setIsLoading] = useState(false)
    const [couponcode, setCouponcode] = useState('')
    const [couponApplied, setCouponApplied] = useState(false)


    useEffect(() => {
        localStorage.removeItem('otpToken')
        if (token) {
            getAddress(token)
                .then(res => {
                    modifyAddresses(res.data.data.address)
                })
                .catch(err => {
                    router.replace('/');
                    console.log(err)
                })
        } else {
            router.replace('/')
        }
    }, [token])

    useEffect(() => {
        if (hasMedicine && !prescriptionUploaded) {
            router.replace('/cart')
        }
    }, [prescriptionUploaded])

    const modifyAddresses = (addresses) => {
        setSavedAddresses(addresses)
        let defaultAddress = addresses.filter(addr => addr.primary === true)
        setAddress(defaultAddress[0])
    }

    const validateAddress = (type) => {
        setIsLoading(true)
        if (!address) {
            toast.error("Please fill in all the fields")
            setIsLoading(false)
        } else {
            if (!address.line || !address.city || !address.name || !address.phone || !address.pincode || !address.state) {
                toast.error("Please fill in all the fields")
            } else if (address.phone.length < 10 || address.phone.length > 10) {
                toast.error("Please check your mobile number.")
            } else {
                checkForDelivery(type)
            }
        }
    }

    const checkForDelivery = (type) => {
        if (address.pincode) {
            if (address.pincode.length > 6 || address.pincode.length < 6) {
                toast.error("Please check your pincode")
                setIsLoading(false)
            } else {
                axios.post(
                    `${process.env.NEXT_PUBLIC_API_URI}/pincode/single`,
                    {
                        pincode: address.pincode
                    }
                ).then(res => {
                    if (res.data.data) {
                        callSaveAddress(type)
                    } else {
                        setDeliveryModal(true)
                        setIsDeliverable(false)
                    }

                }).catch(err => { setDeliveryModal(true); setIsDeliverable(false) })
            }
        } else {
            toast.error("Please fill in all the fields")
        }
    }


    const callSaveAddress = (paymentType) => {
        saveAddress(address, token)
            .then(res => {
                console.log("address saved")
            })
            .catch(err => { setIsLoading(true); console.log(err.response) })
        if (paymentType === 'online') {
            createOrder('ONLINE')
                .then(order => {
                    callPaytm(order.data.id)
                })
                .catch(err => {
                    {
                        setOrderStatus(false)
                        setStatusModal(true)
                        console.log(err)
                    }
                })
        } else {
            otpGen()
        }

    }

    const changeAddress = (index) => {
        setAddress(savedAddresses[index])
    }

    const selectAddress = (adr) => {
        setAddress(adr)
        setShowAddressModal(false)
    }

    const createOrder = (mode, status) => {
        return new Promise(async (resolve, reject) => {

            try {
                let products = cartItems.map(item => {
                    return { id: item.id }
                })

                let order = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/order/save`, {
                    user: userDetails.id,
                    products: products,
                    payment_mode: mode,
                    shipping_address: address.id,
                    total: cartTotal,
                    applied_coupon: couponcode,
                    discount: cartDiscount,
                    status: status
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                resolve(order.data)
            } catch (e) {
                reject(e)
            }

        })
    }

    const callPaytm = async (orderid) => {

        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/order/initiatepaytm`,
            {
                orderid: orderid,
                amount: cartTotal,
                userid: userDetails.id
            },
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then(res => {

                var config = {
                    "root": "",
                    "flow": "DEFAULT",
                    "data": {
                        "orderId": res.data.orderid, /* update order id */
                        "token": res.data.body.txnToken, /* update token value */
                        "tokenType": "TXN_TOKEN",
                        "amount": cartTotal /* update amount */
                    },
                    "handler": {
                        "notifyMerchant": function (eventName, data) {
                            console.log("notifyMerchant handler function called");
                            console.log("eventName => ", eventName);
                            console.log("data => ", data);
                        }
                    }
                };

                // if (window.Paytm && window.Paytm.CheckoutJS) {
                //     window.Paytm.CheckoutJS.init(config)
                //         .then(function onSuccess() {
                //             console.log("paytm success")
                //             window.Paytm.CheckoutJS.invoke();
                //             uploadPrescription()
                //         })
                //         .catch(function onError(error) {
                //             console.log("error => ", error);
                //             setOrderStatus(false)
                //             setStatusModal(true)
                //         })
                // }


                if (window.Paytm && window.Paytm.CheckoutJS) {
                    window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
                        window.Paytm.CheckoutJS.init(config)
                            .then(function onSuccess() {
                                console.log("paytm success")
                                window.Paytm.CheckoutJS.invoke();
                                setIsLoading(false)
                                // uploadPrescription()
                            })
                            .catch(function onError(error) {
                                console.log("error => ", error);
                                setOrderStatus(false)
                                setStatusModal(true)
                            })
                    }())
                }


            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })



    }



    const otpGen = () => {
        generateOtp(userDetails.phone, token)
            .then(res => {
                localStorage.setItem('otpToken', res.data.data)
                setOtpModal(true)
            })
            .catch(err => { setIsLoading(false); console.log(err) })
    }

    const validateOtp = (value) => {
        setOtpModal(false)
        // VALIDATE OTP API
        let otpToken = localStorage.getItem('otpToken')
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/order/validateotp`,
            {
                otp: value,
                otpToken: otpToken
            },
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then(res => {
                uploadPrescription()
                createOrder('COD', 'CONFIRMED')
                    .then(() => {
                        setIsLoading(false)
                        setOrderStatus(true)
                        setStatusModal(true)
                        clearCart()
                    })
                    .catch(err => {
                        setOrderStatus(false)
                        setStatusModal(true)
                        console.log(err)
                    })
            })
            .catch(err => {
                alert("wrong OTP")
                console.log(err)
            })
    }



    // UPLOAD PRESCRIPTION
    const uploadPrescription = () => {
        if (hasMedicine && prescriptionUploaded) {
            let fullAddress = address.line + ' ' + address.city + ' ' + address.pincode + ' ' + address.state;
            form.append('petname', '')
            form.append('pettype', '')
            form.append('drname', doctorName)
            form.append('name', address.name)
            form.append('email', address.addemail)
            form.append('number', address.phone)
            form.append('altnumber', address.addaltphone)
            form.append('address', fullAddress)
            form.append(`prescription[]`, prescriptionFiles[0])
            form.append(`prescription[]`, prescriptionFiles[1])


            axios.post(
                `${process.env.NEXT_PUBLIC_API_URI}/user/prescription/post/data`,
                form
            )
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
    }

    const applyCoupon = (e) => {
        if (couponApplied) {
            toast.error("Coupon already applied")
        } else {
            if (couponcode == 'MATMISSKARO15') {
                let discountedPrice = cartTotal - (subTotal * 0.05)
                setCartTotal(discountedPrice)
                setCouponApplied(true)
                toast.success("coupon applied")
            } else {
                toast.error("oops! that didn't work.")
            }
        }
    }


    return (
        <div className='block lg:flex lg:gap-12 checkout-page container mb-10 xl:my-10'>

            <Toaster
                position='top-center'
            />
            {/* MOBILE DELIVERY BOX */}
            {
                address ?
                    <div className="delivery-box bg-white p-3 rounded-lg lg:hidden">
                        <div className="flex w-full justify-between items-start">
                            <h1 className='font-semibold'>Delivery Address</h1>
                            <span className="text-slate-400 text-xs" onClick={() => setShowAddressModal(true)}>change</span>
                        </div>
                        <h1 className="mt-2 font-medium mb-1">{address.name} ({address.type})</h1>
                        <p className='my-1 text-sm'>{address.line} {address.city} {address.state} {address.pincode}</p>
                        <p className='font-medium text-sm'>{address.phone}</p>
                    </div> :
                    <button className='bg-slate-100 p-2 rounded-lg shadow font-semibold text-center w-full lg:hidden capitalize' onClick={() => setShowAddressModal(true)}>select from saved addresses</button>
            }


            {/* LEFT SECTION */}
            <div className="left-section w-full lg:w-9/12">

                <div className="lg:flex gap-3 hidden">
                    {/* DESKTOP ADDRESS SLIDER */}
                    <Radio.Group className='w-10/12'>
                        <Swiper
                            modules={[Virtual]}
                            slidesPerView={3}
                            className='w-full'
                            spaceBetween={10}
                            virtual
                        >

                            {
                                savedAddresses && savedAddresses.length > 0 && savedAddresses.map((slideContent, index) => {
                                    return (
                                        <SwiperSlide key={index} virtualIndex={index}>
                                            <div className='address-box bg-white p-4 pt-0 rounded-lg'>
                                                <div className="flex justify-between w-full">
                                                    <Radio onChange={() => changeAddress(index)} checked={slideContent.primary ? true : false} size='xs' color='success' value={index} />


                                                </div>
                                                <div className="address text-sm mt-3 text-gray-500">
                                                    <h1 className='text-base text-medium mb-1 text-gray-700'>{slideContent.name} <span className='text-xs text-gray-500'>({slideContent.type})</span></h1>
                                                    <p>{slideContent.line + ' ' + ' ' + slideContent.city + ' ' + slideContent.state + ' ' + slideContent.pincode}</p>
                                                    <p className="text-semibold mt-2 text-gray-800">{slideContent.phone}</p>
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
                            <h1>Add New Address</h1>
                            <AiFillPlusCircle className='text-gray-400 text-3xl mx-auto' />
                        </div>
                    </div>
                </div>

                {/* EDIT ADDRESS FORM */}
                <div className="address-form bg-slate-100 p-4 rounded-lg mt-4">
                    <h1 className="font-semibold text-lg">Delivery Address</h1>
                    <div className="grid grid-cols-2 lg:flex justify-between gap-14 my-14 w-full">
                        <Input
                            fullWidth

                            underlined
                            label="Name *"
                            initialValue={address?.name}
                            required
                            onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        />
                        <Input
                            fullWidth

                            underlined
                            label="Phone Number *"
                            initialValue={address?.phone}
                            type="number"
                            required
                            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        />
                        <Input
                            fullWidth

                            underlined
                            label="Alternate Number"
                            initialValue={address?.alt_phone}
                            type="number"
                            required
                            onChange={(e) => setAddress({ ...address, alt_phone: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:flex justify-between gap-14 my-14 w-full">
                        <Input
                            fullWidth

                            underlined
                            label="Address line"
                            initialValue={address?.line}
                            required
                            onChange={(e) => setAddress({ ...address, line: e.target.value })}
                        />
                        <select onChange={(e) => setAddress({ ...address, type: e.target.value })} name='addtype' value={address?.type ? address?.type : "Home"} className='bg-transparent border-b-2 border-gray-200 w-full lg:w-12/12'>
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>
                    {/* <div className="flex justify-between gap-14 my-8 w-full">
                        <Input
                            fullWidth
                            
                            underlined
                            label="Address Type"
                            initialValue={address?.type}
                        />
                        
                    </div> */}
                    <div className="grid grid-cols-1 lg:flex justify-between gap-14 my-14 w-full">
                        <Input
                            fullWidth

                            underlined
                            label="City / Town *"
                            initialValue={address?.city}
                            required
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        />
                        <Input
                            fullWidth

                            underlined
                            label="State *"
                            initialValue={address?.state}
                            required
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        />
                        <Input
                            fullWidth

                            underlined
                            label="ZipCode *"
                            initialValue={address?.pincode}
                            type="number"
                            required
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-end items-center gap-6">
                        Set as default address
                        <Switch
                            checked={true}
                            initialChecked={true}
                            onChange={(e) => setAddress({ ...address, primary: e.target.checked })} color='success' />
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
                        <Input underlined className='w-11/12' value={couponcode} onChange={(e) => setCouponcode(e.target.value.toUpperCase())} />
                        <HiChevronRight onClick={applyCoupon} className='bg-theme rounded-full h-8 w-8' />
                    </div>
                </div>

                {/* PAYMENT DETAILS */}
                <div className="payment-details bg-white p-3 rounded-lg mt-4">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className='font-semibold'>Payment Details</h1>
                    </div>

                    <PaymentItem title='Sub Total' price={parseInt(subTotal)} />
                    <PaymentItem title='Delivery Charge' price='0' />
                    <PaymentItem title='Coupon Discount' price='0' />
                    <PaymentItem className='text-green-600 font-semibold' title='You Have Saved' price={cartDiscount} />
                    {
                        couponApplied &&
                        <PaymentItem className='text-green-600 font-semibold' title='MATMISSKARO15' price={subTotal * 0.05} />
                    }

                    <hr className='w-full border-1 border-dashed my-4' />

                    <div className="flex justify-between items-center text-slate-500 my-2">
                        <span>Total Amount</span>
                        <span className='flex items-center'><BiRupee /> {cartTotal}</span>
                    </div>

                </div>

                {/* PAYMENT OPTIONS  */}
                <Radio.Group onChange={(value) => setIsOnlinePayment(!isOnlinePayment)} value={isOnlinePayment}>
                    <div className='online-payment bg-white p-3 rounded-lg mt-4'>
                        <div className="flex items-center">
                            <Radio value={true} size={'xs'} color='success' css={{ 'margin': '0 !important' }}></Radio>
                            <h1 className='font-semibold'>Online Payment</h1>
                        </div>
                        <div className="flex items-start text-green-600 my-2">
                            <HiShieldCheck />
                            <p className='text-xs ml-1'>100% payment protection and easy refunds.</p>
                        </div>
                        <div className="flex justify-start gap-6 xl:gap-4 items-center mt-3">
                            <img src="/img/icons/visa.webp" alt="" className='h-6' />
                            <img src="/img/icons/mastercard.webp" alt="" className='h-6' />
                            <img src="/img/icons/google-pay.webp" alt="" className='h-6' />
                            <img src="/img/icons/phone-pay.webp" alt="" className='h-6' />
                            <img src="/img/icons/upi.webp" className='h-3' />
                            <img src="/img/icons/rupay.webp" className='h-3' />
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
                        <button disabled={loading ? true : false} onClick={() => validateAddress('online')} className={`w-full text-center ${loading ? 'bg-slate-100' : 'bg-theme'} p-2 rounded-lg py-4 mt-8 shadow font-semibold`}>
                            {
                                loading ?
                                    <AiOutlineLoading3Quarters className='animate-spin mx-auto' /> :
                                    <>Pay Online</>
                            }

                        </button>
                        :
                        <button disabled={loading ? true : false} onClick={() => validateAddress('cod')} className={`w-full text-center ${loading ? 'bg-slate-100' : 'bg-theme'} p-2 rounded-lg py-4 mt-8 shadow font-semibold`}>
                            {
                                loading ?
                                    <AiOutlineLoading3Quarters className='animate-spin mx-auto' /> :
                                    <>Place Order</>
                            }
                        </button>
                }
            </div >

            {/* MOBILE ADDRESS MODAL */}
            < AddressModal addresses={savedAddresses} selectAddress={selectAddress} visible={showAddressModal} close={() => setShowAddressModal(false)} />

            {/* NEW ADDRESS MODAL */}
            <NewAddressModal isOpen={newAddressModal} close={() => ToggleNewAddressModal(false)} token={token} save={(data) => {
                modifyAddresses([data, ...savedAddresses]);
                ToggleNewAddressModal(false)
            }} />

            {/* ORDER STATUS MODAL */}
            {
                statusModal !== undefined ?
                    <StatusPopup
                        isOpen={statusModal}
                        image={orderStatus ? "/img/order-success.webp" : "/img/order-fail.webp"}
                        close={() => { setStatusModal(false); router.replace('/profile/orders') }}
                        heading={orderStatus ? "Your Order has been accepted" : "Oops! Order Failed"}
                        subheading={orderStatus ? "Your items has been placcd and is on it’s way to being processed" : "Looks like something went wrong while placing your order. Please try again after some time."}
                        class={orderStatus ? "bg-cyan-200" : "bg-red-300"}
                    /> :
                    <></>
            }

            {/* Delivery MODAL */}
            {
                deliveryModal !== undefined ?
                    <StatusPopup
                        isOpen={deliveryModal}
                        image={isDeliverable ? "/img/icons/tick.webp" : "/img/icons/delete.webp"}
                        close={() => { setDeliveryModal(false) }}
                        heading={isDeliverable ? "Pincode eligible for delivery" : "Oops! Cannot Deliver to this location. :("}
                    /> :
                    <></>
            }

            {/* OTP MODAL */}
            {
                otpModal !== undefined ?
                    <OtpPopup isOpen={otpModal} close={() => setOtpModal(false)} validateOtp={validateOtp} /> :
                    <></>
            }

        </div >
    )
}

export default Checkout