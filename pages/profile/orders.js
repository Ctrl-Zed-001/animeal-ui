import React, { useContext, useEffect } from 'react'
import { BiRupee } from 'react-icons/bi'
import Link from 'next/link'
import { AuthContext } from '../../Context/AuthContext'
import { useRouter } from 'next/router'
import ProfileInfoBox from '../../Components/ProfilePageComponents/ProfileInfoBox'


const Orders = () => {

    const { isLoggedIn } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/')
        }
    })


    return (
        <div className="profile-page my-16 lg:my-0">
            <div className="container">
                <h1 className='font-semibold text-2xl mb-4'>My Profile</h1>

                {/* PROFILE INFO */}
                <ProfileInfoBox />

                <div className="blank-col"></div>

                {/* PROFILE ACTIONS */}
                <div className="profile-action-section col-span-8 bg-white rounded-xl p-4 -translate-y-6 h-fit py-12">
                    {/* <div className="grid grid-cols-2 gap-10">
                        <ActionBox title="My Orders" icon="my-orders" link='/profile/orders' />
                        <ActionBox title="Saved Addresses" icon="view-addresses" link='/profile/address' />
                        <ActionBox title="Edit Profile" icon="edit-profile" link='/profile/edit' />
                        <ActionBox title="Change Password" icon="change-password" link='/profile/change-password' />
                    </div> */}

                    <div className="">

                        <div className='my-orders-page'>
                            <div className="">
                                <h1 className='font-semibold text-2xl mb-4'>My Orders</h1>

                                {/* CURRENT ORDER */}
                                <div className="bg-white rounded-lg mb-16 text-xs">
                                    <div className="lg:grid grid-cols-2 gap-20">

                                        <div className="left-side">
                                            <h1 className=" font-semibold mb-4 ">Order Id: 2365sd2548as1d32a1s5d4a56</h1>
                                            <div className="bg-slate-200 rounded-lg p-4 flex justify-between gap-8 lg:gap-16">
                                                <img src="/img/product-placeholder.png" alt="" className='h-20' />
                                                <div className="flex-1 font-medium">
                                                    <h1>ardern grange product name wagera wagera..</h1>
                                                    <p className='text-slate-500 text-xs my-1'>1kg</p>
                                                    <p className='flex items-center'><BiRupee /> 1584</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 mt-4">
                                                <button className='bg-red-400 rounded-lg p-2 px-4 text-white text-xs'>cancel order</button>
                                                <button className='bg-slate-200 rounded-lg p-1 px-4 text-black text-xs'>Need help?</button>
                                                <button className='bg-slate-200 rounded-lg p-1 px-4 text-black cursor-not-allowed text-xs' disabled>Download Invoice</button>
                                            </div>
                                        </div>

                                        <div className="right-side mt-4 lg:mt-0">
                                            <h1 className=" font-semibold mb-4">Shipping Details</h1>
                                            <p className="text-xs text-slate-500">Building No,66, 78th Main Road, 100ft Road, Indiranagar, Bangalore 123456 Mobile: 98765 43210</p>

                                            <h1 className=" font-semibold mb-4 mt-6">Shipping Details</h1>
                                            <table className='w-full lg:w-6/12 text-xs text-slate-500'>
                                                <tbody>
                                                    <tr>
                                                        <td>Sub Total : </td>
                                                        <td>12455</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Delivery Charges : </td>
                                                        <td>12455</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Coupon Discount : </td>
                                                        <td>12455</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total : </td>
                                                        <td>12455</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* ORDER TIMELINE */}
                                    <div className="grid grid-cols-4 mt-12 relative text-xs order-timeline">
                                        <div className="milestoneline w-full h-1 bg-slate-200 absolute top-1 left-0"></div>

                                        <div className="col">
                                            <div className="milestone h-3 w-3 bg-slate-200 rounded-full mb-2 lg:mb-4"></div>
                                            <h1>Order placed</h1>
                                            <p className="lg:text-xs text-slate-500">Mon, 28th Mar 2022</p>
                                        </div>
                                        <div className="col text-center">
                                            <div className="milestone h-3 w-3 bg-slate-200 rounded-full mb-2 lg:mb-4 mx-auto"></div>
                                            <h1>Shipped</h1>
                                            <p className="lg:text-xs text-slate-500">Mon, 28th Mar 2022</p>
                                        </div>
                                        <div className="col text-center">
                                            <div className="milestone h-3 w-3 bg-slate-200 rounded-full mb-2 lg:mb-4 mx-auto"></div>
                                            <h1>Out for delivery</h1>
                                            <p className="lg:text-xs text-slate-500">Mon, 28th Mar 2022</p>
                                        </div>
                                        <div className="col text-right flex flex-col justify-end items-end">
                                            <div className="milestone h-3 w-3 bg-slate-200 rounded-full mb-2 lg:mb-4 "></div>
                                            <h1>Delivered</h1>
                                            <p className="lg:text-xs text-slate-500">Mon, 28th Mar 2022</p>
                                        </div>
                                    </div>

                                </div>

                                {/* PAST OREDERS */}
                                <h1 className='font-semibold mb-4'>Previous orders</h1>

                                <div className="past-order bg-slate-100 py-2 rounded-lg grid grid-cols-12 my-4 gap-4 lg:gap-0 text-xs">
                                    <img src="/img/product-placeholder.png" alt="" className='h-20 col-span-3 lg:col-span-1' />
                                    <div className="col col-span-9 lg:col-span-7">
                                        <h1 className='font-semibold'>product name wagera wager..</h1>
                                        <p className="text-xs text-slate-600 my-1">1 Kg</p>
                                        <p className='flex items-center'><BiRupee /> 1584</p>
                                        <div className="block lg:hidden text-xs">
                                            <h1 className='my-2 font-medium'>Delivered on Jan 16th</h1>
                                            <div className="flex gap-6 text-xs">
                                                <button className='bg-slate-200 rounded-lg p-1 px-4 text-black'>Need help?</button>
                                                <button className='bg-slate-200 rounded-lg p-1 px-4 text-black cursor-not-allowed'>Download Invoice</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-span-4 hidden lg:block'>
                                        <h1 className='mb-4 font-medium'>Delivered on Jan 16th</h1>
                                        <div className="flex gap-6">
                                            <button className='bg-slate-200 rounded-lg p-1 px-4 text-black'>Need help?</button>
                                            <button className='bg-slate-200 rounded-lg p-1 px-4 text-black cursor-not-allowed'>Download Invoice</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>


                </div>


            </div>
        </div>

    )
}

export default Orders