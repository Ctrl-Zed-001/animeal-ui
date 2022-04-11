import React from 'react'
import { BiRupee } from 'react-icons/bi'
import dayjs from 'dayjs'

const PreviousOrderBox = (props) => {
    return (
        <div className="past-order bg-slate-100 py-2 rounded-lg grid grid-cols-12 my-4 gap-4 lg:gap-0 text-xs px-4">
            <div className="col col-span-9 lg:col-span-7">
                <h1 className='font-semibold'>Order Id : {props.order[0].order_id}</h1>
                <p className="text-xs text-slate-600 my-1">Total Products : {props.order[0].total_quantity}</p>
                <p className='flex items-center'><BiRupee />Total Amount : {props.order[0].total_amount}</p>
                <div className="block lg:hidden text-xs">
                    <h1 className='my-2 font-medium'>Order placed on {props.order[0].purchased_date}</h1>
                    <div className="flex gap-6 text-xs">
                        <button className='bg-slate-200 rounded-lg p-1 px-4 text-black'>Need help?</button>
                        {/* <button className='bg-slate-200 rounded-lg p-1 px-4 text-black cursor-not-allowed'>Download Invoice</button> */}
                    </div>
                </div>
            </div>
            <div className='col-span-4 hidden lg:block'>
                <h1 className='mb-4 font-medium'>Order placed on {dayjs(props.order[0].purchased_date).format("ddd, MMM DD YYYY")}</h1>
                <div className="flex gap-6">
                    <button className='bg-slate-200 rounded-lg p-1 px-4 text-black'>Need help?</button>
                    {/* <button className='bg-slate-200 rounded-lg p-1 px-4 text-black cursor-not-allowed'>Download Invoice</button> */}
                </div>
            </div>
        </div>
    )
}

export default PreviousOrderBox