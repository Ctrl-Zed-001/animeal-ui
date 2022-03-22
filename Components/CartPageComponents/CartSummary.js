import React from 'react'
import Link from 'next/link'
import { BiRupee } from 'react-icons/bi';

const CartSummary = (props) => {
    return (
        <div className="cart-summary bg-slate-100 p-4 rounded-xl flex-1">
            <div className="flex gap-4 items-center w-full">
                <img src="/img/icons/cart-delivery.png" alt="" />
                <h1 className='font-semibold'>Free shipping in 24hr.</h1>
            </div>
            <div className="flex w-full items-center justify-between my-6">
                <h1 className="">Subtotal (4 items)</h1>
                <h1 className='font-semibold flex items-center'><BiRupee /> 1,200</h1>
            </div>
            <table className='w-full'>
                <tbody>
                    <tr className='border-b'>
                        <td className='py-3'>Qty</td>
                        <td className='text-right py-3'>3</td>
                    </tr>
                    <tr className='border-b'>
                        <td className='py-3'>Shipping</td>
                        <td className='text-right py-3 flex items-center justify-end'><BiRupee /> 400</td>
                    </tr>
                    <tr className='border-b text-green-500'>
                        <td className='py-3'>Discount</td>
                        <td className='text-right py-3 flex items-center justify-end'>- <BiRupee /> 200</td>
                    </tr>
                    <tr className='border-b'>
                        <td className='py-3'>Sub Total</td>
                        <td className='text-right py-3 flex items-center justify-end'><BiRupee /> 1,200</td>
                    </tr>

                </tbody>
            </table>
            <Link href='/checkout'>
                <button className='bg-theme px-4 rounded-lg w-full font-semibold py-3 mt-4'>Proceed to checkout</button>
            </Link>
        </div>
    )
}

export default CartSummary