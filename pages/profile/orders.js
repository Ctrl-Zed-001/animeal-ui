import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useRouter } from 'next/router'
import ProfileInfoBox from '../../Components/ProfilePageComponents/ProfileInfoBox'
import axios from 'axios'
import PreviousOrderBox from '../../Components/ProfilePageComponents/PreviousOrderBox'
import CurrentOrderBox from '../../Components/ProfilePageComponents/CurrentOrderBox'


const Orders = () => {

    const { isLoggedIn, token } = useContext(AuthContext)

    const [pendingOrder, setPendingOrder] = useState()
    const [pastOrders, setPastOrders] = useState()
    const [noOrders, setNoOrders] = useState()

    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/')
        } else {
            axios.get(
                `${process.env.NEXT_PUBLIC_API_URI}/user/orders/get/data`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
                .then(res => {
                    console.log("🚀 ~ file: orders.js ~ line 32 ~ useEffect ~ res", res)
                    let currentOrder = res.data.backendData.filter(order => order.order_status == "In Process")
                    setPendingOrder(currentOrder[0])
                    let previousOrders = res.data.backendData.filter(order => order.order_status != "In Process")
                    setPastOrders(previousOrders)

                })
                .catch(err => {
                    setNoOrders(true)
                    console.log(err)
                })
        }
    }, [])


    return (
        <div className="profile-page my-16 lg:my-0">
            <div className="container">
                <h1 className='font-semibold text-2xl mb-4'>My Profile</h1>

                {/* PROFILE INFO */}
                <ProfileInfoBox />

                <div className="blank-col"></div>

                {/* ORDERS SECTION */}
                <div className="profile-action-section col-span-8 bg-white rounded-xl p-4 -translate-y-6 h-fit py-12">

                    <div className='my-orders-page'>
                        {
                            pendingOrder && <h1 className='font-semibold text-2xl mb-4'>My Orders</h1>
                        }

                        {/* CURRENT ORDER */}
                        {
                            pendingOrder && <CurrentOrderBox order={pendingOrder} />
                        }

                        {/* PAST OREDERS */}
                        {
                            pastOrders && <h1 className='font-semibold mb-4'>Previous orders</h1>
                        }

                        {
                            pastOrders && pastOrders.map((order, index) => {
                                return <PreviousOrderBox order={order} key={index} />
                            })
                        }

                        {
                            noOrders && <p className='font-semibold'>You have no orders</p>
                        }

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Orders