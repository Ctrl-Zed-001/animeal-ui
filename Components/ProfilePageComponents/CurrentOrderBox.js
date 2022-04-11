import dayjs from 'dayjs'
import React from 'react'
import { BiRupee } from 'react-icons/bi'

const CurrentOrderBox = (props) => {
    console.log("🚀 ~ file: CurrentOrderBox.js ~ line 6 ~ CurrentOrderBox ~ props", props)
    return (
        <div className="current-order-box mb-16 text-xs">
            <div className="lg:grid grid-cols-2 gap-20">

                <div className="left-side">
                    <h1 className=" font-semibold mb-4 ">Order Id: {props.order.order_id}</h1>
                    <div className="grid grid-cols-3 gap-4">
                        {
                            props.order.orders.map((product, index) => {
                                return (
                                    <div key={index} className="bg-slate-200 rounded-lg p-4 ">
                                        <img src="/img/product-placeholder.webp" alt="" className='h-20' />
                                        <div className="flex-1 font-medium">
                                            <h1 className='product-box-name'>{product.product_name}</h1>
                                            <div className="flex gap-4 text-xs">
                                                <p className='text-slate-500 text-xs my-1'><span className="font-semibold text-black">size :</span> {product.product_quantity_kg}</p>
                                                <p className='text-slate-500 text-xs my-1'><span className="font-semibold text-black">Qty :</span> {product.buying_quantity}</p>
                                            </div>
                                            <p className='flex items-center'><BiRupee /> {Math.round(parseInt(product.product_total_price))}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {/* <button className='bg-red-400 rounded-lg p-2 px-4 text-white text-xs'>cancel order</button> */}
                        <button className='bg-slate-200 rounded-lg p-1 px-4 text-black text-xs'>Need help?</button>
                        {/* <button className='bg-slate-200 rounded-lg p-1 px-4 text-black cursor-not-allowed text-xs' disabled>Download Invoice</button> */}
                    </div>
                </div>

                <div className="right-side mt-4 lg:mt-0">
                    <h1 className=" font-semibold mb-4">Shipping Details</h1>
                    <p className="text-xs text-slate-500">{props.order.address1 + ', ' + props.order.address2 + ', ' + props.order.city + ', ' + props.order.state + ' ' + props.order.pincode}  </p>

                    <h1 className=" font-semibold mb-4 mt-6">Shipping Details</h1>
                    <table className='w-full lg:w-6/12 text-xs text-slate-500'>
                        <tbody>
                            <tr>
                                <td>Sub Total : </td>
                                <td>{Math.round(parseInt(props.order.total_amount))}</td>
                            </tr>
                            <tr>
                                <td>Delivery Charges : </td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Coupon Discount : </td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Total : </td>
                                <td>{Math.round(parseInt(props.order.total_amount))}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ORDER TIMELINE */}
            <div className="grid grid-cols-4 mt-12 relative text-xs order-timeline">
                <div className="milestoneline w-full h-1 bg-slate-200 absolute top-1 left-0 -z-10"></div>

                <div className="col">
                    <div className="milestone h-3 w-3 bg-green-600 rounded-full mb-2 lg:mb-4 z-10"></div>
                    <h1>Order placed</h1>
                    <p className="lg:text-xs text-slate-500">{dayjs(props.order.created_at).format("ddd, DD MMM YYYY")}</p>
                </div>
                <div className="col text-center">
                    <div className="milestone h-3 w-3 bg-slate-200 rounded-full mb-2 lg:mb-4 mx-auto"></div>
                    <h1>Shipped</h1>
                    <p className="lg:text-xs text-slate-500"></p>
                </div>
                <div className="col text-center">
                    <div className="milestone h-3 w-3 bg-slate-200 rounded-full mb-2 lg:mb-4 mx-auto"></div>
                    <h1>Out for delivery</h1>
                    <p className="lg:text-xs text-slate-500"></p>
                </div>
                <div className="col text-right flex flex-col items-end">
                    <div className="milestone h-3 w-3 bg-slate-200 rounded-full mb-2 lg:mb-4 "></div>
                    <h1>Delivered</h1>
                    <p className="lg:text-xs text-slate-500"></p>
                </div>
            </div>

        </div>
    )
}

export default CurrentOrderBox